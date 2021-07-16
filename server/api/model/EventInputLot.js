const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventInputLotSchema = new Schema({
	eventInputLotId: {
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

const EventInputLot = mongoose.model('EventInputLot', eventInputLotSchema);
module.exports = EventInputLot;