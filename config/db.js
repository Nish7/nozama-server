const mongoose = require('mongoose');
require('dotenv').config()
const dbURI = process.env.mongoURI;

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
