const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chatSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isGuest: { type: Boolean, default: false },
  gift: { type: mongoose.Schema.Types.ObjectId, ref: 'Gift' },
  message: { type: String, required: false },
   // Add this new field
  imageUrl: { type: String },
  timestamp: { type: Date, default: Date.now },
  guestSessionId: { type: String },
});

module.exports = mongoose.models.Chat || mongoose.model('Chat', chatSchema);