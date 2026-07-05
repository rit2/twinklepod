import { useState } from 'react';

const stats = [
  { label: "Total Books", value: 142 },
  { label: "Total Users", value: 1247 },
  { label: "Total Reads", value: 8932 },
  { label: "Reviews", value: 486 },
];

const booksData = [
  { id: 1, title: "Pip's Cosmic Trip", author: "Luna Starfield", ageGroup: "Ages 3-5", license: "CC BY 4.0", status: "Published", reads: 342 },
  { id: 2, title: "The Sleepy Bear's Secret", author: "Mia Honeywood", ageGroup: "Ages 3-5", license: "CC BY-SA 4.0", status: "Published", reads: 289 },
  { id: 3, title: "Luna's Night Flight", author: "Ava Moonlight", ageGroup: "Ages 6-8", license: "CC BY 4.0", status: "Published", reads: 456 },
  { id: 4, title: "The Brave Little Fox", author: "Oliver Greenleaf", ageGroup: "Ages 6-8", license: "CC BY 4.0", status: "Draft", reads: 0 },
  { id: 5, title: "Ocean Wonders", author: "Coral Deepwater", ageGroup: "Ages 6-8", license: "Public Domain", status: "Published", reads: 512 },
  { id: 6, title: "The Dragon Who Drew", author: "Berra Gners", ageGroup: "Ages 9-12", license: "CC BY 4.0", status: "Published", reads: 198 },
  { id: 7, title: "Space Explorers", author: "Canea Explorers", ageGroup: "Ages 9-12", license: "CC BY-SA 4.0", status: "Review", reads: 0 },
  { id: 8, title: "Mystery Woods", author: "Marra Anlinen", ageGroup: "Ages 9-12", license: "CC BY 4.0", status: "Published", reads: 267 },
];

const categories = [
  { id: 1, name: "Adventure", bookCount: 24 },
  { id: 2, name: "Animals & Nature", bookCount: 31 },
  { id: 3, name: "Bedtime", bookCount: 18 },
  { id: 4, name: "Friendship", bookCount: 22 },
  { id: 5, name: "Magic & Fantasy", bookCount: 19 },
  { id: 6, name: "STEM", bookCount: 12 },
];

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [ageFilter, setAgeFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [activeTab, setActiveTab] = useState('books');

  const booksPerPage = 5;

  const filteredBooks = booksData.filter((book) => {
    const matchesSearch = searchQuery === '' ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || book.status === statusFilter;
    const matchesAge = ageFilter === 'All' || book.ageGroup === ageFilter;
    return matchesSearch && matchesStatus && matchesAge;
  });

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  return (
    <main className="px-4 md:px-12 py-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
          Admin Dashboard
        </h1>
        <button
          onClick={() => setShowUploadModal(true)}
          className="mt-4 md:mt-0 bg-green-soft hover:bg-green-dark text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-md"
        >
          + Add New Book
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm text-center">
            <div className="text-3xl font-bold text-text-primary">{stat.value.toLocaleString()}</div>
            <div className="text-sm text-text-secondary mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('books')}
          className={`px-5 py-3 font-semibold transition-colors border-b-2 ${activeTab === 'books' ? 'border-green-soft text-green-soft' : 'border-transparent text-text-secondary hover:text-text-primary'}`}
        >
          Books
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-5 py-3 font-semibold transition-colors border-b-2 ${activeTab === 'categories' ? 'border-green-soft text-green-soft' : 'border-transparent text-text-secondary hover:text-text-primary'}`}
        >
          Categories
        </button>
        <button
          onClick={() => setActiveTab('authors')}
          className={`px-5 py-3 font-semibold transition-colors border-b-2 ${activeTab === 'authors' ? 'border-green-soft text-green-soft' : 'border-transparent text-text-secondary hover:text-text-primary'}`}
        >
          Authors
        </button>
      </div>

      {/* Books Tab */}
      {activeTab === 'books' && (
        <div>
          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <div className="flex-1 flex items-center bg-white rounded-lg px-4 py-2 shadow-sm">
              <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                placeholder="Search books or authors..."
                className="flex-1 bg-transparent outline-none text-text-primary placeholder-gray-400"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-text-primary"
            >
              <option value="All">All Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Review">Review</option>
            </select>
            <select
              value={ageFilter}
              onChange={(e) => { setAgeFilter(e.target.value); setCurrentPage(1); }}
              className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-text-primary"
            >
              <option value="All">All Ages</option>
              <option value="Ages 3-5">Ages 3-5</option>
              <option value="Ages 6-8">Ages 6-8</option>
              <option value="Ages 9-12">Ages 9-12</option>
            </select>
          </div>

          {/* Books Table */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-text-secondary uppercase">Title</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-text-secondary uppercase">Author</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-text-secondary uppercase hidden md:table-cell">Age Group</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-text-secondary uppercase hidden md:table-cell">License</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-text-secondary uppercase">Status</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-text-secondary uppercase hidden md:table-cell">Reads</th>
                    <th className="text-right px-6 py-4 text-xs font-semibold text-text-secondary uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedBooks.map((book) => (
                    <tr key={book.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-text-primary text-sm">{book.title}</td>
                      <td className="px-6 py-4 text-text-secondary text-sm">{book.author}</td>
                      <td className="px-6 py-4 text-text-secondary text-sm hidden md:table-cell">{book.ageGroup}</td>
                      <td className="px-6 py-4 text-text-secondary text-sm hidden md:table-cell">{book.license}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          book.status === 'Published' ? 'bg-green-100 text-green-700' :
                          book.status === 'Draft' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {book.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-text-secondary text-sm hidden md:table-cell">{book.reads.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-green-soft hover:text-green-dark text-sm font-semibold mr-3 transition-colors">
                          Edit
                        </button>
                        <button className="text-red-400 hover:text-red-600 text-sm font-semibold transition-colors">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
              <p className="text-sm text-text-secondary">
                Showing {(currentPage - 1) * booksPerPage + 1}–{Math.min(currentPage * booksPerPage, filteredBooks.length)} of {filteredBooks.length}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-lg text-sm font-semibold bg-gray-100 text-text-secondary hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded-lg text-sm font-semibold transition-colors ${
                      currentPage === i + 1 ? 'bg-green-soft text-white' : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-lg text-sm font-semibold bg-gray-100 text-text-secondary hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="font-heading font-semibold text-text-primary">{cat.name}</h3>
                <p className="text-sm text-text-secondary">{cat.bookCount} books</p>
              </div>
              <div className="flex gap-2">
                <button className="text-green-soft hover:text-green-dark text-sm font-semibold transition-colors">Edit</button>
                <button className="text-red-400 hover:text-red-600 text-sm font-semibold transition-colors">Delete</button>
              </div>
            </div>
          ))}
          <button className="bg-white rounded-2xl p-5 shadow-sm border-2 border-dashed border-gray-200 hover:border-green-soft text-text-secondary hover:text-green-soft font-semibold transition-colors">
            + Add Category
          </button>
        </div>
      )}

      {/* Authors Tab */}
      {activeTab === 'authors' && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-text-secondary uppercase">Author</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-text-secondary uppercase">Books</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-text-secondary uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[...new Set(booksData.map(b => b.author))].map((author) => (
                  <tr key={author} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-text-primary text-sm">{author}</td>
                    <td className="px-6 py-4 text-text-secondary text-sm">{booksData.filter(b => b.author === author).length}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-green-soft hover:text-green-dark text-sm font-semibold transition-colors">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl font-bold text-text-primary">Add New Book</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-text-secondary hover:bg-gray-200 transition-colors"
              >
                X
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-text-secondary block mb-1">Title</label>
                <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-green-soft" placeholder="Book title" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-text-secondary block mb-1">Author</label>
                  <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-green-soft" placeholder="Author name" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-text-secondary block mb-1">Illustrator</label>
                  <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-green-soft" placeholder="Illustrator name" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-text-secondary block mb-1">Description</label>
                <textarea className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-green-soft h-24 resize-none" placeholder="Book description"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-text-secondary block mb-1">Age Group</label>
                  <select className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white">
                    <option>Ages 3-5</option>
                    <option>Ages 6-8</option>
                    <option>Ages 9-12</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-text-secondary block mb-1">Reading Level</label>
                  <select className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-text-secondary block mb-1">License</label>
                  <select className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white">
                    <option>CC BY 4.0</option>
                    <option>CC BY-SA 4.0</option>
                    <option>CC BY-NC 4.0</option>
                    <option>Public Domain</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-text-secondary block mb-1">Language</label>
                  <select className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-text-secondary block mb-1">Cover Image</label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                  <p className="text-text-secondary text-sm">Drag and drop or click to upload</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-text-secondary block mb-1">Tags</label>
                <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-green-soft" placeholder="Comma-separated tags" />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-5 py-3 rounded-full font-semibold border border-gray-200 text-text-secondary hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-soft hover:bg-green-dark text-white font-semibold px-5 py-3 rounded-full transition-colors"
                >
                  Add Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
