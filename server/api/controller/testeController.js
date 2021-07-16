const Teste = require('../model/Teste');

exports.newTeste1 = async (req, res) => {
	try {
		
		var idMax = await Teste.getElementWithMaxIdDemo.find().sort({testeId:-1}).limit(1).pretty().exec(function(err, item) {
    console.log(item.testeId);
});
			
		
		const testeArray = req.body.Testet;
		//console.log(testeArray.length);
		
		for (i = 0; i < testeArray.length; i++) {
  
			//console.log(testeArray[i].testeId);
			
			
			/*
			const teste = new Teste({
			//testeId: testeArray[i].testeId
				testeId: (idMax.testeId+1)
				
			});
			
			let OP = await teste.save();
			*/
}
		
		res.status(201).json({ OP });
			
	
	} catch (err) {
		res.status(400).json({ err: err });
	}
};

exports.getTeste = async (req, res) => {
	try {
		
		/*
		let testes = await Teste.find().sort("-testeId").limit(1);
		const max = testes[0].testeId;
		console.log(max + ' Novo ID: ' + (max+1));
		res.send(testes);
		*/
		/*
		let testes = await Teste.find();
		res.send(testes);
		*/
		
		let testes = await Teste.find();
		res.send(testes);
		
		/*
		const tam = await Teste.find().count();
		console.log(tam);
		*/
		//res.send(tam);
	} catch (error) {
		console.log('Vens prรก aqui');
		res.status(400).json({ error: error });
	}
};

exports.deleteTesteById = async (req, res) => {
	try {
		const testeId = req.body.testeId;
		const testeRemove = await Teste.findOneAndRemove({ testeId: testeId });
		res.send('\nRemovido com sucesso!');
	} catch (err) {
		res.status(400).json({ err: err + ' Erro no delete do produto' });
	}
};

exports.newTeste = async (req, res) => {
	try {
		
		const tamTeste = await Teste.find().count();
		
		if(tamTeste != 0) {
			
			let testes = await Teste.find().sort("-testeId").limit(1);
			const max = testes[0].testeId;
			
			const teste = new Teste({
				testeId: (max + 1)
			});
			let OP = await teste.save();
			
			res.status(201).json({ OP });
			
		}
		else {
			
			const nulo = 1;
			const teste = new Teste({
				testeId: nulo
			});
			let OP = await teste.save();
			
			res.status(201).json({ OP });
			
		}
		
		
	} catch (err) {
		res.status(400).json({ err: err });
	}
};

/*
const Event = require('../model/Event');
const EventInputLot = require('../model/EventInputLot');
const EventOutLot = require('../model/EventOutputLot');
const EventInfo = require('../model/EventInfo');
EventInfo.collection.drop();
*/