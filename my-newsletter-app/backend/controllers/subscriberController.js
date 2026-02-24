const Subscriber = require('../models/Subscriber');

// @desc    Subscribe to newsletter
// @route   POST /api/subscribers
// @access  Public
exports.subscribe = async (req, res) => {
    const { email } = req.body;

    try {
        const subscriberExists = await Subscriber.findOne({ email });

        if (subscriberExists) {
            return res.status(400).json({ message: 'Email already subscribed' });
        }

        const subscriber = await Subscriber.create({
            email
        });

        res.status(201).json(subscriber);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all subscribers
// @route   GET /api/subscribers
// @access  Private (Admin)
exports.getSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.find({});
        res.json(subscribers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
