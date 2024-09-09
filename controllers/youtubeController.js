const YouTubeUrl = require('../models/YouTubeUrl');

const getAllYouTubeUrls = async (req, res) => {
    try {
      const youtubeUrls = await YouTubeUrl.find();
      res.status(200).json(youtubeUrls);
    } catch (error) {
      console.error('Error fetching YouTube URLs:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
const createYouTubeUrl = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: 'YouTube URL is required' });
  }

  try {
    const newUrl = new YouTubeUrl({
      email: req.body.email, 
      url,
    });
    await newUrl.save();
    res.status(201).json(newUrl);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getUserYouTubeUrls = async (req, res) => {
  try {
    const urls = await YouTubeUrl.find({ email: req.body.email });
    res.json(urls);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateYouTubeUrl = async (req, res) => {
  const { id } = req.params;
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: 'YouTube URL is required' });
  }

  try {
    const updatedUrl = await YouTubeUrl.findOneAndUpdate(
      { _id: id, email: req.body.email }, 
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

const deleteYouTubeUrl = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUrl = await YouTubeUrl.findOneAndDelete({
      _id: id,
      email: req.body.email, 
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
  deleteYouTubeUrl,getAllYouTubeUrls
};
