import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { books as localBooks } from '../../data/books';

export default function TrendingStories() {
  const [books, setBooks] = useState(localBooks.slice(0, 8));

  useEffect(() => {
    api.books.getAll({ limit: 12 })
      .then((data) => { if (data.books?.length > 0) setBooks(data.books); })
      .catch(() => {});
  }, []);

  return (
    <section className="px-4 md:px-12 py-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
        {books.map((book) => (
          <Link key={book._id || book.id} to={`/book/${book._id || book.id}`} className="group">
            <img
              src={book.coverImage || book.cover}
              alt={book.title}
              className="w-full h-40 sm:h-48 md:h-52 object-cover rounded-lg shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all duration-300"
              loading="lazy"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
