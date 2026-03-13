const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const logger = require('./utils/logger');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => logger.info('MongoDB connected'))
.catch(err => logger.error('MongoDB connection error', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/subscribers', require('./routes/subscribers'));
app.use('/api/screenings', require('./routes/screenings'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
