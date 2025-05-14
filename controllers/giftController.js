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
        const gift = await Gift.findById(req.params.id);
        if (!gift) {
            return res.status(404).send('Gift not found');
        }

        res.render('giftMarketplace/detail', {
            gift,
            user: req.user 
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