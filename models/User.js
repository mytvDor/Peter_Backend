const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: true }, 
  isVerified: { type: Boolean, default: false },
});

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.password = this.hashPassword(password);
};

UserSchema.methods.hashPassword = function (password) {
  return crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

UserSchema.methods.comparePassword = function (password) {
  const hashedPassword = this.hashPassword(password);
  return this.password === hashedPassword;
};

module.exports = mongoose.model('User', UserSchema);
