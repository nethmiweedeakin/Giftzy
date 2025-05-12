const mongoose = require('mongoose');

const giftSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
  Availability: { type: Number, required: true },
});

module.exports = mongoose.model('Gift', giftSchema);