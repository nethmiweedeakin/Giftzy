const e = require('express');
const Gift = require('../models/gift');
const jwt = require('jsonwebtoken');
const Cart = require('../models/cart');


exports.getAllGifts = async () => {
    return await Gift.find();
  };

exports.getGiftById = async (id) => {
  return await Gift.findById(id);
};

exports.getGiftByIdWithReviews = async (giftId) => {
  return await Gift.findById(giftId).populate('reviews.userId');
};

exports.createGift = async (giftData) => {
  const gift = new Gift(giftData);
  return await gift.save();
};

exports.updateGift = async (id, updateData) => {
  return await Gift.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteGift = async (id) => {
  return await Gift.findByIdAndDelete(id);
};

exports.getGiftsByCategory = async (category) => {
  return await Gift.find({ category });
};
exports.getGiftsByPriceRange = async (minPrice, maxPrice) => {
  return await Gift.find({ price: { $gte: minPrice, $lte: maxPrice } });
};              

exports.getGiftsByAvailability = async (availability) => {
  return await Gift.find({ Availability: { $gte: availability } });
}                       

exports.getGiftsByDate = async (startDate, endDate) => {
  return await Gift.find({ createdAt: { $gte: startDate, $lte: endDate } });
};          

exports.getGiftsByName = async (name) => {         
  return await Gift.find({ name: { $regex: name, $options: 'i' } });
}   

exports.getGiftsBySeller = async (sellerId) => {
  return await Gift.find({ sellerID: sellerId });
};

exports.getGiftsByRating = async (rating) => {  
  return await Gift.find({ rating: { $gte: rating } });
} 


exports.postReviewIntoDB = async (req, res) => {
  try {
    const giftId = req.params.id;
    const { rating, comment } = req.body;

    const gift = await Gift.findById(giftId);
    if (!gift) return res.status(404).send('Gift not found');

    const userId = req.user?.id;
    if (!userId) return res.status(401).send('Not logged in');

    // Check if user already reviewed
    const existingReview = gift.reviews.find(
      (rev) => rev.userId?.toString() === userId.toString()
    );

    if (existingReview) {
      // Update review
      existingReview.rating = rating;
      existingReview.comment = comment;
      existingReview.createdAt = new Date();
    } else {
      // Add new review
      gift.reviews.push({
        userId,
        rating,
        comment,
      });
    }

    await gift.save();
    res.redirect(`/gifts/${giftId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
