const Lot = require('../model/Lot');
const Event = require('../model/Event');
const Operator = require('../model/Operator');
const EventType = require('../model/EventType');

exports.newLot = async (req, res) => {
	try {
		const tamLot = await Lot.find().count();
		console.log(tamLot);
		if (tamLot != 0) {
			const lots = await Lot.find().sort('-lotId').limit(1);
			const maxLot = lots[0].lotId;
			const lot = new Lot({
				lotId: maxLot + 1,
				productId: req.body.productId,
				eventHistory: req.body.eventHistory
			});
			let OP = await lot.save();
			res.status(201).json({ OP });
		} else {
			const nuloLot = 1;
			const lot = new Lot({
				lotId: nuloLot,
				productId: req.body.productId,
				eventHistory: req.body.eventHistory
			});
			let OP = await lot.save();
			res.status(201).json({ OP });
		}
	} catch (err) {
		res.status(400).json({ err: err + ' (Erro ao registar novo lote)' });
	}
};

exports.getLot = async (req, res) => {
	try {
		let lots = await Lot.find();
		//Lot.collection.drop();
		res.send(lots);
	} catch (err) {
		res.status(400).json({ err: err + ' (Erro ao pesquisar todos os lotes)' });
	}
};

exports.deleteLot = async (req, res) => {
	try {
		const lotId = req.body.lotId;
		const lotRemove = await Lot.findOneAndDelete({ lotId: lotId});
		res.send('Lote: ' + lotRemove.lotId + '\nRemovido com sucesso');
	} catch (err) {
		res.status(400).json({ err: err + ' (Erro ao apagar o lote)' });
	}
};

exports.updateLot = async (req, res) => {
	try {
		const updatelote = req.body;
		const lotUpdate = await Lot.findOneAndUpdate({ lotId: updatelote.lotId }, updatelote);
		const lotUpdated = await Lot.findOne({lotId: updatelote.lotId});
		res.send('Lote:\n' + lotUpdated.lotName + '\nAtualizado com sucesso!');
	} catch (err) {
		res.status(400).json({ err: err + ' (Erro ao atualizar o lote)' });
	}
};

exports.getLotById = async (req, res) => {
	try {
		const lotGetId = await Lot.findOne({ lotId: req.params.lotId });
		if (!lotGetId) return res.send('Não existe esse lote');
		res.send(lotGetId);
	} catch (err) {
		res.status(400).json({ err: err + ' (Erro ao pesquisar lote pelo id)' });
	}
};

exports.trackLots = async (req, res) => {
	try {
		let lots = await Lot.find({ 'lotId': req.params.lotId }).sort("lotId");
		let events = lots[0].eventHistory;
		let array = [];
		events = events.split('-');
		let tam = (events.length);
		for(i=0;i<tam;i++) {
			array[i] = events[i];
		}
		array = [...new Set(array)];
		let coords = [];
		for(i=0;i<(array.length);i++) {
			let eventsid = await Event.find({ 'eventId': array[i] }).sort("eventId");
			console.log(eventsid[0].eventLocation.coordinates[0]);
			let latlon = eventsid[0].eventLocation.coordinates[0].split(', ');
			let eventTypeName = await EventType.find({ 'eventTypeId': eventsid[0].eventTypeId }).sort("eventTypeId");
			coords[i] = {lat: latlon[0], //eventsid[0].eventLocation.coordinates[0],
						 lon: latlon[1],
						 title: eventTypeName[0].eventTypeName,
						 idEvent: eventsid[0].eventId
						}
		}
		res.send(coords);
		
	}catch(err) {res.send(err);}
};