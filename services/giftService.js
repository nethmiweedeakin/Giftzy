const e = require('express');
const Gift = require('../models/gift');

exports.getAllGifts = async () => {
    return await Gift.find();
  };

exports.getGiftById = async (id) => {
  return await Gift.findById(id);
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

exports.getGiftsByUser = async () => { Gift.findById(req.params.id)
  .populate('reviews.userId'); //  access to user's name, email etc.
}
