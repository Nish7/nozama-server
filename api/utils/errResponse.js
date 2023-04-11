class errResponse extends Error {
	constructor(message, statuscCode) {
		super(message);
		this.statusCode = statuscCode;
	}
}

module.exports = errResponse;
