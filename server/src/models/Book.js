const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  illustrator: { type: String, trim: true },
  description: { type: String, required: true },
  coverImage: { type: String, default: '' },
  pages: [{ type: String }],
  readingTime: { type: String },
  language: { type: String, default: 'English' },
  license: { type: String, required: true },
  licenseUrl: { type: String },
  tags: [{ type: String }],
  ageGroup: { type: String, enum: ['Ages 3-5', 'Ages 6-8', 'Ages 9-12'], required: true },
  readingLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  theme: { type: String },
  featured: { type: Boolean, default: false },
  publishedYear: { type: Number },
  status: { type: String, enum: ['Published', 'Draft', 'Review'], default: 'Draft' },
}, { timestamps: true });

bookSchema.index({ title: 'text', author: 'text', tags: 'text', description: 'text' });

module.exports = mongoose.model('Book', bookSchema);
