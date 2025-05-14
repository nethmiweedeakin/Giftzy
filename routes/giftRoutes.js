
const express = require('express');
const router = express.Router();
const giftController = require('../controllers/giftController');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');


const Gift = require('../models/gift');
const User = require('../models/user');

router.get('/', guestMiddleware, giftController.listGifts);
router.get('/add', authMiddleware, giftController.showAddForm);
router.post('/add', authMiddleware, giftController.addGift);
router.get('/:id', guestMiddleware, giftController.getGiftDetail);

router.post('/:id/review', authMiddleware, giftController.postReview);

module.exports = router;
