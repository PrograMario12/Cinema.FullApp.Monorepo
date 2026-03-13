const express = require('express');
const router = express.Router();

// Mock database (in production use MongoDB)
let screenings = [];

// @desc    Handle new screening requests
// @route   POST /api/screenings
router.post('/', (req, res) => {
    const { organization, audienceType, proposedDate, email, message } = req.body;

    // Basic Validation
    if (!organization || !email || !proposedDate) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const newRequest = {
        id: Date.now(),
        organization,
        audienceType,
        proposedDate,
        email,
        message,
        status: 'pending',
        createdAt: new Date()
    };

    screenings.push(newRequest);

    console.log('Nueva solicitud de screening recibida:', newRequest);

    // In production, send an email notification here
    res.status(201).json({ message: 'Solicitud recibida correctamente', data: newRequest });
});

module.exports = router;
