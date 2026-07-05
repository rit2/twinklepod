# Twinkle Pod

A free, open digital children's book library built with React and Node.js. Browse, read, and discover stories from Creative Commons and public domain sources.

## Features

- Browse books by age group, reading level, theme, and language
- Immersive online reading experience with dark mode, adjustable font size, and progress tracking
- User accounts with favorites, reading history, and achievements
- Admin dashboard for managing books, categories, and authors
- Book import tools for Project Gutenberg and Open Library
- Image upload via Cloudinary
- Proper Creative Commons attribution and license display for every book
- Mobile-friendly responsive design

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS v4, React Router
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT
- **Image Storage:** Cloudinary
- **Deployment:** Vercel (frontend), Render (backend), MongoDB Atlas

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas connection string)

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/twinklepod.git
cd twinklepod

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

### Environment Variables

Copy the example env file and fill in your values:

```bash
cp server/.env.example server/.env
```

Required variables:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

### Running Locally

```bash
# Terminal 1 - Start the backend
cd server
npm run dev

# Terminal 2 - Start the frontend
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5001

### Seeding the Database

```bash
cd server

# Seed with sample books + admin user
npm run seed

# Import books from Project Gutenberg (public domain)
npm run import:gutenberg

# Import books from Open Library (requires license verification)
npm run import:openlibrary
```

Default admin credentials: `admin@twinklepod.com` / `admin123`

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Create account | - |
| POST | /api/auth/login | Login | - |
| GET | /api/auth/me | Get current user | Required |
| GET | /api/books | List/search/filter books | - |
| GET | /api/books/featured | Get featured books | - |
| GET | /api/books/:id | Get single book | - |
| POST | /api/books | Create book | Admin |
| PUT | /api/books/:id | Update book | Admin |
| DELETE | /api/books/:id | Delete book | Admin |
| POST | /api/users/favorites/:bookId | Toggle favorite | Required |
| GET | /api/users/favorites | Get favorites | Required |
| PUT | /api/users/reading-progress/:bookId | Save progress | Required |
| GET | /api/users/reading-progress | Get progress | Required |
| POST | /api/users/bookmarks | Add bookmark | Required |
| GET | /api/reviews/book/:bookId | Get book reviews | - |
| POST | /api/reviews | Create review | Required |
| POST | /api/upload | Upload image | Admin |

## Deployment

### Frontend (Vercel)

1. Push repo to GitHub
2. Import project in Vercel
3. Set root directory to `/` (frontend is at root)
4. Vercel will auto-detect Vite
5. Add environment variable: `VITE_API_URL` = your Render backend URL

### Backend (Render)

1. Create a new Web Service in Render
2. Set root directory to `server`
3. Build command: `npm install`
4. Start command: `node src/index.js`
5. Add all environment variables from `.env.example`

### Database (MongoDB Atlas)

1. Create a free cluster at mongodb.com/atlas
2. Create a database user
3. Whitelist IPs (or allow all: 0.0.0.0/0)
4. Get connection string and use it as `MONGODB_URI`

## Content Sourcing

All books are sourced from legal, open-license sources:

- **Project Gutenberg** — Public domain books (no restrictions)
- **Open Library** — Verify individual book licenses
- **Standard Ebooks** — Public domain with enhanced formatting
- **Wikisource** — Public domain texts

Each book displays its license and attribution information.

## License

MIT
