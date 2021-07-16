/*
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const autoIncSchema = mongoose.Schema({
	id: {
		type: String,
		unique: true,
	},
	seq: {
		type: Number,
		default: 0,
	},
});

var counter = mongoose.model('counter', autoIncSchema);

eventSchema.pre('save', function (next) {
	const doc = this;
	counter.findByIdAndUpdate({ _id: 'eventId' }, { $inc: { seq: 1 } }, function (error, counter) {
		if (error) return next(error);
		doc.eventId = counter.seq;
		next();
	});
});


const AutoIncrementId = mongoose.model('AutoIncrementId', autoIncSchema);
module.exports = AutoIncrementId;
*/