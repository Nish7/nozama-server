const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Dish = require('../models/Dish');

// @route GET api/menu
// @dec Get menu
// @access Public
router.get('/', async (req, res, next) => {
	try {
		const dishes = await Dish.find()
			.or([{ OutOfStock: false }, { OutOfStock: null }])
			.populate('category', '-sortOrder');

		const dishByCategory = {};

		for (let dish of dishes) {
			if (!dishByCategory[dish.category.type]) {
				dishByCategory[dish.category.type] = [];
			}
			dishByCategory[dish.category.type].push(dish);
		}

		const categories = await Category.find({});

		sortedCategories = categories
			.sort((a, b) => a.sortOrder - b.sortOrder)
			.map((cat) => cat.type);

		res.status(200).json({ dishes: dishByCategory, sortedCategories });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
