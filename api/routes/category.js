const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const errResponse = require('../utils/errResponse');
const auth = require('../middlewares/auth');
const Dish = require('../models/Dish');

// @route GET api/category
// @dec Get all Categories
// @access Public
router.get('/', async (req, res, next) => {
	try {
		const categories = await Category.find({});
		categories.sort((a, b) => a.sortOrder - b.sortOrder);
		res.status(200).json(categories);
	} catch (err) {
		return next(err);
	}
});

// @route POST api/category
// @dec Create a category
// @access Admin
router.post('/', auth, async (req, res, next) => {
	try {
		const category = await Category.create(req.body);
		res.status(201).json(category);
	} catch (err) {
		return next(err);
	}
});

// @route GET api/category/:id
// @dec Get a category by id
// @access Public
router.get('/:id', async (req, res, next) => {
	try {
		const category = await Category.findById(req.params.id);

		if (!category) {
			return next(new errResponse('Category not found', 404));
		}

		res.status(200).json(category);
	} catch (err) {
		return next(err);
	}
});

// @route PUT api/category/:id
// @dec Edit a specific category
// @access Admin
router.put('/:id', auth, async (req, res, next) => {
	try {
		let category = await Category.findById(req.params.id);

		if (!category) {
			return next(new errResponse('Category not found', 404));
		}

		category = await Category.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		res.status(200).json(category);
	} catch (err) {
		return next(err);
	}
});

// @route Delete api/category/:id
// @dec Delete a specific category
// @access Admin
router.delete('/:id', auth, async (req, res, next) => {
	try {
		let category = await Category.findById(req.params.id);

		if (!category) {
			return next(new errResponse('Category not found', 404));
		}

		await Category.findByIdAndDelete(req.params.id);
		await Dish.deleteMany({ category: req.params.id });

		res.status(200).json({ msg: 'Category Removed' });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
