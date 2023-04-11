const errResponse = require('../utils/errResponse');

const errorHandler = (err, req, res, next) => {
	let error = { ...err };
	error.message = err.message;

	//CastError
	if (err.name === 'CastError') {
		const message = `Resource not found`;
		error = new errResponse(message, 404);
	}

	//DuplicationError
	if (err.code === 11000) {
		const message = `${Object.keys(err.keyValue)[0]} field already exist`;
		error = new errResponse(message, 400);
	}

	//ValidationError
	if (err.name === 'ValidationError') {
		const message = Object.values(err.errors).map((val) => val.message);
		error = new errResponse(message, 400);
		error.message = error.message.split(',').map((msg) => msg.trim());
	}

	//Response
	res.status(error.statusCode || 500).json({
		success: false,
		errors:
			(Array.isArray(error.message) ? error.message : [error.message]) ||
			'Server Error',
	});
};

module.exports = errorHandler;
