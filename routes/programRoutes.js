const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getAllPrograms,
  createProgram,
  getUserPrograms,
  updateProgram,
  deleteProgram
} = require('../controllers/programController');

const router = express.Router();

router.get('/allprograms', getAllPrograms);
router.post('/', protect, createProgram);

router.get('/', protect, getUserPrograms);

router.put('/:id', protect, updateProgram);

router.delete('/:id', protect, deleteProgram);

module.exports = router;
