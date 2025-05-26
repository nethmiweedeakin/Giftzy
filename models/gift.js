const mongoose = require('mongoose');

const giftSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
  availability: { type: Number, required: true },
  category: { type: String, required: true },
  inCartUsers: { type: Array, default: [] },
  rating: { type: Number, default: 0 },
  sellerID: { type: String, default: '123' },  
  sellerName: { type: String, default: 'user' },
  sellerEmail: { type: String, default: 'user@gmail.com' },
  reviews: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      rating: { type: Number, required: true },
      comment: String,
      createdAt: { type: Date, default: Date.now },
    },
  ], 

});

module.exports = mongoose.models.Gift || mongoose.model('Gift', giftSchema);