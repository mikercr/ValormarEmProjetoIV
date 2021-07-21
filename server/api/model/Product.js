const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
	productId: {
		type: Number,
		unique: true,
		required: true
	},
	productFishName: {
		type: String,
		required: true
	},
	productDescription: {
		type: String,
		required: false
	},
	productGTIN: {
		type: Number,
		unique: true,
		required: true
	}
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;