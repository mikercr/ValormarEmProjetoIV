const EventType = require('../model/EventType');
/*
const Event = require('../model/Event');
const EventInputLot = require('../model/EventInputLot');
const EventOutLot = require('../model/EventOutputLot');
const EventInfo = require('../model/EventInfo');
const Lot = require('../model/Lot');

Event.collection.drop();
EventInputLot.collection.drop();
EventOutLot.collection.drop();
EventInfo.collection.drop();
Lot.collection.drop();
*/

exports.newEventTypes = async (req, res) => {
	try {
		const tamEventType = await EventType.find().count();
		if (tamEventType != 0) {
			const eventTypes = await EventType.find().sort('-eventTypeId').limit(1);
			const maxEventType = eventTypes[0].eventTypeId;
			const eventType = new EventType({
				eventTypeId: maxEventType + 1,
				eventTypeName: req.body.eventTypeName,
				eventTypeDescription: req.body.eventTypeDescription
			});
			let OP = await eventType.save();
			res.status(201).json({ OP });
		} else {
			const nuloEventType = 1;
			const eventType = new EventType({
				eventTypeId: nuloEventType,
				eventTypeName: req.body.eventTypeName,
				eventTypeDescription: req.body.eventTypeDescription
			});
			let OP = await eventType.save();
			res.status(201).json({ OP });
		}
	} catch (err) {
		res.status(400).json({ err: err + ' (Erro ao Registar Novo Tipo de Evento)' });
	}
};

exports.getEventType = async (req, res) => {
	try {
		let eventTypes = await EventType.find();
		res.send(eventTypes);
	} catch (err) {
		res.status(400).json({ err: err });
	}
};

exports.deleteEventType = async (req, res) => {
	try {
		const eventTypeId = req.body.eventTypeId;
		const eventTypeRemove = await EventType.findOneAndDelete({ eventTypeId: eventTypeId });
		res.send('Tipo de evento:\n' + eventTypeRemove.eventTypeName + '\nRemovido com sucesso');
	} catch (err) {
		res.status(400).json({ err: err + ' (Erro no delete do tipo de evento)' });
	}
};

exports.getEventTypeById = async (req, res) => {
	try {
		console.log(req.params.eventTypeId);
		const eventTGetId = await EventType.findOne({ eventTypeId: req.params.eventTypeId });
		if (!eventTGetId) return res.send('O tipo de evento não existe');
		res.send(eventTGetId);
	} catch (err) {
		res.status(400).json({ err: err + ' (Erro na pesquisa por do tipo de evento por id)' });
	}
};
exports.updateEventType = async (req, res) => {
	try {
		console.log(req.body.eventTypeId);
		const updateEventT = req.body;
		const eventTypeUpdate = await EventType.findOneAndUpdate(
			{ eventTypeId: updateEventT.eventTypeId },
			updateEventT
		);
		console.log(eventTypeUpdate);
		const eventTypeUpdated = await EventType.findOne(
			{ eventTypeId: updateEventT.eventTypeId }
		);
		res.send('Tipo de evento:\n' + eventTypeUpdated.eventTypeName + '\nAtualizado com sucesso!');
	} catch (err) {
		res.status(400).json({ err: err + ' (Erro ao atualizar o tipo de evento)' });
	}
};