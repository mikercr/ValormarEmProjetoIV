const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventFieldSchema = new Schema({
	eventFieldId: {
		type: Number,
		unique: true,
		required: true
	},
	eventFieldName: {
		type: String,
		required: true
	},
	eventFieldDataType: {
		type: String,
		enum: ['Number', 'String'],
	  	default: 'String'
	}
});

const EventField = mongoose.model('EventField', eventFieldSchema);
module.exports = EventField;