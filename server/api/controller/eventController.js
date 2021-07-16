const Event = require('../model/Event');
const EventInputLot = require('../model/EventInputLot');
const EventOutLot = require('../model/EventOutputLot');
const Lot = require('../model/Lot');
const Operator = require('../model/Operator');
const EventInfo = require('../model/EventInfo');
const EventField = require('../model/EventField');
const Product = require('../model/Product');
var ObjectId = require('mongodb').ObjectId;

exports.newEvent = async (req, res) => {
	console.log(req.body);
	try {
		const tamEvent = await Event.find().count();
		console.log(tamEvent);
		if (tamEvent != 0) {
			const events = await Event.find().sort('-eventId').limit(1);
			console.log('Parou aqui 002' + events);
			const maxEvent = events[0].eventId;
			console.log(maxEvent);

			const event = new Event({
				eventId: maxEvent + 1,
				eventName: req.body.eventName, //alterar estes campos...
				//eventUserCE: req.body.eventUserCE,
				//eventOperatorCE: req.body.eventOperatorCE,
				//eventOperatorDestinationCE: req.body.eventOperatorDestinationCE,
				//eventTypeIdCE: req.bodyd.eventTypeIdCE
			});
			const OP = await event.save();

			res.status(201).json({ OP });
		} else {
			const nuloEvent = 1;

			const event = new Event({
				eventId: nuloEvent,
				eventName: req.body.eventName,
				//acrescentar os outros campos...
			});
			let OP = await event.save();

			res.status(201).json({ OP });
		}
	} catch (err) {
		//res.status(400).json({ err: err });
		res.send(err);
	}
};

exports.getEvent = async (req, res) => {
	console.log('O event chegou aqui...2');
	try {
		let events = await Event.find();
		res.send(events);
	} catch (err) {
		res.status(400).json({ err: err });
	}
};

exports.deleteEvent = async (req, res) => {
	console.log('O event chegou aqui...3');
	try {
		const eventId = req.body.eventId;
		const eventRemove = await Event.findOneAndDelete({ eventId: eventId });
		res.send('Evento:\n' + eventRemove.eventName + '\nRemovido com sucesso');
	} catch (err) {
		res.status(400).json({ err: err + '(Erro no delete do evento)' });
	}
};

exports.updateEvent = async (req, res) => {
	try {
		console.log(req.body.eventId);
		const updateEvt = req.body;
		const eventUpdate = await Event.findOneAndUpdate(
			{ eventId: updateEvt.eventId },
			updateEvt
		);
		console.log(eventUpdate);
		const eventUpdated = await Event.findOne({ eventId: updateEvt.eventId });
		res.send('Evento atualizado com sucesso!');
	} catch (err) {
		res.status(400).json({ err: err + '(Erro ao atualizar o evento)' });
	}
};

exports.getEventById = async (req, res) => {
	try {
		console.log('Pesquisa de evento por id');
		const eventGetById = req.body.eventId;
		const eventGetId = await Event.findOne({ eventId: eventGetById });
		if (!eventGetId) return res.send('O evento não existe');
		res.send(eventGetId);
	} catch (err) {
		res.status(400).json({ err: err + ' (Erro na pesquisa por evento, pelo id)' });
	}
};

exports.newEventTeste = async (req, res) => {
	try {
		const tamEvent = await Event.find().count();
		if (tamEvent != 0) {
			const events = await Event.find().sort('-eventId').limit(1);
			const maxEvent = events[0].eventId;
			const event = new Event({
				eventId: maxEvent + 1,
				userId: req.body.userId,
				operatorOriginId: req.body.operatorOriginId,
				//operatorDestinyId: req.body.operatorDestinyId,
				operatorDestinyId: new ObjectId(req.body.operatorDestinyId),
				eventTypeId: req.body.eventTypeId,
				startTimeStamp: req.body.startTimeStamp,
				endTimeStamp: req.body.endTimeStamp
			});
			const OP = await event.save();
			criarOutputLot(maxEvent, res);
			criarOutputLot(maxEvent, res);
			
		}
		else{
			const nuloEvent = 1;
			const event = new Event({
				eventId: nuloEvent,
				userId: req.body.userId,
				operatorOriginId: req.body.operatorOriginId,
				//operatorDestinyId: req.body.operatorDestinyId,
				operatorDestinyId: new ObjectId(req.body.operatorDestinyId),
				eventTypeId: req.body.eventTypeId,
				startTimeStamp: req.body.startTimeStamp,
				endTimeStamp: req.body.endTimeStamp
			});
			const OP = await event.save();
			criarOutputLot(maxEvent, res);
			criarOutputLot(maxEvent, res);
		}
		
	}
	catch(err) {res.send(err);}
};

//Funções--------------------------------------------------------------------------
async function criarInputLot(maxEvent, res) {
	
	const Event = require('../model/Event');
	const EventInputLot = require('../model/EventInputLot');
	
	const infoArrayIn = req.body.inputLots;
	const tamInLot = await EventInputLot.find().count();
	
	if (tamInLot != 0) {
		const inputs = await EventInputLot.find().sort("-eventInputLotId").limit(1);
		const maxInputs = inputs[0].eventInputLotId;
		let incremento = 1;
		for (i = 0; i < infoArrayIn.length; i++) {
			const eventInputLot = new EventInputLot({
				eventInputLotId: (maxInputs + incremento),
				eventId: maxEvent + 1,
				lotId: infoArrayIn[i].lotId
			});
			let OPI = await eventInputLot.save();
			incremento++;
		}
		res.status(201).json();
	} 
}

//---------------------------------------------
exports.populateEvent = async (req, res) => {
	
	Event.findOne({eventId: 23}).populate("operators").then(user => {
      res.json(user); 
   	});
	/*
	try {
		console.log('populacao de eventos');
		const popEv = await Event.findOne({ eventId: 22 })
	.populate("Operators")
	.then((popEv) => {
		res.json(popEv);
	});
	
	} catch(err) {
		res.status(400).json({ err: err + ' (Erro de POPULACAO)'})
	}
	*/
};

//-----------------------------------------------------------------

exports.exportEventFinalEmTeste = async (req, res) => {
	try {
		const eventInfo = await Event.find({ 'eventId': req.params.eventId }).sort("-eventId");
		const operatorOriginName = 
			  await Operator.find({ 'OperatorId': eventInfo[0].operatorOriginId }).sort("-OperatorId");
		const operatorDestinationName = 
			  await Operator.find({ 'OperatorId': eventInfo[0].operatorDestinyId }).sort("-OperatorId");
		const inputs = await EventInputLot.find({ 'eventId': req.params.eventId }).sort("eventInputLotId");
		let inputsMap = inputs.map(a => a.eventInputLotId);
		let inputsMap1 = inputs.map(f => f.lotId);
		let lots = await Lot.find({ 'lotId': inputsMap1[0] }).sort("lotId");
		let gtin = await Product.find({ 'productId': lots[0].productId }).sort("productId");
		let inputsArray = [];
		for(i=0;i<inputsMap.length;i++){
			let camposInputs = {product_GTIN: gtin[0].productGTIN, eventInputLotId: inputsMap[i]};
			inputsArray[i] = camposInputs;
		}
		const outputs = await EventOutLot.find({ 'eventId': req.params.eventId }).sort("eventOutputLotId");
		let outputsMap = outputs.map(b => b.eventOutputLotId);
		let outputsArray = [];
		for(i=0;i<outputsMap.length;i++){
			let camposOutputs = {eventOutputLotId: outputsMap[i]};
			outputsArray[i] = camposOutputs;
		}
		const infos = await EventInfo.find({ 'eventId': req.params.eventId }).sort("eventInfoId");
		let infosMap1 = infos.map(c => c.eventInfoFieldValue);
		let infosMap2 = infos.map(d => d.eventInfoTimestamp);
		let infosMap3 = infos.map(e => e.eventInfoFieldId);
		let infosArray = [];
		for(i=0;i<infosMap1.length;i++){
			let fields = await EventField.find({ 'eventFieldId': infosMap3[i] }).sort("eventFieldId");
			let fieldName = fields[0].eventFieldName;
			let camposInfos = {eventFieldName: fieldName, eventInfoFieldValue: infosMap1[i], 
							   eventInfoTimestamp: infosMap2[i]};
			infosArray[i] = camposInfos;
		}
		
		let json = {
			payload: [
				{
					event_operator_origin: operatorOriginName[0].operatorName,
					event_operator_destination: operatorDestinationName[0].operatorName,
					coordinates: {
						lat: eventInfo[0].eventLocation.coordinates[0],
						lon: eventInfo[0].eventLocation.coordinates[1]
					},
					event_type: eventInfo[0].eventTypeId,
					event_start_timestamp: eventInfo[0].startTimeStamp,
					event_end_timestamp: eventInfo[0].endTimeStamp,
					input_lots: inputsArray,
					output_lots: outputsArray,
					info: infosArray
				}
			]
		}
		res.send(json);
		
	}catch(err) {res.send(err);}
};

exports.newEventFinalEmTeste = async (req, res) => {
	try {
		console.log(req.body.eventLocation.coordinates);
		const verTam = req.body.eventLocation.coordinates.length;
		const oprCoord = await Operator.find({'OperatorId': req.body.operatorOriginId}).sort('OperatorId');
		const coor = oprCoord[0].operatorLocation.coordinates[0];
		const tamEvent = await Event.find().count();
		var verificacao = verTam != 0 ? req.body.eventLocation.coordinates : coor;
		if (tamEvent != 0) {
			const events = await Event.find().sort('-eventId').limit(1);
			const maxEvent = events[0].eventId;
			const event = new Event({
				eventId: maxEvent + 1,
				userId: req.body.userId,
				operatorOriginId: req.body.operatorOriginId,
				operatorDestinyId: req.body.operatorDestinyId,
				eventTypeId: req.body.eventTypeId,
				startTimeStamp: req.body.startTimeStamp,
				endTimeStamp: req.body.endTimeStamp,
				eventLocation: {
					coordinates: verificacao
				}
			});
			const OP = await event.save();
			criarInputLotFinalEmTeste(maxEvent, req, res);
			
		}
		else{
			const nuloEvent = 1;
			const event = new Event({
				eventId: nuloEvent,
				userId: req.body.userId,
				operatorOriginId: req.body.operatorOriginId,
				operatorDestinyId: req.body.operatorDestinyId,
				eventTypeId: req.body.eventTypeId,
				startTimeStamp: req.body.startTimeStamp,
				endTimeStamp: req.body.endTimeStamp
			});
			const OP = await event.save();
			criarInputLotFinalEmTeste(maxEvent, req, res);
			
		}
		
	}
	catch(err) {res.send(err);}
};

async function criarInputLotFinalEmTeste(maxEvent, req, res) {
	
	const Event = require('../model/Event');
	const EventInputLot = require('../model/EventInputLot');
	
	const infoArrayIn = req.body.inputLots;
	const tamInLot = await EventInputLot.find().count();
	
	if (tamInLot != 0) {
		const inputs = await EventInputLot.find().sort("-eventInputLotId").limit(1);
		const maxInputs = inputs[0].eventInputLotId;
		
		let incremento = 1;
		
		for (i = 0; i < infoArrayIn.length; i++) {
			const eventInputLot = new EventInputLot({
				eventInputLotId: (maxInputs + incremento),
				eventId: maxEvent + 1,
				lotId: infoArrayIn[i].lotId
			});
			let OPI = await eventInputLot.save();
			incremento++;
		}
		criarNovoLotFinalEmTeste(maxEvent, req, res);
	}
	else {
		
		const nuloInputLot = 1;
		
		for (i = 0; i < infoArrayIn.length; i++) {
			const eventInputLot = new EventInputLot({
				eventInputLotId: nuloInputLot,
				eventId: maxEvent + 1,
				lotId: infoArrayIn[i].lotId
			});
			let OPI = await eventInputLot.save();
			nuloInputLot++;
			
		}
		criarNovoLotFinalEmTeste(maxEvent, req, res);
		
	}
}

async function criarNovoLotFinalEmTeste(maxEvent, req, res) {
	
	const Event = require('../model/Event');
	const Lot = require('../model/Lot');
	
	const nLot = req.body.outputLots;
	const lots = await Lot.find().sort('-lotId').limit(1);
	const maxLot = lots[0].lotId;
	const infoArrayIn = req.body.inputLots;
	const getInputLotId = infoArrayIn[0].lotId;
	const getProductId = await Lot.find({ 'lotId': getInputLotId }).sort('-productId').limit(1);
	const productId = getProductId[0].productId;
	const max = maxEvent + 1;
	let incremento = 1;
	let historico = "" + max;
	for (i = 0; i < infoArrayIn.length; i++) {
		let getHistory = await Lot.find({ 'lotId': infoArrayIn[i].lotId }).sort('eventHistory').limit(1);
		let eventHistoryId = getHistory[0].eventHistory;
		console.log(eventHistoryId);
		historico = historico + "-" + eventHistoryId + "-" + max;
	}
	
	for (i = 0; i < nLot; i++) {
		const lot = new Lot({
			lotId: (maxLot + incremento),
			productId: productId,
			eventHistory: historico
		});
		let OPLOT = await lot.save();
		incremento++;
	}
	criarOutputLotFinalEmTeste(maxEvent, req, res);
	
}

async function criarOutputLotFinalEmTeste(maxEvent, req, res) {
	
	const Event = require('../model/Event');
	const EventOutLot = require('../model/EventOutputLot');
	const Lot = require('../model/Lot');
	
	const tamOutLot = await EventOutLot.find().count();
	const nLot = req.body.outputLots;
	const lots = await Lot.find().sort('-lotId').limit(1);
	const maxLot = lots[0].lotId;
	let controloLotId = (maxLot - nLot) + 1;
	
	if (tamOutLot != 0) {
		const outputs = await EventOutLot.find().sort("-eventOutputLotId").limit(1);
		const maxOutputs = outputs[0].eventOutputLotId;
		
		let incremento = 1;
		
		for (i = 0; i < nLot; i++) {
			const eventOutputLot = new EventOutLot({
				eventOutputLotId: (maxOutputs + incremento),
				eventId: maxEvent + 1,
				lotId: controloLotId
			});
			let OPOUTLOT = await eventOutputLot.save();
			incremento++;
			controloLotId++;
		}
		criarInformacoesFinalEmTeste(maxEvent, req, res);

	}
	else {
		const nuloOutputLot = 1;
		let controloLotId = (maxLot - nLot) + 1;
		
		for (i = 0; i < nLot; i++) {
			const eventOutputLot = new EventOutLot({
				eventOutputLotId: nuloOutputLot,
				eventId: maxEvent + 1,
				lotId: controloLotId
			});
			let OPOUTLOT = await eventOutputLot.save();
			controloLotId++;
			nuloOutputLot++;
		}
		criarInformacoesFinalEmTeste(maxEvent, req, res);
		
	}
	
}

async function criarInformacoesFinalEmTeste(maxEvent, req, res) {
	
	const Event = require('../model/Event');
	const EventInfo = require('../model/EventInfo');
	
	const infoArrayInfo = req.body.eventInformation;
	const tamInfoLot = await EventInfo.find().count();
	
	if (tamInfoLot != 0) {
		const informations = await EventInfo.find().sort("-eventInfoId").limit(1);
		const maxInformation = informations[0].eventInfoId;
		
		let incremento = 1;
		
		for (i = 0; i < infoArrayInfo.length; i++) {
			const eventInfo = new EventInfo({
				eventInfoId: (maxInformation + incremento),
				eventId: maxEvent + 1,
				eventInfoFieldId: infoArrayInfo[i].eventInfoFieldId,
				eventInfoFieldValue: infoArrayInfo[i].eventInfoFieldValue,
				eventInfoTimestamp: infoArrayInfo[i].eventInfoTimestamp
			});
			let OPINFO = await eventInfo.save();
			incremento++;
		}
		res.status(201).json("Evento, Input/Output Lots, Novos Lots e Informações Criados com Sucesso");
		
	}
	else {
		
		const nuloInfo = 1;
		
		for (i = 0; i < infoArrayInfo.length; i++) {
			const eventInfo = new EventInfo({
				eventInfoId: nuloInfo,
				eventId: maxEvent + 1,
				eventInfoFieldId: req.body.eventInfoFieldId,
				eventInfoFieldValue: req.body.eventInfoFieldValue,
				eventInfoTimestamp: req.body.eventInfoTimestamp
			});
			let OPINFO = await eventInfo.save();
			nuloInfo++;
			
		}
		res.status(201).json("Evento, Input/Output Lots, Novos Lots e Informações Criados com Sucesso");
		
	}
	
}