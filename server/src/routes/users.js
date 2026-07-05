const express = require('express');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// POST /api/users/favorites/:bookId - Toggle favorite
router.post('/favorites/:bookId', auth, async (req, res) => {
  try {
    const user = req.user;
    const bookId = req.params.bookId;
    const index = user.favorites.indexOf(bookId);

    if (index > -1) {
      user.favorites.splice(index, 1);
    } else {
      user.favorites.push(bookId);
    }

    await user.save();
    res.json({ favorites: user.favorites, isFavorite: index === -1 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/users/favorites - Get user favorites
router.get('/favorites', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites');
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/users/reading-progress/:bookId - Update reading progress
router.put('/reading-progress/:bookId', auth, async (req, res) => {
  try {
    const { currentPage, totalPages } = req.body;
    const user = req.user;
    const bookId = req.params.bookId;

    const existingIndex = user.readingProgress.findIndex(
      (p) => p.book.toString() === bookId
    );

    if (existingIndex > -1) {
      user.readingProgress[existingIndex].currentPage = currentPage;
      user.readingProgress[existingIndex].totalPages = totalPages;
      user.readingProgress[existingIndex].lastReadAt = new Date();
    } else {
      user.readingProgress.push({ book: bookId, currentPage, totalPages, lastReadAt: new Date() });
    }

    // Update reading streak
    const today = new Date().toDateString();
    const lastRead = user.lastReadDate ? user.lastReadDate.toDateString() : null;
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (lastRead !== today) {
      if (lastRead === yesterday) {
        user.readingStreak += 1;
      } else if (lastRead !== today) {
        user.readingStreak = 1;
      }
      user.lastReadDate = new Date();
    }

    await user.save();
    res.json({ readingProgress: user.readingProgress, readingStreak: user.readingStreak });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/users/reading-progress - Get all reading progress
router.get('/reading-progress', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('readingProgress.book');
    res.json(user.readingProgress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/users/bookmarks - Add bookmark
router.post('/bookmarks', auth, async (req, res) => {
  try {
    const { bookId, page, note } = req.body;
    const user = req.user;

    user.bookmarks.push({ book: bookId, page, note });
    await user.save();
    res.status(201).json(user.bookmarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/users/bookmarks - Get bookmarks
router.get('/bookmarks', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('bookmarks.book');
    res.json(user.bookmarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/users/bookmarks/:index - Remove bookmark
router.delete('/bookmarks/:index', auth, async (req, res) => {
  try {
    const user = req.user;
    user.bookmarks.splice(Number(req.params.index), 1);
    await user.save();
    res.json(user.bookmarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
