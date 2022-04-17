const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = require('../utils/toThousand')
let descuento= (descuento,precio ) =>{
			
	let resultadoParcial =descuento*precio/100
	return precio - resultadoParcial
}  
const controller = {
	index: (req, res) => {
		let visita = products.filter(product=> product.category === "visited");
		let inSale =products.filter(product=> product.category === "in-sale");
		return res.render('index',{
			products,
			visita,
			inSale,
			descuento,
			toThousand
		})
	},
	search:  (req, res) => {
		let resultado =  products.filter(producto => producto.name.toLowerCase().includes(req.query.keywords.toLowerCase().trim()))
		return  res.render('results',{
			products,
			resultado,
			busqueda: req.query.keywords
		})
	},
};

module.exports = controller;
