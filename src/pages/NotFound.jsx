import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="px-4 py-16 flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md">
        <div className="text-8xl font-heading font-bold text-peach mb-4">404</div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-3">
          Page Not Found
        </h1>
        <p className="text-text-secondary mb-8">
          Oops! It seems this page wandered off into the enchanted forest. Let's get you back to the library.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="bg-green-soft hover:bg-green-dark text-white font-semibold px-6 py-3 rounded-full transition-colors">Go Home</Link>
          <Link to="/browse" className="bg-white border-2 border-gray-200 hover:border-green-soft text-text-secondary hover:text-green-soft font-semibold px-6 py-3 rounded-full transition-colors">Browse Books</Link>
        </div>
      </div>
    </main>
  );
}
