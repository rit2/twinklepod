import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../services/api';
import { getBookById } from '../data/books';
import { useAuth } from '../context/AuthContext';

export default function ReadingPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const storageKey = `reading-progress-${id}`;
  const [currentPage, setCurrentPage] = useState(() => Number(localStorage.getItem(storageKey) || 0));
  const [fontSize, setFontSize] = useState(20);
  const [darkMode, setDarkMode] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await api.books.getById(id);
        setBook(data);
      } catch {
        setBook(getBookById(id));
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const pages = book?.pages || [];
  const progress = pages.length > 0 ? ((currentPage + 1) / pages.length) * 100 : 0;

  useEffect(() => {
    localStorage.setItem(storageKey, String(currentPage));
    // Save to API if logged in
    if (user && pages.length > 0) {
      api.users.updateProgress(id, { currentPage, totalPages: pages.length }).catch(() => {});
    }
  }, [currentPage, pages.length]);

  const handlePrev = () => setCurrentPage((p) => Math.max(0, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(pages.length - 1, p + 1));

  if (loading) {
    return <div className="min-h-screen bg-cream flex items-center justify-center"><p className="text-text-secondary">Loading...</p></div>;
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-text-primary mb-3">Book not found</h1>
          <Link to="/browse" className="text-green-soft hover:text-green-dark font-semibold">Browse Library</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'bg-gray-900' : 'bg-cream'}`}>
      <header className={`flex items-center justify-between px-4 md:px-8 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <Link to={`/book/${book._id || book.id || id}`} className={`font-semibold transition-colors ${darkMode ? 'text-gray-300 hover:text-white' : 'text-text-secondary hover:text-text-primary'}`}>Back to Book</Link>
        <h1 className={`font-heading font-bold text-lg hidden md:block ${darkMode ? 'text-white' : 'text-text-primary'}`}>{book.title}</h1>
        <div className="flex items-center gap-3">
          <button onClick={() => setFontSize((s) => Math.max(14, s - 2))} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-text-secondary shadow-sm'}`} aria-label="Decrease font size">A-</button>
          <button onClick={() => setFontSize((s) => Math.min(32, s + 2))} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-text-secondary shadow-sm'}`} aria-label="Increase font size">A+</button>
          <button onClick={() => setDarkMode(!darkMode)} className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-yellow-500 text-gray-900' : 'bg-gray-800 text-white'}`} aria-label="Toggle dark mode">{darkMode ? 'L' : 'D'}</button>
          <button onClick={() => setIsBookmarked(!isBookmarked)} className={`w-8 h-8 rounded-full flex items-center justify-center ${isBookmarked ? 'bg-peach text-text-primary' : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-text-secondary shadow-sm'}`} aria-label="Bookmark">B</button>
        </div>
      </header>

      <div className={`h-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <div className="h-full bg-green-soft transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-20 pb-40">
        {pages[currentPage]?.startsWith('http') ? (
          <img
            src={pages[currentPage]}
            alt={`Page ${currentPage + 1}`}
            className="w-full rounded-xl shadow-md"
          />
        ) : (
          <p className={`leading-relaxed transition-all ${darkMode ? 'text-gray-200' : 'text-text-primary'}`} style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}>
            {pages[currentPage]}
          </p>
        )}
      </div>

      <div className={`fixed bottom-0 left-0 right-0 px-4 md:px-8 py-4 border-t ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-cream border-gray-200'}`}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button onClick={handlePrev} disabled={currentPage === 0} className={`px-5 py-2 rounded-full font-semibold transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-text-secondary shadow-sm'}`}>Previous</button>
          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-text-secondary'}`}>Page {currentPage + 1} of {pages.length}</span>
          <button onClick={handleNext} disabled={currentPage === pages.length - 1} className="bg-green-soft hover:bg-green-dark text-white px-5 py-2 rounded-full font-semibold transition-colors disabled:opacity-30 disabled:cursor-not-allowed">Next</button>
        </div>
        <div className="max-w-3xl mx-auto mt-3 flex items-center justify-center">
          <button onClick={() => setIsPlaying(!isPlaying)} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${isPlaying ? 'bg-peach text-text-primary' : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-text-secondary shadow-sm'}`}>{isPlaying ? 'Pause Narration' : 'Play Narration'}</button>
        </div>
      </div>
    </div>
  );
}
