const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const operatorSchema = new Schema({
	OperatorId: {
		type: Number,
		unique: true,
		required: true
	},
	operatorName: {
		type: String,
		required: true
	},
	operatorParentId: {
		type: Number,
		required: false
	},
	operatorContactId: {
		type: Number,
		required: true
	},
	operatorNIF: {
		type: Number,
		required: true
	},
	operatorLocation: {
        coordinates: []
	}
});

const Operator = mongoose.model('Operator', operatorSchema); 
module.exports = Operator;
