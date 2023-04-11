const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middlewares/auth');
const errResponse = require('../utils/errResponse');
const Dish = require('../models/Dish');
const pusher = require('../../config/pusher');
const moment = require('moment');

// @route GET api/order
// @dec Get all orders
// @access Public
router.get('/', auth, async (req, res, next) => {
	const start = moment(req.query.date) || moment();
	const end = moment(start).add(1, 'days');

	try {
		let orders = await Order.find({
			date: {
				$gte: start,
				$lt: end,
			},
		}).sort({ date: -1 });

		// orders = orders.sort((a, b) => b.date - a.date);
		res.status(200).json(orders);
	} catch (err) {
		return next(err);
	}
});

// @route POST api/order
// @dec add an order
// @access Public
router.post('/', async (req, res, next) => {
	try {
		// Dishes Validation
		const { dishes, tableNum } = req.body;
		if (!dishes || dishes.length === 0 || !Array.isArray(dishes)) {
			return next(new errResponse('Add atleast one dish', 400));
		}

		const modifiedDish = [];

		for (let item of dishes) {
			const { quantity, id } = item;

			const dish = await Dish.findById(id);
			dish['ordered'] = dish['ordered'] + 1;
			await dish.save();

			modifiedDish.push({
				dishId: id,
				dishName: dish['dishName'],
				price: dish['price'],
				quantity,
			});
		}

		// Calcuate Total Price
		const totalPrice = modifiedDish.reduce(
			(acc, curr) => acc + curr.price * curr.quantity,
			0,
		);

		const orderId = (await Order.countDocuments()) + 1;

		const newOrder = await Order.create({
			orderId,
			dishes: modifiedDish,
			tableNum,
			totalPrice,
		});

		pusher.trigger('orderChannel', 'inserted', {
			newOrder,
		});

		res.status(201).json(newOrder);
	} catch (err) {
		return next(err);
	}
});

// @route PUT api/order/:id/status
// @dec update the order status
// @access Admin
router.put('/:id/status', auth, async (req, res, next) => {
	try {
		const { status } = req.body;

		const order = await Order.findByIdAndUpdate(
			req.params.id,
			{ status },
			{ new: true, runValidators: true },
		);

		res.status(200).json(order);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
