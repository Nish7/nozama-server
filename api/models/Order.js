const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
	orderId: {
		type: Number,
		required: true,
		unique: true,
	},

	dishes: [
		{
			dishId: {
				type: mongoose.Schema.Types.ObjectId,
			},
			dishName: {
				type: String,
			},
			price: {
				type: Number,
			},
			quantity: {
				type: Number,
			},
		},
	],
	status: {
		type: String,
		enum: ['Confirmed', 'Proccessing', 'Cancelled', 'Paid'],
		default: 'Proccessing',
	},
	totalPrice: {
		type: Number,
		default: 0,
	},

	date: {
		type: Date,
		default: Date.now,
	},

	tableNum: {
		type: Number,
		required: [true, 'Add a table number for the order'],
	},
});

OrderSchema.statics.setTotalPrice = async function (_id) {
	const tot = await this.aggregate([
		{
			$match: { _id },
		},
		{
			$set: {
				totalPrice: {
					$reduce: {
						input: { $ifNull: ['$dishes', []] },
						initialValue: 0,
						in: {
							$add: [
								'$$value',
								{ $multiply: ['$$this.price', '$$this.quantity'] },
							],
						},
					},
				},
			},
		},
	]);

	try {
		await this.model('Order').findByIdAndUpdate(
			_id,
			{
				totalPrice: tot[0].totalPrice,
			},
			{ new: true },
		);
	} catch (err) {
		console.error(err);
	}
};

OrderSchema.post('save', async function () {
	await this.constructor.setTotalPrice(this._id);
});

module.exports = mongoose.model('Order', OrderSchema);
