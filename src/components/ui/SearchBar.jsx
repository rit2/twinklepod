import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="px-4 md:px-12 py-4">
      <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full shadow-md px-4 py-2 max-w-2xl mx-auto">
        <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for magic (e.g., dragons, space, animals)..."
          className="flex-1 px-3 py-2 text-text-secondary placeholder-gray-400 bg-transparent outline-none"
        />
        <button
          type="submit"
          className="bg-green-soft hover:bg-green-dark text-white font-semibold px-5 py-2 rounded-full transition-colors"
        >
          Find Stories
        </button>
      </form>
    </section>
  );
}
