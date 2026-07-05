import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { getTrendingBooks as getLocalTrending } from '../../data/books';
import StarRating from './StarRating';

export default function TrendingStories() {
  const [stories, setStories] = useState(getLocalTrending());

  useEffect(() => {
    api.books.getAll({ limit: 4 })
      .then((data) => { if (data.books?.length > 0) setStories(data.books); })
      .catch(() => {});
  }, []);

  return (
    <section className="px-4 md:px-12 py-8">
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-6">Trending Stories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {stories.map((story) => (
          <Link key={story._id || story.id} to={`/book/${story._id || story.id}`} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <img src={story.coverImage || story.cover} alt={story.title} className="w-full h-40 md:h-48 object-cover" loading="lazy" />
            <div className="p-3">
              <h3 className="font-heading font-semibold text-text-primary text-sm mb-0.5">{story.title}</h3>
              <p className="text-text-secondary text-xs mb-1">By {story.author}</p>
              <StarRating rating={Math.round(story.rating || 4)} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
