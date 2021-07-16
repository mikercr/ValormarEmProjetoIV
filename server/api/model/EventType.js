const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventTypeSchema = new Schema({
	eventTypeId: {
		type: Number,
		unique: true,
		required: true
	},
	eventTypeName: {
		type: String,
		required: true
	},
	eventTypeDescription: {
		type: String,
		required: true
	},
});

const EventType = mongoose.model('EventType', eventTypeSchema);
module.exports = EventType;