const express = require('express');
const router = express.Router();
const { eventReminderController } = require('../controllers');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/', authMiddleware, eventReminderController);

module.exports = router;
