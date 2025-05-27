const Chat = require('../models/chat');
const Gift = require('../models/gift');
const User = require('../models/user');

exports.chatRoom = async (req, res) => {
  const { giftId } = req.params;
  const gift = await Gift.findById(giftId).populate('sellerID', 'sellerName');
  if (!gift) return res.status(404).send('Gift not found');
  const selectedQuantity = parseInt(req.body.quantity) || 1;

  res.render('giftMarketplace/chat', {
    gift,
    user: req.user || { _id: req.session.user, isGuest: true },
    quantity: selectedQuantity,
  });
};

exports.getChatHistory = async (req, res) => {
  const { giftId } = req.params;
  const messages = await Chat.find({ gift: giftId })
    .populate('sender', 'name')
    .sort({ createdAt: 1 });

  res.json(messages);
};
