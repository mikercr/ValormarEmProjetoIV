const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const operatorInfoSchema = mongoose.Schema({
	operatorInfoId: {
		type: Number,
		unique: true,
		required: true
	},
	operatorInfoKey: {
		type: String,
		required: true
	},
	operatorInfoValue: {
		type: String,
		required: true
	},
	operatorId: {
		type: Number,
		required: true
	}
});

const OperatorInfo = mongoose.model('OperatorInfo', operatorInfoSchema);
module.exports = OperatorInfo;