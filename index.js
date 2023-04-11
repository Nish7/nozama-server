const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
const path = require('path');

// Connect DB
connectDB();
app.use(cors());

// Body Parser Init
app.use(express.json({ extended: false }));

// Test Route
app.get('/', async (req, res, next) => {
	res.status(200).json({ data: 'server is on!' });
});

// Mount Routes
app.use('/api/auth', require('./api/routes/auth'));
app.use('/api/category', require('./api/routes/category'));
app.use('/api/product', require('./api/routes/dish'));
app.use('/api/menu', require('./api/routes/menu'));
app.use('/api/order', require('./api/routes/order'));
app.use('/api/restaurant', require('./api/routes/restaurant'));

// For Dev only
app.use('/api/user', require('./api/routes/user'));
app.use(require('./api/middlewares/errorHandler'));


// Listening to Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`);
});
