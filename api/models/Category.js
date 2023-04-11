const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
	type: {
		type: String,
		trim: true,
		required: [true, 'Please add a Type of Category'],
		unique: [true, 'Category Type already Exists'],
	},
	sortOrder: {
		type: Number,
		required: [true, 'Please add a Sort Order'],
		unique: [true, 'Sort oder already exists'],
	},
});

module.exports = mongoose.model('Category', CategorySchema);
