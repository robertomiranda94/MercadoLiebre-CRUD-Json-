const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const descuento= (descuento,precio ) =>{
			
	let resultadoParcial =descuento*precio/100
	return precio - resultadoParcial
}  
let guardar = (products) => {
	fs.writeFileSync(
	  path.join(__dirname, "../data/productsDataBase.json"),
	  JSON.stringify(products, null, " "),
	  "utf-8"
	);
  };

const controller = {
	// Root - Show all products
	index: (req, res) => {
		
	  return res.render('products',{
		  products,
		  descuento,
		  toThousand
	  })
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let producto = products.find(producto => producto.id === +req.params.id);

        return res.render('detail',{
            producto,
			products,
			descuento,
			toThousand 
        })
	},

	// Create - Form to create
	create: (req, res) => {
		return res.render('product-create-form',{
			products
		})
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const { name, price, discount, category, description } = req.body;
		let product = {
		  id: products[products.length - 1].id + 1, 
		  name,
		  description,
		  price,
		  discount,
		  image: "default-image.png",
		  category,
		};
		products.push(product);
		guardar(products);
		res.redirect('/products');
	
	},


	// Update - Form to edit
	edit: (req, res) => {
		let product = products.find((product) => product.id === +req.params.id);
		res.render('product-edit-form', {
		  product,
		});
	},
	// Update - Method to update
	update: (req, res) => {

		const { name, price, discount, category, description } = req.body;
		products.forEach((product) => {
		  if (product.id == +req.params.id) {
			product.name = name;
			product.price = price;
			product.discount = discount;
			product.category = category;
			product.description = description;
		  }
		});
		guardar(products);
		res.redirect('/products');
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		products = products.filter((product) => product.id !== +req.params.id);
		guardar(products);
		res.redirect('/products');
	  },
};

module.exports = controller;
