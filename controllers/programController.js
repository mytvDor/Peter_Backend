const Program = require('../models/Program');

const getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find();
    res.status(200).json(programs);
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createProgram = async (req, res) => {
  const { title, description, price } = req.body;
// console.log(req.body)
  // if (!title || !description || !price) {
  //   return res.status(400).json({ message: 'All fields are required' });
  // }

  try {
    const newProgram = new Program({
      title,
      description,
      price,
    });
    await newProgram.save();
    res.status(201).json(newProgram);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getUserPrograms = async (req, res) => {
  try {
    const programs = await Program.find({ email: req.body.email });
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateProgram = async (req, res) => {
  const { id } = req.params;
  const { title, description, price } = req.body;

  if (!title || !description || !price) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const updatedProgram = await Program.findOneAndUpdate(
      { _id: id }, 
      { title, description, price },
      { new: true }
    );

    if (!updatedProgram) {
      return res.status(404).json({ message: 'Program not found or unauthorized' });
    }

    res.json(updatedProgram);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteProgram = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProgram = await Program.findOneAndDelete({
      _id: id,
    });

    if (!deletedProgram) {
      return res.status(404).json({ message: 'Program not found or unauthorized' });
    }

    res.json({ message: 'Program deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllPrograms,
  createProgram,
  getUserPrograms,
  updateProgram,
  deleteProgram,
};
