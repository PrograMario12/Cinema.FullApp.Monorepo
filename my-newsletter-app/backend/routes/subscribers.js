const express = require('express');
const router = express.Router();
const { subscribe, getSubscribers } = require('../controllers/subscriberController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(subscribe)
    .get(protect, getSubscribers);

module.exports = router;
