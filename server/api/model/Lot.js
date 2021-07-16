const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lotSchema = new Schema({
	lotId: {
		type: Number,
		unique: true,
		required: true
	},
	productId: {
		type: Number,
		required: true
	},
	eventHistory: {
		type: String,
		required: false
	}
});

const Lot = mongoose.model('Lot', lotSchema);
module.exports = Lot;
