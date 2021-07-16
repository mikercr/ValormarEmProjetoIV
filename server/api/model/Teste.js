const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testeSchema = new Schema({
	// talvez a informação (sem contar com o ID venha de outro schema)
	testeId: {
		type: Number,
		unique: true
		//required: [true, "Please, include the number"]
	}
});

const Teste = mongoose.model('Teste', testeSchema);
module.exports = Teste;