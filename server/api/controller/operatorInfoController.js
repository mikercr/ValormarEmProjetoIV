const OperatorInfo = require("../model/OperatorInfo");

exports.newOperatorInfo = async (req, res) => {
	try {
		
		const infoArray = req.body.operatorInfo;
		
		for (i = 0; i < infoArray.length; i++) {
			
			const operatorInfo = new OperatorInfo({
				operatorInfoId: infoArray[i].operatorInfoId,
				operatorInfoKey: infoArray[i].operatorInfoKey,
				operatorInfoValue: infoArray[i].operatorInfoValue,
				operatorIdFk: infoArray[i].operatorIdFk
				
			});
			let OP = await operatorInfo.save();
			
		}
		
		res.status(201).json({ OP });
			
	
	} catch (err) {
		res.status(400).json({ err: err });
	}
};

exports.getOperatorInfo = async (req, res) => {
	try {
		let operatorInfos = await OperatorInfo.find();
		res.send(operatorInfos);
	} catch (error) {
		res.status(400).json({ error: error });
	}
};

exports.getOperatorInfoByOperatorId = async (req, res) => {
	try {
		const operatorId = req.body.operatorId;
		const info = await OperatorInfo.find({ 'operatorId': operatorId });
		res.send(info);
	} catch (error) {
		res.status(400).json({ error: error });
	}
};