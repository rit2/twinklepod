import { Link } from 'react-router-dom';
import { readingThemes } from '../../data/books';

export default function ReadingThemes() {
  return (
    <section className="px-4 md:px-12 py-8">
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-6">Explore Reading Themes</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {readingThemes.map((theme) => (
          <Link key={theme.id} to={`/browse?theme=${encodeURIComponent(theme.name)}`} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col items-center gap-3">
            <span className="font-heading font-semibold text-text-primary text-sm text-center">{theme.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
