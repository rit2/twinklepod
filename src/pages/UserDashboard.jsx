import { Link } from 'react-router-dom';
import StarRating from '../components/ui/StarRating';

const userData = {
  name: "Emma",
  booksRead: 24,
  readingStreak: 7,
  totalReadingTime: "12h 45m",
  level: "Star Reader",
};

const achievements = [
  { id: 1, name: "Bookworm", description: "Read 10 books", earned: true },
  { id: 2, name: "Night Owl", description: "Read in dark mode", earned: true },
  { id: 3, name: "Explorer", description: "Read 5 different themes", earned: true },
  { id: 4, name: "Streak Master", description: "7-day reading streak", earned: true },
  { id: 5, name: "Library Hero", description: "Read 50 books", earned: false },
  { id: 6, name: "Polyglot", description: "Read in 3 languages", earned: false },
];

const recentlyRead = [
  { id: 1, title: "Pip's Cosmic Trip", cover: "https://placehold.co/160x200/1a1a2e/ffffff?text=Pip", progress: 100, lastRead: "Today" },
  { id: 2, title: "The Sleepy Bear's Secret", cover: "https://placehold.co/160x200/2d4a3e/ffffff?text=Bear", progress: 75, lastRead: "Yesterday" },
  { id: 3, title: "Space Explorers", cover: "https://placehold.co/160x200/2b6bc4/ffffff?text=Space", progress: 40, lastRead: "2 days ago" },
];

const favorites = [
  { id: 3, title: "Luna's Night Flight", cover: "https://placehold.co/160x200/1a2a4a/ffffff?text=Luna", rating: 5 },
  { id: 5, title: "Ocean Wonders", cover: "https://placehold.co/160x200/1a3a4a/ffffff?text=Ocean", rating: 5 },
  { id: 4, title: "The Brave Little Fox", cover: "https://placehold.co/160x200/4a2d1a/ffffff?text=Fox", rating: 4 },
];

const recommended = [
  { id: 6, title: "The Dragon Who Drew", cover: "https://placehold.co/160x200/c44d2b/ffffff?text=Dragon", rating: 4, reason: "Because you liked Adventure" },
  { id: 8, title: "Mystery Woods", cover: "https://placehold.co/160x200/2b8c4a/ffffff?text=Mystery", rating: 4, reason: "Popular with your age group" },
  { id: 10, title: "Starlight Garden", cover: "https://placehold.co/160x200/5a3a6a/ffffff?text=Starlight", rating: 5, reason: "Readers who liked Luna's Night Flight also liked this" },
];

const bookmarks = [
  { id: 1, bookTitle: "The Sleepy Bear's Secret", page: 4, note: "The part about the honey cave" },
  { id: 2, bookTitle: "Space Explorers", page: 7, note: "Mars facts section" },
];

export default function UserDashboard() {
  return (
    <main className="px-4 md:px-12 py-8 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-1">
            Welcome back, {userData.name}!
          </h1>
          <p className="text-text-secondary">Keep reading and earning achievements</p>
        </div>
        <Link
          to="/settings"
          className="mt-4 md:mt-0 px-5 py-2 bg-white rounded-full shadow-sm text-text-secondary hover:bg-gray-50 font-semibold transition-colors"
        >
          Account Settings
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
          <div className="text-3xl font-bold text-green-soft">{userData.booksRead}</div>
          <div className="text-sm text-text-secondary mt-1">Books Read</div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
          <div className="text-3xl font-bold text-orange-warm">{userData.readingStreak}</div>
          <div className="text-sm text-text-secondary mt-1">Day Streak</div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
          <div className="text-3xl font-bold text-purple-soft">{userData.totalReadingTime}</div>
          <div className="text-sm text-text-secondary mt-1">Total Reading</div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
          <div className="text-3xl font-bold text-blue-soft">{userData.level}</div>
          <div className="text-sm text-text-secondary mt-1">Reader Level</div>
        </div>
      </div>

      {/* Continue Reading */}
      <section className="mb-8">
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">Continue Reading</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentlyRead.map((book) => (
            <Link
              key={book.id}
              to={`/read/${book.id}`}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex gap-4"
            >
              <img src={book.cover} alt={book.title} className="w-16 h-20 rounded-lg object-cover" />
              <div className="flex-1">
                <h3 className="font-heading font-semibold text-text-primary text-sm mb-1">{book.title}</h3>
                <p className="text-xs text-text-secondary mb-2">{book.lastRead}</p>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-green-soft rounded-full"
                    style={{ width: `${book.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-text-secondary mt-1">{book.progress}% complete</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Favorites */}
      <section className="mb-8">
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">Your Favorites</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {favorites.map((book) => (
            <Link key={book.id} to={`/book/${book.id}`} className="text-center group">
              <img src={book.cover} alt={book.title} className="w-full h-32 md:h-40 rounded-xl object-cover shadow-sm group-hover:shadow-md transition-shadow" />
              <p className="text-xs font-semibold text-text-primary mt-2 line-clamp-1">{book.title}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="mb-8">
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`rounded-2xl p-4 text-center shadow-sm ${ach.earned ? 'bg-white' : 'bg-gray-100 opacity-50'}`}
            >
              <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${ach.earned ? 'bg-peach-light' : 'bg-gray-200'}`}>
                <span className="font-bold text-text-primary">{ach.earned ? 'V' : '?'}</span>
              </div>
              <p className="font-semibold text-xs text-text-primary">{ach.name}</p>
              <p className="text-xs text-text-secondary mt-1">{ach.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended */}
      <section className="mb-8">
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">Recommended for You</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommended.map((book) => (
            <Link
              key={book.id}
              to={`/book/${book.id}`}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex gap-4"
            >
              <img src={book.cover} alt={book.title} className="w-16 h-20 rounded-lg object-cover" />
              <div>
                <h3 className="font-heading font-semibold text-text-primary text-sm mb-1">{book.title}</h3>
                <StarRating rating={book.rating} />
                <p className="text-xs text-text-secondary mt-1">{book.reason}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bookmarks */}
      <section>
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">Your Bookmarks</h2>
        <div className="space-y-3">
          {bookmarks.map((bm) => (
            <div key={bm.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
              <div>
                <p className="font-semibold text-text-primary text-sm">{bm.bookTitle}</p>
                <p className="text-xs text-text-secondary">Page {bm.page} - {bm.note}</p>
              </div>
              <Link
                to={`/read/${bm.id}`}
                className="text-green-soft hover:text-green-dark font-semibold text-sm transition-colors"
              >
                Resume
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
