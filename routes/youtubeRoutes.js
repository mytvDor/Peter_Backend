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
router.post('/',  createYouTubeUrl);

router.get('/', protect, getUserYouTubeUrls);

router.put('/:id', updateYouTubeUrl);

router.delete('/:id',  deleteYouTubeUrl);
module.exports = router;
