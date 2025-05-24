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

exports.loadCartFromDB = async (req, token) => {
  let userId = null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = decoded.id;
    console.log('Decoded user ID:', userId);
  } catch (err) {
    console.error('JWT decode error during login cart load:', err);
    return;
  }

  if (!userId) return;

  try {
    const existingCart = await Cart.findOne({ userId });

    if (existingCart && existingCart.items.length > 0) {
      const sessionCart = [];

      for (const item of existingCart.items) {
        const gift = await Gift.findById(item.giftId);

        if (gift) {
          sessionCart.push({
            id: gift._id,
            name: gift.name,
            quantity: item.quantity
          });
        } else {
          // Fallback if gift is deleted or missing
          sessionCart.push({
            id: item.giftId,
            name: '(Gift not found)',
            quantity: item.quantity
          });
        }
      }

      req.session.cart = sessionCart;
      console.log('Cart loaded from DB into session:', req.session.cart);
    } else {
      console.log('No cart found for user or cart is empty.');
    }
  } catch (dbErr) {
    console.error('Error loading cart from DB:', dbErr);
  }
};


exports.handleCartOnLogout = async (req) => {
  const sessionCart = req.session.cart;
console.log('Session cart:', sessionCart);

// Get userId from JWT cookie
const token = req.cookies.token;
let userId = null;

try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  userId = decoded.id;
  console.log('Decoded user ID:', userId);
} catch (err) {
  console.error('JWT decode error:', err);
}

// ✅ Adjusted condition for array-based cart
if (Array.isArray(sessionCart) && sessionCart.length > 0 && userId) {
  const formattedItems = sessionCart.map(item => ({
    giftId: item.id,
    quantity: item.quantity || 1
  }));

  const newCart = new Cart({
    userId,
    items: formattedItems
  });

  try {
    await newCart.save();
    console.log('Cart saved to DB');
  } catch (saveErr) {
    console.error('Error saving cart:', saveErr);
  }

  for (const item of formattedItems) {
    try {
      await Gift.findByIdAndUpdate(
        item.giftId,
        { $addToSet: { inCartUsers: userId } }
      );
    } catch (updateErr) {
      console.error(`Error updating gift ${item.giftId}:`, updateErr);
    }
  }
} else {
  console.log('No cart to save or user not authenticated.');
}

req.session.cart = null;

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

