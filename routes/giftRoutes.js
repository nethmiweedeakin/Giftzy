
const express = require('express');
const router = express.Router();
const giftController = require('../controllers/giftController');
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');


const Gift = require('../models/gift');
const User = require('../models/user');

router.get('/', guestMiddleware, giftController.listGifts);
router.get('/add', authMiddleware, giftController.showAddForm);
router.post('/add', authMiddleware, giftController.addGift);

// View cart
router.get('/cart',guestMiddleware, cartController.viewCart);

router.get('/:id', guestMiddleware, giftController.getGiftDetail);

router.post('/:id/review', authMiddleware, giftController.postReview);

// Add item to cart
router.post('/cart/add/:id', guestMiddleware, cartController.addToCart);

// Remove a specific item
router.post('/cart/remove/:id', guestMiddleware, cartController.removeFromCart);

// Clear the whole cart
router.post('/cart/clear', guestMiddleware,  cartController.clearCart);
module.exports = router;
