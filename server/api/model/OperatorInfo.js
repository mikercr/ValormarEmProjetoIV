const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const operatorInfoSchema = mongoose.Schema({
	operatorInfoId: {
		type: Number,
		unique: true
		//required: [true, "Please, include the number"]
	},
	operatorInfoKey: {
		type: String,
		//required: [true, "Please, include the Name"]
	},
	operatorInfoValue: {
		type: String,
		//required: [true, "Please, include your number"]
	},
	operatorId: {	//este campo identifica o id do operador ao qual pertence esta inforamacao extra
		type: Number,
		//required: [true, "Please, include your number"]
	}
});

const OperatorInfo = mongoose.model('OperatorInfo', operatorInfoSchema);
module.exports = OperatorInfo;