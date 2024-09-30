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
router.post('/',  createProgram);

router.get('/', getUserPrograms);

router.put('/:id',  updateProgram);

router.delete('/:id',  deleteProgram);

module.exports = router;
