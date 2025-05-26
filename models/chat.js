const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chatSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isGuest: { type: Boolean, default: false },
  gift: { type: mongoose.Schema.Types.ObjectId, ref: 'Gift' },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Chat || mongoose.model('Chat', chatSchema);