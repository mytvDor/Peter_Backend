const express = require('express');
const { protect } = require('../middleware/authMiddleware'); 
const {
  createYouTubeUrl,
  getUserYouTubeUrls,
  updateYouTubeUrl,
  deleteYouTubeUrl,getAllYouTubeUrls
} = require('../controllers/youtubeController');

const router = express.Router();
router.get('/allurls', getAllYouTubeUrls);
router.post('/', protect, createYouTubeUrl);

router.get('/', protect, getUserYouTubeUrls);

router.put('/:id', protect, updateYouTubeUrl);

router.delete('/:id', protect, deleteYouTubeUrl);
module.exports = router;
