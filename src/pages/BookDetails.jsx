import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../services/api';
import { getBookById, getRelatedBooks as getLocalRelated, getReviewsByBookId } from '../data/books';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ui/Toast';
import StarRating from '../components/ui/StarRating';

export default function BookDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToast } = useToast();
  const [book, setBook] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [bookReviews, setBookReviews] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const data = await api.books.getById(id);
        setBook(data);
        // Fetch related
        const allBooks = await api.books.getAll({ ageGroup: data.ageGroup, limit: 5 });
        setRelatedBooks((allBooks.books || []).filter(b => b._id !== id).slice(0, 4));
        // Fetch reviews
        const revs = await api.reviews.getByBook(id);
        setBookReviews(revs);
      } catch {
        // Fallback to local data
        const localBook = getBookById(id);
        setBook(localBook);
        setRelatedBooks(getLocalRelated(id));
        setBookReviews(getReviewsByBookId(id));
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  useEffect(() => {
    if (user) {
      const favs = user.favorites?.map(f => f._id || f) || [];
      setIsFavorite(favs.includes(id));
    } else {
      const localFavs = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(localFavs.includes(Number(id)) || localFavs.includes(id));
    }
  }, [user, id]);

  const toggleFavorite = async () => {
    try {
      if (user) {
        const res = await api.users.toggleFavorite(id);
        setIsFavorite(res.isFavorite);
        addToast(res.isFavorite ? 'Added to favorites!' : 'Removed from favorites');
      } else {
        const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
        const numId = Number(id) || id;
        let updated;
        if (isFavorite) { updated = favs.filter(f => f !== numId); addToast('Removed from favorites'); }
        else { updated = [...favs, numId]; addToast('Added to favorites!'); }
        localStorage.setItem('favorites', JSON.stringify(updated));
        setIsFavorite(!isFavorite);
      }
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  if (loading) {
    return <main className="px-4 md:px-12 py-16 text-center"><p className="text-text-secondary">Loading...</p></main>;
  }

  if (!book) {
    return (
      <main className="px-4 md:px-12 py-16 text-center">
        <h1 className="font-heading text-2xl font-bold text-text-primary mb-3">Book not found</h1>
        <Link to="/browse" className="bg-green-soft hover:bg-green-dark text-white font-semibold px-6 py-3 rounded-full transition-colors">Browse Library</Link>
      </main>
    );
  }

  const cover = book.coverImage || book.cover;
  const bookId = book._id || book.id;

  return (
    <main className="px-4 md:px-12 py-8 max-w-6xl mx-auto">
      <nav className="mb-6 text-sm text-text-secondary">
        <Link to="/" className="hover:text-green-soft">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/browse" className="hover:text-green-soft">Library</Link>
        <span className="mx-2">/</span>
        <span className="text-text-primary">{book.title}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="flex-shrink-0">
          <img src={cover} alt={book.title} className="w-64 md:w-80 rounded-2xl shadow-lg mx-auto md:mx-0" loading="lazy" />
        </div>
        <div className="flex-1">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-2">{book.title}</h1>
          <p className="text-text-secondary text-lg mb-1">by <span className="font-semibold text-text-primary">{book.author}</span></p>
          {book.illustrator && <p className="text-text-secondary mb-4">Illustrated by <span className="font-semibold">{book.illustrator}</span></p>}

          <div className="flex items-center gap-2 mb-6">
            <StarRating rating={Math.round(book.rating || 4)} />
            <span className="text-text-secondary text-sm">{book.rating || 4} ({book.totalReviews || bookReviews.length} reviews)</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="bg-white rounded-xl p-3 shadow-sm text-center"><div className="text-xs text-text-secondary">Reading Level</div><div className="font-semibold text-text-primary">{book.readingLevel}</div></div>
            <div className="bg-white rounded-xl p-3 shadow-sm text-center"><div className="text-xs text-text-secondary">Age Group</div><div className="font-semibold text-text-primary">{book.ageGroup}</div></div>
            <div className="bg-white rounded-xl p-3 shadow-sm text-center"><div className="text-xs text-text-secondary">Reading Time</div><div className="font-semibold text-text-primary">{book.readingTime}</div></div>
            <div className="bg-white rounded-xl p-3 shadow-sm text-center"><div className="text-xs text-text-secondary">Language</div><div className="font-semibold text-text-primary">{book.language}</div></div>
          </div>

          <p className="text-text-secondary leading-relaxed mb-6">{book.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {(book.tags || []).map((tag) => <span key={tag} className="bg-peach-light text-text-primary text-sm px-3 py-1 rounded-full">{tag}</span>)}
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <div className="text-xs text-text-secondary mb-1">License</div>
            <a href={book.licenseUrl} target="_blank" rel="noopener noreferrer" className="text-green-soft hover:text-green-dark font-semibold transition-colors">{book.license}</a>
            <p className="text-xs text-text-secondary mt-1">This book is free to read and share with proper attribution.</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link to={`/read/${bookId}`} className="bg-green-soft hover:bg-green-dark text-white font-semibold px-8 py-3 rounded-full transition-colors shadow-md">Read Now</Link>
            <button onClick={toggleFavorite} className={`px-6 py-3 rounded-full font-semibold transition-colors shadow-md border-2 ${isFavorite ? 'bg-peach border-peach text-text-primary' : 'bg-white border-gray-200 text-text-secondary hover:border-peach'}`}>
              {isFavorite ? 'Favorited' : 'Add to Favorites'}
            </button>
          </div>
        </div>
      </div>

      {bookReviews.length > 0 && (
        <section className="mb-12">
          <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">Reviews</h2>
          <div className="space-y-4">
            {bookReviews.map((review) => (
              <div key={review._id || review.id} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-peach-light rounded-full flex items-center justify-center font-semibold text-text-primary">
                      {(review.user?.name || review.user || '?')[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-text-primary">{review.user?.name || review.user}</div>
                      <div className="text-xs text-text-secondary">{review.createdAt ? new Date(review.createdAt).toLocaleDateString() : review.date}</div>
                    </div>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-text-secondary">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {relatedBooks.length > 0 && (
        <section>
          <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedBooks.map((b) => (
              <Link key={b._id || b.id} to={`/book/${b._id || b.id}`} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img src={b.coverImage || b.cover} alt={b.title} className="w-full h-40 md:h-48 object-cover" loading="lazy" />
                <div className="p-3"><h3 className="font-heading font-semibold text-text-primary text-sm mb-1">{b.title}</h3><StarRating rating={Math.round(b.rating || 4)} /></div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
