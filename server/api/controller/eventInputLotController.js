const EventInputLot = require('../model/EventInputLot');

exports.newEventInputLot = async (req, res) => {
	try {
		const tamEventInputLot = await EventInputLot.find().count();
		if (tamEventInputLot != 0) {
			const eventInputLots = await EventInputLot.find().sort('-eventInputLotId').limit(1);
			const maxEventInputLot = eventInputLots[0].eventInputLotId;
			const eventInputLot = new EventInputLot({
				eventInputLotId: tamEventInputLot + 1,
				eventId: req.body.eventId,
				lotId: req.body.lotId
			});
			let OP = await eventInputLot.save();
			res.status(201).json({ OP });
		} else {
			const nuloEventInputLot = 1;
			const eventInputLot = new EventInputLot({
				eventInputLotId: nuloEventInputLot,
				eventId: req.body.eventId,
				lotId: req.body.lotId
			});
			let OP = await eventInputLot.save();
			res.status(201).json({ OP });
		}
	} catch (err) {
		res.status(400).json({ err: err + ' (Erro ao registar novo input)' });
	}
};

exports.getEventInputLot = async (req, res) => {
	try {
		let eventInputLots = await EventInputLot.find();
		res.send(eventInputLots);
	} catch (err) {
		res.status(400).json({ err: err + ' (Erro ao pesquisar todos os inputs)' });
	}
};

exports.deleteEventInputLot = async (req, res) => {
	try {
		const eventInputLotId = req.body.eventInputLotId;
		const eventInputLotRemove = await EventInputLot.findOneAndDelete({ eventInputLotId: eventInputLotId });
		res.send('EventInputLot removido com sucesso');
	} catch (err) {
		res.status(400).json({ err: err + ' (Erro ao remover o input)' });
	}
};

exports.updateEventInputLot = async (req, res) => {
	try {
		const updateInLot = req.body;
		const InLotUpdate = await EventInputLot.findOneAndUpdate(
			{ eventInputLotId: updateInLot.eventInputLotId },
			updateInLot
		);
		const InLotUpdated = await EventInputLot.findOne({ eventInputLotId: updateInLot.eventInputLotId });
		res.send('Lote:\n' + InLotUpdated.eventInputLotId + '\nAtualizado com Sucesso!');
	} catch (err) {
		res.status(400).json({ err: err + ' (Erro ao Atualizar Lote)' });
	}
};

exports.getEventInputLotById = async (req, res) => {
	try {
		const getEventInputLotById = req.body.eventInputLotId;
		const eventInputLots = await EventInputLot.findOne({ eventInputLotId: getEventInputLotById });
		if (!eventInputLots)
			return res.send('Este Lote Não Existe');
		res.send(eventInputLots);
	} catch (err) {
		res.status(400).json({ err: 'Erro ao Encontrar o Id do Lote' + err });
	}
};