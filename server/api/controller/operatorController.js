const Operator = require('../model/Operator');
const OperatorInfo = require("../model/OperatorInfo");

exports.newOperatorWithInfoAndCoor = async (req, res) => {
	try {
		const tamOperador = await Operator.find().count();
		
		if(tamOperador != 0) {
			
			const operadores = await Operator.find().sort("-OperatorId").limit(1);
			const maxOperador = operadores[0].OperatorId;
			
			const operator = new Operator({
				OperatorId: (maxOperador + 1),
				operatorName: req.body.operatorName,
				operatorParentId: req.body.operatorParentId,
				operatorContactId: req.body.operatorContactId,
				operatorNIF: req.body.operatorNIF,
				operatorLocation: {
					coordinates: req.body.operatorLocation.coordinates
				}
			});
			
			let OP = await operator.save();
			
			const infoArray = req.body.operatorInfo;
			const tamOperadorInfo = await OperatorInfo.find().count();
			
			if(tamOperadorInfo != 0) {
				
				const operadorInfos = await OperatorInfo.find().sort("-operatorInfoId").limit(1);
				const maxOperadorInfo = operadorInfos[0].operatorInfoId;
				let incremento = 1;
				
				for (i = 0; i < infoArray.length; i++) {
			
					const operatorInfo = new OperatorInfo({
						operatorInfoId: (maxOperadorInfo + incremento),
						operatorInfoKey: infoArray[i].operatorInfoKey,
						operatorInfoValue: infoArray[i].operatorInfoValue,
						operatorId: (maxOperador + 1)
					});
					let OPI = await operatorInfo.save();
					incremento++;
			
				}
				res.status(201).json({ OP });
				
			}
			else {
				
				const nuloOperadorInfo = 1;
				
				for (i = 0; i < infoArray.length; i++) {
			
					const operatorInfo = new OperatorInfo({
						operatorInfoId: nuloOperadorInfo,
						operatorInfoKey: infoArray[i].operatorInfoKey,
						operatorInfoValue: infoArray[i].operatorInfoValue,
						operatorId: (maxOperador + 1)
					});
					
					let OPI = await operatorInfo.save();
					
					nuloOperadorInfo++;
			
				}
				
				res.status(201).json({ OP });
				
			}
			
		}
		else {
			
			const nuloOperador = 1;
			
			const operator = new Operator({
				OperatorId: nuloOperador,
				operatorName: req.body.operatorName,
				operatorParentId: req.body.operatorParentId,
				operatorContactId: req.body.operatorContactId,
				operatorNIF: req.body.operatorNIF,
				operatorLocation: {
					//type: req.body.operatorLocation.type,
					coordinates: req.body.operatorLocation.coordinates
				}
			});
			
			let OP = await operator.save();
			
			const infoArray = req.body.operatorInfo;
			const tamOperadorInfo = await OperatorInfo.find().count();
			
			if(tamOperadorInfo != 0) {
				
				const operadorInfos = await OperatorInfo.find().sort("-operatorInfoId").limit(1);
				const maxOperadorInfo = operadorInfos[0].operatorInfoId;
				let incremento = 1;
				
				for (i = 0; i < infoArray.length; i++) {
			
					const operatorInfo = new OperatorInfo({
						operatorInfoId: (maxOperadorInfo + incremento),
						operatorInfoKey: infoArray[i].operatorInfoKey,
						operatorInfoValue: infoArray[i].operatorInfoValue,
						operatorId: nuloOperador
					});
					
					let OPI = await operatorInfo.save();
					
					incremento++;
			
				}
				
				res.status(201).json({ OP });
				
			}
			else {
				
				const nuloOperadorInfo = 1;
				
				for (i = 0; i < infoArray.length; i++) {
			
					const operatorInfo = new OperatorInfo({
						operatorInfoId: nuloOperadorInfo,
						operatorInfoKey: infoArray[i].operatorInfoKey,
						operatorInfoValue: infoArray[i].operatorInfoValue,
						operatorId: nuloOperador
					});
					
					let OPI = await operatorInfo.save();
					
					nuloOperadorInfo++;
			
				}
				
				res.status(201).json({ OP });
				
			}
			
		}
		
	} catch (err) {
		res.status(400).json({ err: err });
	}
};

exports.getOperator = async (req, res) => {
	
	const operators = await Operator.find({});
	res.json(operators);
};

exports.getOperatorAPP = async (req, res) => {
	
	const operators = await Operator.find({});
	
	for (var i=0; i<operators.length; i++) {
		var obj = operators[i].operatorLocation.coordinates[0];
		var newObj = obj.split(",");
		operators[i].operatorLocation.coordinates={
			latitude: Number(newObj[0]),
			longitude: Number(newObj[1])
		}		
	}
	res.json(operators);
};

exports.deleteOperator = async (req, res) => {
	try {
		const operatorId = req.body.operatorId;
		const operatorRemove = await Operator.findOneAndDelete({ OperatorId: operatorId });
		res.send('Operador\n' + operatorRemove.operatorName + '\n removido com sucesso!');
	} catch (err) {
		res.status(400).json({ err: 'Erro no delete' + err });
	}
};

exports.deleteOperatorByNif = async (req, res) => {
	try {
		const operatorNif = req.body.operatorNIF;
		const operatorRemove = await Operator.findOneAndDelete({ operatorNIF: operatorNif });
		res.send('Operador\n' + operatorRemove.operatorName + '\n removido com sucesso!');
	} catch (err) {
		res.status(400).json({ err: 'Erro no delete' + err });
	}
};

exports.updateOperator = async (req, res) => {
	try {
		const updateOp = req.body;
		const operatorUpdate = await Operator.findOneAndUpdate(
			{ OperatorId: updateOp.operatorId },
			updateOp
		);
		const operatorUpdated = await Operator.findOne({ OperatorId: updateOp.operatorId });
		res.send('Operador\n' + operatorUpdated.operatorName + '\n atualizado com sucesso!');
	} catch (err) {
		res.status(400).json({ err: 'Erro no update' + err });
	}
};

exports.getOperatorById = async (req, res) => {
	try {
		const operator = await Operator.findOne({ OperatorId: req.params.operatorId });
		if (!operator) return res.send('O operador não existe');
		res.send(operator);
	} catch (err) {
		res.status(400).json({ err: 'Erro ao encontrar o id do operador' + err });
	}
};

exports.getOperatorByNif = async (req, res) => {
	try {
		const operatorGetByNif = req.body.operatorNIF;
		const operator = await Operator.findOne({ operatorNIF: operatorGetByNif });
		if (!operator)
			return res.send('O operador não existe');
		res.send(operator);
	} catch (err) {
		res.status(400).json({ err: 'Erro ao encontrar o id do operador' + err });
	}
};

exports.newOperatorWithInfo = async (req, res) => {
	try {
		const operator = new Operator({
			OperatorId: req.body.operatorId,
			operatorName: req.body.operatorName,
			operatorParentId: req.body.operatorParentId,
			operatorContactId: req.body.operatorContactId,
			operatorNIF: req.body.operatorNIF,
		});

		let OP = await operator.save();
		
		const infoArray = req.body.operatorInfo;
		
		for (i = 0; i < infoArray.length; i++) {
			
			const operatorInfo = new OperatorInfo({
				operatorInfoId: infoArray[i].operatorInfoId,
				operatorInfoKey: infoArray[i].operatorInfoKey,
				operatorInfoValue: infoArray[i].operatorInfoValue,
				operatorIdFK: req.body.operatorId
				
			});
			let OPI = await operatorInfo.save();
			
		}

		res.status(201).json({ OP });
	} catch (err) {
		res.status(400).json({ err: err });
	}
};