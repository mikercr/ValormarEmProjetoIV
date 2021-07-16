const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventTypeMandatoryFieldsSchema = new Schema({
	eventTypeMandatoryFieldId: {
		type: Number,
		unique: true,
		required: true
	},
	eventTypeId: {
		type: Number,
		required: true
	},
	eventFieldId: {
		type: Number,
		required: true
	}
});

const EventTypeMandatoryFields = mongoose.model('EventTypeMandatoryFields', eventTypeMandatoryFieldsSchema);
module.exports = EventTypeMandatoryFields;