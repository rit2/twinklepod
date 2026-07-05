import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="bg-cream py-4 px-6 md:px-12 relative">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-heading text-xl md:text-2xl font-bold text-text-primary leading-tight">Twinkle Pod</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/explore" className="text-text-secondary hover:text-green-soft font-semibold transition-colors">Explore Books</Link>
          <Link to="/reading-nook" className="text-text-secondary hover:text-green-soft font-semibold transition-colors">Reading Nook</Link>
          <Link to="/for-parents" className="text-text-secondary hover:text-green-soft font-semibold transition-colors">For Parents</Link>
          <Link to="/about" className="text-text-secondary hover:text-green-soft font-semibold transition-colors">About Us</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link to="/dashboard" className="text-text-secondary hover:text-green-soft font-semibold transition-colors">
                {user.name}
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="text-text-secondary hover:text-green-soft font-semibold transition-colors">Admin</Link>
              )}
              <button onClick={handleLogout} className="bg-text-primary text-white px-5 py-2 rounded-full font-semibold hover:bg-green-dark transition-colors">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-text-secondary hover:text-green-soft font-semibold transition-colors">Log In</Link>
              <Link to="/join" className="bg-text-primary text-white px-5 py-2 rounded-full font-semibold hover:bg-green-dark transition-colors">Join Now</Link>
            </>
          )}
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-peach-light transition-colors" aria-label="Toggle menu" aria-expanded={isMenuOpen}>
          <span className={`w-6 h-0.5 bg-text-primary transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-text-primary transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-text-primary transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-2xl z-50 py-4 px-6">
          <div className="flex flex-col gap-4">
            <Link to="/explore" onClick={() => setIsMenuOpen(false)} className="text-text-secondary hover:text-green-soft font-semibold py-2">Explore Books</Link>
            <Link to="/reading-nook" onClick={() => setIsMenuOpen(false)} className="text-text-secondary hover:text-green-soft font-semibold py-2">Reading Nook</Link>
            <Link to="/for-parents" onClick={() => setIsMenuOpen(false)} className="text-text-secondary hover:text-green-soft font-semibold py-2">For Parents</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-text-secondary hover:text-green-soft font-semibold py-2">About Us</Link>
            <hr className="border-gray-100" />
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-text-secondary hover:text-green-soft font-semibold py-2">{user.name}'s Dashboard</Link>
                {user.role === 'admin' && <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-text-secondary hover:text-green-soft font-semibold py-2">Admin Panel</Link>}
                <button onClick={handleLogout} className="bg-text-primary text-white px-5 py-2.5 rounded-full font-semibold hover:bg-green-dark transition-colors text-center">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-text-secondary hover:text-green-soft font-semibold py-2">Log In</Link>
                <Link to="/join" onClick={() => setIsMenuOpen(false)} className="bg-text-primary text-white px-5 py-2.5 rounded-full font-semibold hover:bg-green-dark transition-colors text-center">Join Now</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
