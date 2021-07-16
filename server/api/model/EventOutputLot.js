const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventOutputLotSchema = new Schema({
	eventOutputLotId: {
		type: Number,
		unique: true,
		required: true
	},
	eventId: {
		type: Number,
		required: true
	},
	lotId: {
		type: Number,
		required: true
	}
});

const EventOutputLot = mongoose.model('EventOutputLot', eventOutputLotSchema);
module.exports = EventOutputLot;