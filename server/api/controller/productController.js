const Product = require('../model/Product');

exports.newProduct = async (req, res) => {
	try {
		const tamProduto = await Product.find().count();
		let gtin = await Math.floor(Math.random() * 100000000000000);

		if(tamProduto != 0) {
			const produtos = await Product.find().sort("-productId").limit(1);
			const maxProduto = produtos[0].productId;
			
			const product = new Product({
				productId: (maxProduto + 1),
				productFishName: req.body.productFishName,
				productDescription: req.body.productDescription,
				productGTIN: gtin
			});
			let OP = await product.save();

			res.status(201).json({ OP });
		}
		else {
			const nuloProduto = 1;

			const product = new Product({
				productId: nuloProduto,
				productFishName: req.body.productFishName,
				productDescription: req.body.productDescription,
				productGTIN: gtin
			});
			let OP = await product.save();

			res.status(201).json({ OP });
		}
	} catch (err) {
		res.status(400).json({ err: err });
	}
};

exports.getProduct = async (req, res) => {
	try {
		let products = await Product.find();
		res.send(products);
	} catch (error) {
		res.status(400).json({ error: error });
	}
};

exports.deleteProductById = async (req, res) => {
	try {
		const productId = req.body.productId;
		const productRemove = await Product.findOneAndRemove({ productId: productId });
		res.send('Produto\n' + productRemove.productFishName + '\nRemovido com sucesso!');
	} catch (err) {
		res.status(400).json({ err: err + ' Erro no delete do produto' });
	}
};

exports.updateProduct = async (req, res) => {
	try {
		const updateProd = req.body;
		const productUpdate = await Product.findOneAndUpdate(
			{ productId: updateProd.productId },
			updateProd
		);
		const productUpdated = await Product.findOne({ productId: updateProd.productId });
		res.send('Produto:\n' + productUpdated.productFishName + '\nAtualizado com sucesso!');
	} catch (err) {
		res.status(400).json({ err: err + ' (Erro ao atualizar produto)' });
	}	
};

exports.getProductById = async (req, res) => {
	try {
		const productGetById = req.body.productId;
		const product = await Product.findOne({ productId: productGetById });
		if (!product)
			return res.send('O produto não existe');
		res.send(product);
	} catch (err) {
		res.status(400).json({ err: 'Erro ao encontrar o id do produto' + err });
	}
};