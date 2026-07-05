import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import { books as localBooks } from '../data/books';
import StarRating from '../components/ui/StarRating';

const ageOptions = ["All", "Ages 3-5", "Ages 6-8", "Ages 9-12"];
const levelOptions = ["All", "Beginner", "Intermediate", "Advanced"];
const themeOptions = ["All", "Adventure", "Animals & Nature", "Bedtime", "Friendship", "Magic & Fantasy", "STEM"];
const languageOptions = ["All", "English", "Spanish", "French"];
const licenseOptions = ["All", "CC BY 4.0", "CC BY-SA 4.0", "Public Domain"];

export default function BrowseLibrary() {
  const [searchParams] = useSearchParams();
  const initialTheme = searchParams.get('theme') || 'All';

  const [books, setBooks] = useState(localBooks);
  const [total, setTotal] = useState(localBooks.length);
  const [searchQuery, setSearchQuery] = useState('');
  const [ageFilter, setAgeFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');
  const [themeFilter, setThemeFilter] = useState(initialTheme);
  const [languageFilter, setLanguageFilter] = useState('All');
  const [licenseFilter, setLicenseFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(initialTheme !== 'All');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const params = {};
        if (searchQuery) params.search = searchQuery;
        if (ageFilter !== 'All') params.ageGroup = ageFilter;
        if (levelFilter !== 'All') params.readingLevel = levelFilter;
        if (themeFilter !== 'All') params.theme = themeFilter;
        if (languageFilter !== 'All') params.language = languageFilter;
        if (licenseFilter !== 'All') params.license = licenseFilter;

        const data = await api.books.getAll(params);
        if (data.books) {
          setBooks(data.books);
          setTotal(data.total);
        }
      } catch {
        // Fallback: filter local data
        const filtered = localBooks.filter((book) => {
          const matchesSearch = !searchQuery || book.title.toLowerCase().includes(searchQuery.toLowerCase()) || book.author.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesAge = ageFilter === 'All' || book.ageGroup === ageFilter;
          const matchesLevel = levelFilter === 'All' || book.readingLevel === levelFilter;
          const matchesTheme = themeFilter === 'All' || book.theme === themeFilter;
          const matchesLanguage = languageFilter === 'All' || book.language === languageFilter;
          const matchesLicense = licenseFilter === 'All' || book.license === licenseFilter;
          return matchesSearch && matchesAge && matchesLevel && matchesTheme && matchesLanguage && matchesLicense;
        });
        setBooks(filtered);
        setTotal(filtered.length);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [searchQuery, ageFilter, levelFilter, themeFilter, languageFilter, licenseFilter]);

  return (
    <main className="px-4 md:px-12 py-8 max-w-7xl mx-auto">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-6">Browse Library</h1>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 flex items-center bg-white rounded-full shadow-sm px-4 py-2">
          <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by title, author, or tag..." className="flex-1 px-2 py-2 bg-transparent outline-none text-text-primary placeholder-gray-400" />
        </div>
        <button onClick={() => setShowFilters(!showFilters)} className={`px-5 py-3 rounded-full font-semibold transition-colors ${showFilters ? 'bg-green-soft text-white' : 'bg-white text-text-secondary shadow-sm hover:bg-gray-50'}`}>Filters</button>
      </div>

      {showFilters && (
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">Age Group</label>
            <select value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-text-primary bg-white">
              {ageOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">Reading Level</label>
            <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-text-primary bg-white">
              {levelOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">Theme</label>
            <select value={themeFilter} onChange={(e) => setThemeFilter(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-text-primary bg-white">
              {themeOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">Language</label>
            <select value={languageFilter} onChange={(e) => setLanguageFilter(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-text-primary bg-white">
              {languageOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">License</label>
            <select value={licenseFilter} onChange={(e) => setLicenseFilter(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-text-primary bg-white">
              {licenseOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>
      )}

      <p className="text-text-secondary text-sm mb-4">
        {loading ? 'Loading...' : `Showing ${books.length} of ${total} books`}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {books.map((book) => (
          <Link key={book._id || book.id} to={`/book/${book._id || book.id}`} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
            <img src={book.coverImage || book.cover} alt={book.title} className="w-full h-44 md:h-52 object-cover group-hover:scale-105 transition-transform" loading="lazy" />
            <div className="p-4">
              <h3 className="font-heading font-semibold text-text-primary text-sm mb-1 line-clamp-1">{book.title}</h3>
              <p className="text-text-secondary text-xs mb-2">{book.author}</p>
              <div className="flex items-center justify-between">
                <StarRating rating={Math.round(book.rating || 4)} />
                <span className="text-xs text-text-secondary">{book.readingTime}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {(book.tags || []).slice(0, 2).map((tag) => (
                  <span key={tag} className="text-xs bg-peach-light text-text-secondary px-2 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {books.length === 0 && !loading && (
        <div className="text-center py-16">
          <p className="text-text-secondary text-lg mb-2">No books found</p>
          <p className="text-text-secondary text-sm">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </main>
  );
}
