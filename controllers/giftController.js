const giftService = require('../services/giftService.js');
const Gift = require('../models/gift');
const User = require('../models/user');

exports.listGifts = async (req, res) => {
  const gifts = await giftService.getAllGifts();

   let buyer = null;
  if (req.user?.id) {
    const dbUser = await User.findById(req.user.id).lean(); // lean for performance
    buyer = dbUser?.buyer || null;
  }
  res.render('giftMarketplace/index', { gifts, user: req.user, buyer });
};

exports.getGiftDetail = async (req, res) => {
  try {
    const gift = await Gift.findById(req.params.id)
      .populate('reviews.userId', 'name') // Populate only the 'name' field of user

    if (!gift) {
      return res.status(404).send('Gift not found');
    }

    res.render('giftMarketplace/detail', {
      gift,
      user: req.user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.showAddForm = (req, res) => {
  res.render('giftMarketplace/add');
};

exports.addGift = async (req, res) => {
  await giftService.createGift(req.body);
  res.redirect('/giftMarketplace');
};



exports.postReview = async (req, res) => {
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


