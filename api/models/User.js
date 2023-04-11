const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	email: {
		type: String,
		trim: true,
		required: [true, 'Please add an email'],
	},
	name: {
		type: String,
		trim: true,
		required: [true, 'Please add name'],
	},
	password: {
		type: String,
		trim: true,
		required: [true, 'Please add password'],
	},
	role: {
		type: String,
		trim: true,
		required: [true, 'Please add a role'],
	},
});

module.exports = mongoose.model('User', UserSchema);
