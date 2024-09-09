const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Token = require('../models/Token');
const  User = require('../models/User');

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email });
    user.setPassword(password);
    await user.save();

    const token = new Token({
      userId: user._id,
      token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }),
      expires: Date.now() + 3600000,
    });
    await token.save();

    // Send email with verification link
    const transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify your email',
      text: `Please verify your email by clicking the link: ${process.env.FRONTEND_URL}/verify/${token.token}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: `emailverification token send to email Or Copy from here ${token}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const tokenDoc = await Token.findOne({ token }).populate('userId');
    if (!tokenDoc || tokenDoc.expires < Date.now()) return res.status(400).json({ message: 'Invalid or expired token' });

    const user = tokenDoc.userId;
    user.isVerified = true;
    await user.save();

    await Token.deleteOne({ token });

    res.status(200).json({ message: 'Email verified' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!user.comparePassword(password)) return res.status(400).json({ message: 'Invalid credentials' });
    if (!user.isVerified) return res.status(400).json({ message: 'Email not verified' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send email with reset link
    const transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password reset',
      text: `Please reset your password by clicking the link: ${process.env.FRONTEND_URL}/reset-password/${token}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: `token send to email Or Copy from here ${token}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.setPassword(newPassword);
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, verifyEmail, login, logout, forgotPassword, resetPassword };
