const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const operatorSchema = new Schema({
	//campos  manuais para jรก (para testar no postman)
	OperatorId: {
		type: Number,
		unique: true
		//required: [true, "Please, include your number"]
	},
	operatorName: {
		type: String,
		//required: [true, "Please, include your name 1111"]
	},
	operatorParentId: {
		type: Number,
	},
	operatorContactId: {
		type: Number,
	},
	operatorNIF: {
		type: Number,
	},
	operatorLocation: {
		//type: { type: String },
        coordinates: []
	}
});

const Operator = mongoose.model('Operator', operatorSchema); 
module.exports = Operator;
