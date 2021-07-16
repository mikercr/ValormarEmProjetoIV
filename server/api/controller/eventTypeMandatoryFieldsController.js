const EventTypeMandatoryFields = require('../model/EventTypeMandatoryFields');

//FUNCIONA
exports.newEventTypeMandatoryField = async (req, res) => {
	try {
		const tamEventTypeMandatoryFields = await EventTypeMandatoryFields.find().count();
		console.log(tamEventTypeMandatoryFields);
		if (tamEventTypeMandatoryFields != 0) {
			const eventTypeMandFields = await EventTypeMandatoryFields.find().sort('-eventTypeMandatoryFieldId').limit(1);
			console.log(eventTypeMandFields);
			const maxEventTypeMandatoryFields = eventTypeMandFields[0].eventTypeMandatoryFieldId;
			console.log(maxEventTypeMandatoryFields);

			const eventTypeMandatoryField = new EventTypeMandatoryFields({
				//depois alterar isto conforme o modelo
				eventTypeMandatoryFieldId: maxEventTypeMandatoryFields +1,
				eventTypeMandatoryFieldName: req.body.eventTypeMandatoryFieldName,
			});
			let OP = await eventTypeMandatoryField.save();
			res.status(201).json({ OP });
		} else {
			const nuloEventTypeMandatoryFields = 1;

			const eventTypeMandatoryField = new EventTypeMandatoryFields({
				eventTypeMandatoryFieldId: nuloEventTypeMandatoryFields,
				eventTypeMandatoryFieldName: req.body.eventTypeMandatoryFieldName,
			});
			let OP = await eventTypeMandatoryField.save();
			res.status(201).json({ OP });
		}
	} catch (err) {
		res.status(400).json({
			err: err + ' (Erro ao registar novo campo obrigatório de tipo de E.)',
		});
	}
};

//FUNCIONA
exports.getEventTypeMandatoryFields = async (req, res) => {
	try {
		let eventTypeMandFields = await EventTypeMandatoryFields.find();
		res.send(eventTypeMandFields);
	} catch (error) {
		res.status(400).json({ error: error });
	}
};

//FUNCIONA
exports.deleteEventTypeMandatoryField = async (req, res) => {
	try {
		const eventTypeMandatoryFieldId = req.body.eventTypeMandatoryFieldId;
		const eventTypeMandatoryFieldRemove = await EventTypeMandatoryFields.findOneAndDelete({
			eventTypeMandatoryFieldId: eventTypeMandatoryFieldId,
		});
		res.send('Mandatory Event Field: ' + eventTypeMandatoryFieldRemove.eventTypeMandatoryFieldName + '\nRemovido com sucesso');
	} catch (err) {
		res.status(400).json({ err: err + ' (Erro ao remover o eventTypeMandatoryField)' });
	}
};

//FUNCIONA
exports.updateEventTypeMandatoryField = async (req, res) => {
	try {
		console.log(req.body.eventTypeMandatoryFieldId);
		const updateEvTypeMandF = req.body;
		const eventTypeMandatoryFieldUpdate = await EventTypeMandatoryFields.findOneAndUpdate(
			{ eventTypeMandatoryFieldId: updateEvTypeMandF.eventTypeMandatoryFieldId },
			updateEvTypeMandF
		);
		console.log(eventTypeMandatoryFieldUpdate);
		const eventTypeMandatoryFieldUpdated = await EventTypeMandatoryFields.findOne({
			eventTypeMandatoryFieldId: updateEvTypeMandF.eventTypeMandatoryFieldId,
		});
		res.send('Campo do evento:\n' + eventTypeMandatoryFieldUpdated.eventTypeMandatoryFieldName + '\nAtualizado com sucesso!');
	} catch (err) {
		res.status(400).json({ err: err + '(Erro na atualização do campo de evento)' });
	}
};

//FUNCIONA
exports.getEventTypeMandatoryFieldById = async (req, res) => {
	console.log('Pesquisa do campo obrigatório do tipo de evento');
	try {
		console.log('Pesquisa do campo obrigatório do tipo de evento');
		const eventTypeFieldMandatoryById = req.body.eventTypeMandatoryFieldId;
		const eventTypeManFieldGetId = await EventTypeMandatoryFields.findOne({
			eventTypeMandatoryFieldId: eventTypeFieldMandatoryById,
		});
		if (!eventTypeManFieldGetId)
			return res.send('Não existe esse Campo obrigatório do tipo de evento');
		res.send(eventTypeManFieldGetId);
	} catch (err) {
		res.status(400).json({ err: err + '(Erro nno get by id do campo de evento)' });
	}
};