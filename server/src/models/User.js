const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const readingProgressSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  currentPage: { type: Number, default: 0 },
  totalPages: { type: Number, default: 0 },
  lastReadAt: { type: Date, default: Date.now },
}, { _id: false });

const bookmarkSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  page: { type: Number },
  note: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  ageGroup: { type: String },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  readingProgress: [readingProgressSchema],
  bookmarks: [bookmarkSchema],
  readingStreak: { type: Number, default: 0 },
  lastReadDate: { type: Date },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
