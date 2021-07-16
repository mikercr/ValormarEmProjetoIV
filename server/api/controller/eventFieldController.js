const EventField = require('../model/EventField');

exports.newEventField = async (req, res) => {
	try {
		const tamEventField = await EventField.find().count();
		if (tamEventField != 0) {
			const eventFields = await EventField.find().sort('-eventFieldId').limit(1);
			const maxEventField = eventFields[0].eventFieldId;

			const eventField = new EventField({
				eventFieldId: maxEventField + 1,
				eventFieldName: req.body.eventFieldName,
				eventFieldDataType: req.body.eventFieldDataType
			});
			const OP = await eventField.save();

			res.status(201).json({ OP });
		} else {
			const nuloEvent = 1;

			const eventField = new EventField({
				eventFieldId: nuloEvent,
				eventFieldName: req.body.eventFieldName,
				eventFieldDataType: req.body.eventFieldDataType
			});
			let OP = await eventField.save();

			res.status(201).json({ OP });
		}
	} catch (err) {
		res.status(400).json({ err: err + '(Erro ao registar novo event field)' });
	}
};

exports.getEventField = async (req, res) => {
	try {
		let eventfields = await EventField.find();
		res.send(eventfields);
	} catch (err) {
		res.status(400).json({ err: err + '(Erro pesquisar todos os eventfields)' });
	}
};

exports.deleteEventField = async (req, res) => {
	try {
		const eventFieldId = req.body.eventFieldId;
		const eventFieldRemove = await EventField.findOneAndDelete({ eventFieldId: eventFieldId });
		res.send('Event Field: ' + eventFieldRemove.eventFieldName + '\nRemovido com sucesso');
	} catch (err) {
		res.status(400).json({ err: err + ' (Erro ao remover o eventField)' });
	}
};

exports.updateEventField = async (req, res) => {
	try {
		console.log(req.body.eventFieldId);
		const updateEventF = req.body;
		const eventFieldUpdate = await EventField.findOneAndUpdate(
			{ eventFieldId: updateEventF.eventFieldId },
			updateEventF
		);
		console.log(eventFieldUpdate);
		const eventFieldUpdated = await EventField.findOne({
			eventFieldId: updateEventF.eventFieldId,
		});
		res.send('Campo do evento:\n' + eventFieldUpdated.eventFieldName + '\nAtualizado com sucesso!');
	} catch (err) {
		res.status(400).json({ err: err + ' (Erro ao atualizar o campo do evento)' });
	}
};

exports.getEventFieldById = async (req, res) => {
	try {
		console.log('Pesquisa de campo do evento por id');
		const eventFieldGetById = req.body.eventFieldId;
		const eventFGetId = await EventField.findOne({ eventFieldId: eventFieldGetById });
		if (!eventFGetId) return res.send('Não existe esse campo evento');
		res.send(eventFGetId);
	} catch (err) {
		res.status(400).json({ err: err + 'Erro ao pesquisar o campo do evento pelo ID' });
	}
};

exports.associateEventFieldWithType = async (req, res) => {
	try {
		const tamEventField = await EventField.find().count();
		if (tamEventField != 0) {
			const eventFields = await EventField.find().sort('-eventFieldId').limit(1);
			const maxEventField = eventFields[0].eventFieldId;

			const eventField = new EventField({
				eventFieldId: maxEventField + 1,
				eventFieldName: req.body.eventFieldName,
				eventFieldDataType: req.body.eventFieldDataType
			});
			const OP = await eventField.save();
			criarAssociacao(req, res, maxEventField);
			
		} else {
			const nuloEvent = 1;

			const eventField = new EventField({
				eventFieldId: nuloEvent,
				eventFieldName: req.body.eventFieldName,
				eventFieldDataType: req.body.eventFieldDataType
			});
			const OP = await eventField.save();
			criarAssociacao(req, res, maxEventField);
		}
	} catch (err) {
		res.status(400).json({ err: err + '(Erro ao registar novo event field)' });
	}
};

async function criarAssociacao(req, res, maxEventField) {
	
	const EventField = require('../model/EventField');
	const EventTypeMandatoryFields = require('../model/EventTypeMandatoryFields');
	
	const tamEventTypeMandatoryFields = await EventTypeMandatoryFields.find().count();
	
	if (tamEventTypeMandatoryFields != 0) {
			const eventTypeMandFields = 
				  await EventTypeMandatoryFields.find().sort('-eventTypeMandatoryFieldId').limit(1);
			const maxEventTypeMandatoryFields = eventTypeMandFields[0].eventTypeMandatoryFieldId;

			const eventTypeMandatoryField = new EventTypeMandatoryFields({
				eventTypeMandatoryFieldId: maxEventTypeMandatoryFields +1,
				eventTypeId: req.body.eventTypeId,
				eventFieldId: maxEventField + 1
			});
			let OP = await eventTypeMandatoryField.save();
			res.status(201).json({ OP });
		
		} else {
			const nuloEventTypeMandatoryFields = 1;

			const eventTypeMandatoryField = new EventTypeMandatoryFields({
				eventTypeMandatoryFieldId: nuloEventTypeMandatoryFields,
				eventTypeId: req.body.eventTypeId,
				eventFieldId: maxEventField + 1
			});
			let OP = await eventTypeMandatoryField.save();
			res.status(201).json({ OP });
		}
}