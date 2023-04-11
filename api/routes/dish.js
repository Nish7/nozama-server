const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Dish = require('../models/Dish');
const errResponse = require('../utils/errResponse');
const auth = require('../middlewares/auth');

// @route GET api/dish
// @dec Get all dishes
// @access Public
router.get('/', async (req, res, next) => {
	try {
		const dishes = await Dish.find({}).populate('category', '-sortOrder');
		res.status(200).json(dishes);
	} catch (err) {
		return next(err);
	}
});

// @route POST api/dish
// @dec Create a dish
// @access Admin
router.post('/', auth, async (req, res, next) => {
	try {
		const dish = await Dish.create(req.body);
		res.status(201).json(dish);
	} catch (err) {
		return next(err);
	}
});

// @route GET api/dish/:id
// @dec Get a dish by id
// @access Public
router.get('/:id', async (req, res, next) => {
	try {
		const dish = await Dish.findById(req.params.id).populate('category');

		if (!dish) {
			return next(new errResponse('Dish not found', 404));
		}

		res.status(200).json(dish);
	} catch (err) {
		return next(err);
	}
});

// @route PUT api/dish/:id
// @dec Edit a dish by id
// @access Admin
router.put('/:id', auth, async (req, res, next) => {
	try {
		let dish = await Dish.findById(req.params.id);
		if (!dish) {
			return next(new errResponse('Dish not found', 404));
		}

		dish = await Dish.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		res.status(200).json(dish);
	} catch (err) {
		return next(err);
	}
});

// @route Delete api/dish/:id
// @dec Delete a specific dish
// @access Admin
router.delete('/:id', auth, async (req, res, next) => {
	try {
		let dish = await Dish.findById(req.params.id);

		if (!dish) {
			return next(new errResponse('Dish not found', 404));
		}

		await Dish.findByIdAndDelete(req.params.id);

		res.status(200).json({ msg: 'Dish Removed' });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
