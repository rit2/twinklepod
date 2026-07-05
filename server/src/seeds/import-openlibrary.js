/**
 * Open Library Book Import Script
 * 
 * Searches Open Library for children's books and imports metadata.
 * Note: Open Library provides metadata. Check individual book licenses before using full text.
 * Cover images from Open Library are available under their terms.
 * 
 * Usage: node src/seeds/import-openlibrary.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('../models/Book');

const OPEN_LIBRARY_API = 'https://openlibrary.org';

// Search queries for children's books
const searches = [
  { query: 'subject:juvenile fiction fairy tales', ageGroup: 'Ages 3-5', readingLevel: 'Beginner', theme: 'Magic & Fantasy' },
  { query: 'subject:juvenile fiction animals', ageGroup: 'Ages 3-5', readingLevel: 'Beginner', theme: 'Animals & Nature' },
  { query: 'subject:juvenile fiction adventure', ageGroup: 'Ages 6-8', readingLevel: 'Intermediate', theme: 'Adventure' },
  { query: 'subject:juvenile fiction friendship', ageGroup: 'Ages 6-8', readingLevel: 'Intermediate', theme: 'Friendship' },
  { query: 'subject:juvenile fiction science', ageGroup: 'Ages 9-12', readingLevel: 'Advanced', theme: 'STEM' },
];

async function searchOpenLibrary(query, limit = 5) {
  try {
    const url = `${OPEN_LIBRARY_API}/search.json?q=${encodeURIComponent(query)}&limit=${limit}&language=eng`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return data.docs || [];
  } catch (error) {
    console.log(`  Search failed for "${query}": ${error.message}`);
    return [];
  }
}

function getCoverUrl(coverId, size = 'L') {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}

function estimateReadingTime(pageCount) {
  if (!pageCount) return '10 min';
  if (pageCount < 32) return '5 min';
  if (pageCount < 64) return '10 min';
  if (pageCount < 128) return '15 min';
  return '20 min';
}

async function importFromOpenLibrary() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    console.log('Searching Open Library for children\'s books...\n');

    let imported = 0;
    let skipped = 0;

    for (const search of searches) {
      console.log(`\nSearching: ${search.query}`);
      const results = await searchOpenLibrary(search.query);

      for (const doc of results) {
        // Skip if no author or title
        if (!doc.title || !doc.author_name?.[0]) continue;

        const title = doc.title;
        const author = doc.author_name[0];

        // Skip if already exists
        const exists = await Book.findOne({ title, author });
        if (exists) {
          console.log(`  Skipping "${title}" (already exists)`);
          skipped++;
          continue;
        }

        // Determine license - Open Library metadata books need individual verification
        // We mark them as needing review
        const coverUrl = getCoverUrl(doc.cover_i) || `https://placehold.co/400x560/4a3a6a/ffffff?text=${encodeURIComponent(title.slice(0, 15))}`;

        const book = await Book.create({
          title,
          author,
          illustrator: '',
          description: doc.first_sentence?.[0] || `${title} by ${author}. A children's book available through Open Library.`,
          coverImage: coverUrl,
          pages: [`This book is available to read through Open Library. Visit openlibrary.org to access the full text.`],
          readingTime: estimateReadingTime(doc.number_of_pages_median),
          language: 'English',
          license: 'Verify - Open Library',
          licenseUrl: `https://openlibrary.org${doc.key}`,
          tags: (doc.subject || []).slice(0, 5).map(s => s.split(' -- ')[0]),
          ageGroup: search.ageGroup,
          readingLevel: search.readingLevel,
          theme: search.theme,
          featured: false,
          publishedYear: doc.first_publish_year || 2000,
          status: 'Review', // Needs license verification before publishing
        });

        console.log(`  Added (Review): ${book.title} by ${author}`);
        imported++;
      }

      // Rate limit
      await new Promise(r => setTimeout(r, 1500));
    }

    console.log(`\nDone! Imported ${imported} books (marked for review). Skipped ${skipped}.`);
    console.log('\nIMPORTANT: Books imported from Open Library are marked as "Review" status.');
    console.log('You must verify the license of each book before changing status to "Published".');
    process.exit(0);
  } catch (error) {
    console.error('Import error:', error.message);
    process.exit(1);
  }
}

importFromOpenLibrary();
