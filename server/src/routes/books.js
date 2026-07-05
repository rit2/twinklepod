const express = require('express');
const Book = require('../models/Book');
const { auth, adminOnly } = require('../middleware/auth');

const router = express.Router();

// GET /api/books - Get all books with search/filter
router.get('/', async (req, res) => {
  try {
    const { search, ageGroup, readingLevel, theme, language, license, featured, status, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (search) filter.$text = { $search: search };
    if (ageGroup) filter.ageGroup = ageGroup;
    if (readingLevel) filter.readingLevel = readingLevel;
    if (theme) filter.theme = theme;
    if (language) filter.language = language;
    if (license) filter.license = license;
    if (featured) filter.featured = featured === 'true';
    if (status) filter.status = status;

    // Default: only show published books to non-admin
    if (!status) filter.status = 'Published';

    const skip = (Number(page) - 1) * Number(limit);
    const books = await Book.find(filter).skip(skip).limit(Number(limit)).sort({ createdAt: -1 });
    const total = await Book.countDocuments(filter);

    res.json({
      books,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/books/featured
router.get('/featured', async (req, res) => {
  try {
    const books = await Book.find({ featured: true, status: 'Published' }).limit(6);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/books/:id
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/books - Create (admin only)
router.post('/', auth, adminOnly, async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/books/:id - Update (admin only)
router.put('/:id', auth, adminOnly, async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/books/:id - Delete (admin only)
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
