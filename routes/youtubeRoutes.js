const express = require('express');
const { protect } = require('../middleware/authMiddleware'); // Middleware to check if user is logged in
const {
  createYouTubeUrl,
  getUserYouTubeUrls,
  updateYouTubeUrl,
  deleteYouTubeUrl,
} = require('../controllers/youtubeController');

const router = express.Router();

// Create a new YouTube URL (POST)
router.post('/', protect, createYouTubeUrl);

// Get all YouTube URLs for the logged-in user (GET)
router.get('/', protect, getUserYouTubeUrls);

// Update a YouTube URL (PUT)
router.put('/:id', protect, updateYouTubeUrl);

// Delete a YouTube URL (DELETE)
router.delete('/:id', protect, deleteYouTubeUrl);

module.exports = router;
