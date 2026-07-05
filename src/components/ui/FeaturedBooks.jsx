import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { getFeaturedBooks as getLocalFeatured } from '../../data/books';
import StarRating from './StarRating';

export default function FeaturedBooks() {
  const [books, setBooks] = useState(getLocalFeatured());
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  useEffect(() => {
    api.books.getFeatured()
      .then((data) => { if (data.length > 0) setBooks(data); })
      .catch(() => {});
  }, []);

  const handlePrev = () => setStartIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () => setStartIndex((prev) => Math.min(books.length - visibleCount, prev + 1));
  const visibleBooks = books.slice(startIndex, startIndex + visibleCount);

  return (
    <section className="px-4 md:px-12 py-8">
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-6">Featured Book Adventures</h2>
      <div className="relative flex items-center">
        <button onClick={handlePrev} disabled={startIndex === 0} className="absolute -left-2 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity" aria-label="Previous books">&#8249;</button>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 px-8">
          {visibleBooks.map((book) => (
            <Link key={book._id || book.id} to={`/book/${book._id || book.id}`} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img src={book.coverImage || book.cover} alt={book.title} className="w-full h-48 md:h-56 object-cover" loading="lazy" />
              <div className="p-4">
                <h3 className="font-heading font-semibold text-text-primary mb-1">{book.title}</h3>
                <StarRating rating={Math.round(book.rating || 4)} />
              </div>
            </Link>
          ))}
        </div>
        <button onClick={handleNext} disabled={startIndex >= books.length - visibleCount} className="absolute -right-2 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity" aria-label="Next books">&#8250;</button>
      </div>
    </section>
  );
}
