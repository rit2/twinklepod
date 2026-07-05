/**
 * Project Gutenberg Book Import Script
 * 
 * Fetches children's books from Project Gutenberg and imports them into Twinkle Pod.
 * All Project Gutenberg books are in the public domain.
 * 
 * Usage: node src/seeds/import-gutenberg.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('../models/Book');

// Curated list of children's books from Project Gutenberg
const gutenbergBooks = [
  {
    gutenbergId: 11,
    title: "Alice's Adventures in Wonderland",
    author: "Lewis Carroll",
    illustrator: "John Tenniel",
    ageGroup: "Ages 6-8",
    readingLevel: "Intermediate",
    theme: "Magic & Fantasy",
    tags: ["Fantasy", "Adventure", "Classic", "Animals"],
    description: "Alice falls down a rabbit hole into a fantastical world populated by peculiar creatures. A timeless classic of children's literature full of wordplay, logic puzzles, and unforgettable characters.",
  },
  {
    gutenbergId: 12,
    title: "Through the Looking-Glass",
    author: "Lewis Carroll",
    illustrator: "John Tenniel",
    ageGroup: "Ages 6-8",
    readingLevel: "Intermediate",
    theme: "Magic & Fantasy",
    tags: ["Fantasy", "Adventure", "Classic", "Chess"],
    description: "Alice steps through a mirror into a world where everything is reversed. She meets talking flowers, Tweedledee and Tweedledum, and embarks on a chess-themed adventure.",
  },
  {
    gutenbergId: 16,
    title: "Peter Pan",
    author: "J.M. Barrie",
    ageGroup: "Ages 6-8",
    readingLevel: "Intermediate",
    theme: "Adventure",
    tags: ["Fantasy", "Adventure", "Classic", "Flying"],
    description: "Wendy, John, and Michael fly with Peter Pan to Neverland, where they encounter pirates, fairies, and the villainous Captain Hook. A story about the magic of childhood.",
  },
  {
    gutenbergId: 514,
    title: "Little Women",
    author: "Louisa May Alcott",
    ageGroup: "Ages 9-12",
    readingLevel: "Advanced",
    theme: "Friendship",
    tags: ["Family", "Classic", "Growing Up", "Sisters"],
    description: "The story of the four March sisters — Meg, Jo, Beth, and Amy — as they grow from childhood to adulthood during the Civil War era. A beloved classic about family and finding your place in the world.",
  },
  {
    gutenbergId: 1661,
    title: "The Adventures of Sherlock Holmes",
    author: "Arthur Conan Doyle",
    ageGroup: "Ages 9-12",
    readingLevel: "Advanced",
    theme: "Adventure",
    tags: ["Mystery", "Detective", "Classic", "Logic"],
    description: "A collection of twelve detective stories featuring the brilliant Sherlock Holmes and his loyal friend Dr. Watson. Perfect for young readers who love puzzles and mysteries.",
  },
  {
    gutenbergId: 74,
    title: "The Adventures of Tom Sawyer",
    author: "Mark Twain",
    ageGroup: "Ages 9-12",
    readingLevel: "Advanced",
    theme: "Adventure",
    tags: ["Adventure", "Classic", "Friendship", "Mischief"],
    description: "Tom Sawyer's adventures along the Mississippi River include treasure hunting, exploring caves, and attending his own funeral. A story of boyhood freedom and imagination.",
  },
  {
    gutenbergId: 345,
    title: "Dracula (Adapted Excerpt)",
    author: "Bram Stoker",
    ageGroup: "Ages 9-12",
    readingLevel: "Advanced",
    theme: "Adventure",
    tags: ["Gothic", "Classic", "Suspense"],
    description: "The classic vampire tale retold — Jonathan Harker travels to Transylvania and discovers the dark secrets of Count Dracula's castle. For brave young readers who enjoy spooky stories.",
  },
];

async function fetchGutenbergText(gutenbergId) {
  try {
    const url = `https://www.gutenberg.org/cache/epub/${gutenbergId}/pg${gutenbergId}.txt`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();

    // Extract first few paragraphs as pages (simplified for children's reading)
    const lines = text.split('\n').filter(l => l.trim().length > 50);
    const start = lines.findIndex(l => l.includes('***') && l.includes('START'));
    const end = lines.findIndex((l, i) => i > start && l.includes('***') && l.includes('END'));

    const content = lines.slice(start + 1, end > start ? end : start + 200);
    // Split into pages of ~300 words each
    const pages = [];
    let currentPageText = '';
    for (const line of content) {
      currentPageText += line.trim() + ' ';
      if (currentPageText.split(' ').length > 200) {
        pages.push(currentPageText.trim());
        currentPageText = '';
        if (pages.length >= 10) break; // Limit to 10 pages for reading experience
      }
    }
    if (currentPageText.trim() && pages.length < 10) {
      pages.push(currentPageText.trim());
    }

    return pages.length > 0 ? pages : ['Content could not be loaded. Visit Project Gutenberg for the full text.'];
  } catch (error) {
    console.log(`  Could not fetch text for ID ${gutenbergId}: ${error.message}`);
    return ['Content could not be loaded. Visit Project Gutenberg for the full text.'];
  }
}

async function importGutenbergBooks() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    console.log(`Importing ${gutenbergBooks.length} books from Project Gutenberg...\n`);

    let imported = 0;
    for (const bookInfo of gutenbergBooks) {
      const exists = await Book.findOne({ title: bookInfo.title, author: bookInfo.author });
      if (exists) {
        console.log(`  Skipping "${bookInfo.title}" (already exists)`);
        continue;
      }

      console.log(`  Fetching "${bookInfo.title}"...`);
      const pages = await fetchGutenbergText(bookInfo.gutenbergId);

      const book = await Book.create({
        title: bookInfo.title,
        author: bookInfo.author,
        illustrator: bookInfo.illustrator || '',
        description: bookInfo.description,
        coverImage: `https://placehold.co/400x560/2d4a3e/ffffff?text=${encodeURIComponent(bookInfo.title.slice(0, 20))}`,
        pages,
        readingTime: `${Math.max(5, pages.length * 3)} min`,
        language: 'English',
        license: 'Public Domain',
        licenseUrl: `https://www.gutenberg.org/ebooks/${bookInfo.gutenbergId}`,
        tags: bookInfo.tags,
        ageGroup: bookInfo.ageGroup,
        readingLevel: bookInfo.readingLevel,
        theme: bookInfo.theme,
        featured: false,
        publishedYear: 1900,
        status: 'Published',
      });

      console.log(`  Added: ${book.title}`);
      imported++;

      // Small delay to be respectful to Gutenberg servers
      await new Promise(r => setTimeout(r, 1000));
    }

    console.log(`\nDone! Imported ${imported} new books.`);
    process.exit(0);
  } catch (error) {
    console.error('Import error:', error.message);
    process.exit(1);
  }
}

importGutenbergBooks();
