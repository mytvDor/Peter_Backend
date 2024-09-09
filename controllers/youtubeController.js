const YouTubeUrl = require('../models/YouTubeUrl');

// Create a new YouTube URL
const createYouTubeUrl = async (req, res) => {
  const { url } = req.body;

  // Check if the URL is provided
  if (!url) {
    return res.status(400).json({ message: 'YouTube URL is required' });
  }

  try {
    const newUrl = new YouTubeUrl({
      email: req.user.email, // The logged-in user's email
      url,
    });
    await newUrl.save();
    res.status(201).json(newUrl);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all YouTube URLs for the logged-in user
const getUserYouTubeUrls = async (req, res) => {
  try {
    const urls = await YouTubeUrl.find({ email: req.user.email });
    res.json(urls);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a YouTube URL by ID
const updateYouTubeUrl = async (req, res) => {
  const { id } = req.params;
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: 'YouTube URL is required' });
  }

  try {
    const updatedUrl = await YouTubeUrl.findOneAndUpdate(
      { _id: id, email: req.user.email }, // Ensure the logged-in user owns this URL
      { url },
      { new: true }
    );

    if (!updatedUrl) {
      return res.status(404).json({ message: 'YouTube URL not found or unauthorized' });
    }

    res.json(updatedUrl);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a YouTube URL by ID
const deleteYouTubeUrl = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUrl = await YouTubeUrl.findOneAndDelete({
      _id: id,
      email: req.user.email, // Ensure the logged-in user owns this URL
    });

    if (!deletedUrl) {
      return res.status(404).json({ message: 'YouTube URL not found or unauthorized' });
    }

    res.json({ message: 'YouTube URL deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createYouTubeUrl,
  getUserYouTubeUrls,
  updateYouTubeUrl,
  deleteYouTubeUrl,
};
