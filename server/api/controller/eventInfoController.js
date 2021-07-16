const EventInfo = require('../model/EventInfo');

exports.newEventInfo = async (req, res) => {
	try {
		const tamEventInfo = await EventInfo.find().count();
		if (tamEventInfo != 0) {
			const eventInfos = await EventInfo.find().sort('-eventInfoId').limit(1);
			const maxEventInfo = eventInfos[0].eventInfoId;

			const eventInfo = new EventInfo({
				eventInfoId: tamEventInfo + 1,
				eventId: req.body.eventId,
				eventInfoFieldId: req.body.eventInfoFieldId,
				eventInfoFieldValue: req.body.eventInfoFieldValue,
				eventInfoTimestamp: req.body.eventInfoTimestamp
			});
			let OP = await eventInfo.save();
			res.status(201).json({ OP });
		} else {
			const nuloEventInfo = 1;
			const eventInfo = new EventInfo({
				eventInfoId: nuloEventInfo,
				eventId: req.body.eventId,
				eventInfoFieldId: req.body.eventInfoFieldId,
				eventInfoFieldValue: req.body.eventInfoFieldValue,
				eventInfoTimestamp: req.body.eventInfoTimestamp
			});
			let OP = await eventInfo.save();
			res.status(201).json({ OP });
		}
	} catch (err) {
		res.status(400).json({ err: err + ' (Erro ao registar nova informação do evento)' });
	}
};

exports.getEventInfo = async (req, res) => {
	try {
		let eventInfos = await EventInfo.find();
		res.send(eventInfos);
	} catch (err) {
		res.status(400).json({ err: err + ' (Erro ao pesquisar informações do evento)' });
	}
};

exports.deleteEventInfo = async (req, res) => {
	try {
		const eventInfoId = req.body.eventInfoId;
		const eventInfoRemove = await EventInfo.findOneAndDelete({ eventInfoId: eventInfoId });
		res.send('Event Info: ' + eventInfoRemove.eventInfoFieldValue + '\nRemovido com sucesso');
	} catch (err) {
		res.status(400).json({ err: err + ' (Erro ao remover as informações do evento)' });
	}
};