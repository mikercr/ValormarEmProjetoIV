/*
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Operator = require('../model/Operator')

const eventSchema = new Schema({
	
	eventId: {
		type: Number,
		unique: true,
		required: true
	},
	userId: {
		type: Number,
		required: true
	},
	operatorOriginId: {
		type: Number,
		required: true
	},
	operatorDestinyId: {
		//type: Number,
		type: mongoose.Schema.Types.ObjectId,
		ref:"Operator",
		required: true
	},
	eventTypeId: {
		type: Number,
		required: true
	},
	startTimeStamp: {
		type: String,
		required: false
	},
	endTimeStamp: {
		type: String,
		required: false
	}
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Operator = require('../model/Operator')

const eventSchema = new Schema({
	
	eventId: {
		type: Number,
		unique: true,
		required: true
	},
	userId: {
		type: Number,
		required: true
	},
	operatorOriginId: {
		type: Number,
		required: true
	},
	operatorDestinyId: {
		type: Number,
		required: true
	},
	eventTypeId: {
		type: Number,
		required: true
	},
	startTimeStamp: {
		type: String,
		required: false
	},
	endTimeStamp: {
		type: String,
		required: false
	},
	eventLocation: {
        coordinates: []
	}
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;