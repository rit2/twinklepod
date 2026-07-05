const API_BASE = '/api';

function getToken() {
  return localStorage.getItem('token');
}

async function request(endpoint, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
}

// Auth
export const api = {
  auth: {
    login: (email, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
    register: (data) => request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
    me: () => request('/auth/me'),
  },
  books: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/books${query ? '?' + query : ''}`);
    },
    getFeatured: () => request('/books/featured'),
    getById: (id) => request(`/books/${id}`),
    create: (data) => request('/books', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`/books/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request(`/books/${id}`, { method: 'DELETE' }),
  },
  users: {
    toggleFavorite: (bookId) => request(`/users/favorites/${bookId}`, { method: 'POST' }),
    getFavorites: () => request('/users/favorites'),
    updateProgress: (bookId, data) => request(`/users/reading-progress/${bookId}`, { method: 'PUT', body: JSON.stringify(data) }),
    getProgress: () => request('/users/reading-progress'),
    addBookmark: (data) => request('/users/bookmarks', { method: 'POST', body: JSON.stringify(data) }),
    getBookmarks: () => request('/users/bookmarks'),
    removeBookmark: (index) => request(`/users/bookmarks/${index}`, { method: 'DELETE' }),
  },
  reviews: {
    getByBook: (bookId) => request(`/reviews/book/${bookId}`),
    create: (data) => request('/reviews', { method: 'POST', body: JSON.stringify(data) }),
    delete: (id) => request(`/reviews/${id}`, { method: 'DELETE' }),
  },
};
