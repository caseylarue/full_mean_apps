// var orders = require('./../server/controllers/orders.js');

var posts = require('./../server/controllers/posts.js');

 module.exports = function(app) {
	app.get('/post/show', function(req, res) {
	  	posts.show(req, res);
	})

	app.post('/post/add', function(req, res) {
		console.log("POST DATA", req.body);
	  	posts.add(req, res);
	})

	app.post('/post/get_post', function(req, res) {
		console.log("POST DATA", req.body);
	  	posts.get_post(req, res);
	})
	// app.post('/customer/remove', function(req, res){
	// 	//console.log("POST DATA", req.body);
	//   	customers.remove(req, res);
	// })

	// app.post('/customer/display', function(req, res){
	// 	//console.log("POST DATA", req.body);
	//   	customers.display(req, res);
	// })



	// app.get('/order/get', function(req, res) {
	//   	orders.show(req, res);
	// })

	// app.post('/order/add', function(req, res){
	// 	console.log("POST DATA", req.body);
	//   	orders.add(req, res);
	// })

	// app.post('/order/remove', function(req, res){
	// 	console.log("POST DATA", req.body);
	//   	orders.remove(req, res);
	// })
  }