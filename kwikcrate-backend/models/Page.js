// models/Page.js
import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true }, // e.g., "privacy-policy", "terms", etc.
  content: { type: String, required: true },
}, {
  timestamps: true,
});

export default mongoose.models.Page || mongoose.model('Page', pageSchema);
