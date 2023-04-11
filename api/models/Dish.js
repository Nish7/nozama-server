const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
	dishName: {
		type: String,
		required: [true, 'Please add a Dish Name'],
		trim: true,
		unique: [true, 'Dish Name already Exists'],
	},

	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: [true, 'Please add a category'],
	},

	price: {
		type: Number,
		required: [true, 'Please add the price'],
	},

	image: {
		type: String,
	},

	featured: {
		type: Boolean,
		default: false,
	},

	hot: {
		type: Boolean,
		default: false,
	},

	OutOfStock: {
		type: Boolean,
		default: false,
	},
	ordered: {
		type: Number,
		default: 0,
	},
});

module.exports = mongoose.model('Dish', DishSchema);
