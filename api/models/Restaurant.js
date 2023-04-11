const mongoose = require('mongoose');

const RestaurantInfoSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
	},

	about: {
		type: String,
	},

	address: {
		type: String,
	},

	phone: {
		type: Number,
	},

	numberOfTables: {
		type: Number,
		required: [true, 'table number is required'],
	},
});

module.exports = mongoose.model('Restaurant', RestaurantInfoSchema);
