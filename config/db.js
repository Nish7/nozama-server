const mongoose = require('mongoose');
const config = require('config');
const dbURI = config.get('mongoURI');

const connectDB = async () => {
	try {
		const db = await mongoose.connect(dbURI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});

		console.log('Mongo DB connected!');
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

module.exports = connectDB;
