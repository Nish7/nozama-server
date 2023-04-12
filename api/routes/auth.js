const express = require('express');
const router = express.Router();
const User = require('../models/User');
const errResponse = require('../utils/errResponse');
const bcrypt = require('bcryptjs');
const auth = require('../middlewares/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult } = require('express-validator');

// @route POST api/auth
// @dec Authenticate User
// @access Public
router.post(
	'/',
	[
		body('email', 'Please include an valid email').isEmail(),
		body('password', 'password is required').exists(),
	],
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return next(
				new errResponse(
					errors.array().map((err) => err.msg),
					400,
				),
			);
		}

		try {
			const { email, password } = req.body;

			const user = await User.findOne({ email });


			if (!user) {
				return next(new errResponse('Email does not exists', 404));
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return next(new errResponse('Credentials Invalid', 400));
			}

			const payload = {
				user: {
					id: user._id,
				},
			};

			jwt.sign(
				payload,
				process.env.jwtSecret,
				{ expiresIn: 3600 },
				(err, token) => {
					if (err) {
						return next(err);
					}

					res.status(200).json({ token });
				},
			);
		} catch (err) {
			return next(err);
		}
	},
);

// @route GET api/auth
// @dec Get logged in user
// @access Admin
router.get('/', auth, async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.status(200).json(user);
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
