const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// For dev only
router.post('/', async (req, res, next) => {
	try {
		const { name, email, password, role } = req.body;

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = await User.create({
			name,
			email,
			password: hashedPassword,
			role,
		});
		return res.status(201).json(user);
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
