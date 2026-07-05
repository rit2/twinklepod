import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { books } from '../data/books';
import StarRating from '../components/ui/StarRating';

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(query);

  const results = books.filter((book) => {
    if (!query) return false;
    const q = query.toLowerCase();
    return book.title.toLowerCase().includes(q) || book.author.toLowerCase().includes(q) || book.tags.some((t) => t.toLowerCase().includes(q));
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ q: searchInput });
  };

  return (
    <main className="px-4 md:px-12 py-8 max-w-6xl mx-auto">
      <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full shadow-sm px-4 py-2 max-w-2xl mb-8">
        <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search for books, authors, or tags..." className="flex-1 px-3 py-2 bg-transparent outline-none text-text-primary placeholder-gray-400" />
        <button type="submit" className="bg-green-soft hover:bg-green-dark text-white font-semibold px-5 py-2 rounded-full transition-colors">Search</button>
      </form>

      {query && (
        <div className="mb-6">
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-text-primary">Results for "{query}"</h1>
          <p className="text-text-secondary mt-1">{results.length} {results.length === 1 ? 'book' : 'books'} found</p>
        </div>
      )}

      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((book) => (
            <Link key={book.id} to={`/book/${book.id}`} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex gap-4">
              <img src={book.cover} alt={book.title} className="w-20 h-28 rounded-xl object-cover flex-shrink-0" loading="lazy" />
              <div className="flex-1">
                <h3 className="font-heading font-semibold text-text-primary mb-1">{book.title}</h3>
                <p className="text-sm text-text-secondary mb-2">by {book.author}</p>
                <StarRating rating={Math.round(book.rating)} />
                <div className="flex items-center gap-3 mt-2 text-xs text-text-secondary">
                  <span>{book.ageGroup}</span>
                  <span>{book.readingTime}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {book.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs bg-peach-light text-text-secondary px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-16">
          <h2 className="font-heading text-xl font-bold text-text-primary mb-2">No books found</h2>
          <p className="text-text-secondary mb-6">We couldn't find any books matching "{query}". Try different keywords.</p>
          <Link to="/browse" className="bg-green-soft hover:bg-green-dark text-white font-semibold px-6 py-3 rounded-full transition-colors inline-block">Browse All Books</Link>
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="font-heading text-xl font-bold text-text-primary mb-2">Search for stories</h2>
          <p className="text-text-secondary">Try searching for "dragons", "space", "animals", or an author name.</p>
        </div>
      )}
    </main>
  );
}
