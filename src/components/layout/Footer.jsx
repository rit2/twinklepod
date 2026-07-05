import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-peach-light py-10 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="font-heading text-xl font-bold text-text-primary leading-tight">
            Twinkle Pod
          </span>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h4 className="font-heading font-semibold text-text-primary mb-1">Links</h4>
          <Link to="/reading-nook" className="text-text-secondary hover:text-green-soft transition-colors">
            Reading Nook
          </Link>
          <Link to="/for-parents" className="text-text-secondary hover:text-green-soft transition-colors">
            For Parents
          </Link>
          <Link to="/about" className="text-text-secondary hover:text-green-soft transition-colors">
            About Us
          </Link>
        </div>
      </div>

      <div className="text-center mt-8 text-text-secondary text-sm">
        © 2024 Twinkle Pod
      </div>
    </footer>
  );
}
