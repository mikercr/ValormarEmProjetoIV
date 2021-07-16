const EventOutputLot = require('../model/EventOutputLot');

exports.newEventOutputLot = async (req, res) => {
	try {
		const tamEventOutputLot = await EventOutputLot.find().count();
		if (tamEventOutputLot != 0) {
			const eventOutputLots = await EventOutputLot.find().sort('-eventOutputLotId').limit(1);
			const maxEventOutputLot = eventOutputLots[0].eventOutputLotId;
			const eventOutputLot = new EventOutputLot({
				eventOutputLotId: tamEventOutputLot + 1,
				eventId: req.body.eventId,
				lotId: req.body.lotId
			});
			let OP = await eventOutputLot.save();
			res.status(201).json({ OP });
		} else {
			const nuloEventOutputLot = 1;
			const eventOutputLot = new EventOutputLot({
				eventOutputLotId: nuloEventOutputLot,
				eventId: req.body.eventId,
				lotId: req.body.lotId
			});
			let OP = await eventOutputLot.save();
			res.status(201).json({ OP });
		}
	} catch (err) {
		res.status(400).json({ err: err + ' (Erro ao registar novo output)' });
	}
};

exports.getEventOutputLot = async (req, res) => {
	try {
		let eventOutputLots = await EventOutputLot.find();
		res.send(eventOutputLots);
	} catch (err) {
		res.status(400).json({ err: err + ' (Erro ao pesquisar todos os outputs)' });
	}
};

exports.deleteEventOutputLot = async (req, res) => {
	try {
		const eventOutputLotId = req.body.eventOutputLotId;
		const eventOutputLotRemove = await EventOutputLot.findOneAndDelete({ eventOutputLotId: eventOutputLotId });
		res.send('Lote Removido com Sucesso');
	} catch (err) {
		res.status(400).json({ err: err + ' (Erro ao Remover o Lote)' });
	}
};

exports.updateEventOutputLot = async (req, res) => {
	try {
		const updateOutLot = req.body;
		const OutLotUpdate = await EventOutputLot.findOneAndUpdate(
			{ eventOutputLotId: updateOutLot.eventOutputLotId },
			updateOutLot
		);
		const OutLotUpdated = await EventOutputLot.findOne({ eventOutputLotId: updateOutLot.eventOutputLotId });
		res.send('Lote:\n' + OutLotUpdated.eventOutputLotId + '\nAtualizado com Sucesso!');
	} catch (err) {
		res.status(400).json({ err: err + ' (Erro ao Atualizar Lote)' });
	}
};

exports.getEventOutputLotById = async (req, res) => {
	try {
		const getEventOutputLotById = req.body.eventOutputLotId;
		const eventOutputLots = await EventOutputLot.findOne({ eventOutputLotId: getEventOutputLotById });
		if (!eventOutputLots)
			return res.send('Este Lote Não Existe');
		res.send(eventOutputLots);
	} catch (err) {
		res.status(400).json({ err: 'Erro ao Encontrar o Id do Lote' + err });
	}
};