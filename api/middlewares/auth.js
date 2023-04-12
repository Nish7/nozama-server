const jwt = require('jsonwebtoken');
const errResponse = require('../utils/errResponse');
const config = require('config');

module.exports = function (req, res, next) {
	const token = req.header('x-auth-token');

	if (!token) return next(new errResponse('Authorisation Denied', 401));

	try {
		const decoded = jwt.verify(token, process.env.jwtSecret);
		req.user = decoded.user;
		next();
	} catch (err) {
		return next(new errResponse('Token Not valid', 401));
	}
};
