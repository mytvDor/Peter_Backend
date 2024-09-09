const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: true }, // To store salt for custom encryption
  isVerified: { type: Boolean, default: false },
});

// Method to set password and salt
UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.password = this.hashPassword(password);
};

// Method to hash password with salt
UserSchema.methods.hashPassword = function (password) {
  return crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

// Method to compare password
UserSchema.methods.comparePassword = function (password) {
  const hashedPassword = this.hashPassword(password);
  return this.password === hashedPassword;
};

module.exports = mongoose.model('User', UserSchema);
