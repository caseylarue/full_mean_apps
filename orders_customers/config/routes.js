var orders = require('./../server/controllers/orders.js');

var customers = require('./../server/controllers/customers.js');

 module.exports = function(app) {
	app.get('/customer/get', function(req, res) {
	  	customers.show(req, res);
	})

	app.post('/customer/add', function(req, res) {
		//console.log("POST DATA", req.body);
	  	customers.add(req, res);
	})

	app.post('/customer/remove', function(req, res){
		//console.log("POST DATA", req.body);
	  	customers.remove(req, res);
	})

	app.post('/customer/display', function(req, res){
		//console.log("POST DATA", req.body);
	  	customers.display(req, res);
	})



	app.get('/order/get', function(req, res) {
	  	orders.show(req, res);
	})

	app.post('/order/add', function(req, res){
		console.log("POST DATA", req.body);
	  	orders.add(req, res);
	})

	app.post('/order/remove', function(req, res){
		console.log("POST DATA", req.body);
	  	orders.remove(req, res);
	})
  }