const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventInfoSchema = new Schema({
	eventInfoId: {
		type: Number,
		unique: true,
		required: true
	},
	eventId: {
		type: Number,
		required: true
	},
	eventInfoFieldId: {
		type: Number,
		require: true
	},
	eventInfoFieldValue: {
		type: String,
		required: true
	},
	eventInfoTimestamp: {
		type: String,
		required: true
	}
});

const EventInfo = mongoose.model('EventInfo', eventInfoSchema); 
module.exports = EventInfo;
