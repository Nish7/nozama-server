const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const auth = require('../middlewares/auth');

// @method GET /api/restaurant
// @dec Get restaurant credentials
// @access Public
router.get('/', async (req, res, next) => {
	try {
		const info = await Restaurant.findOne({});
		res.status(200).json(!info ? [] : info);
	} catch (err) {
		next(err);
	}
});

// @method post /api/restaurant
// @dec add restaurant credentials
// @access Admin
router.post('/', auth, async (req, res, next) => {
	try {
		let info = await Restaurant.findOne({});

		if (!info) {
			info = await Restaurant.create(req.body);
		}

		info = await Restaurant.findOneAndUpdate({}, req.body, {
			new: true,
			runValidators: true,
		});

		res.status(200).json(info);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
