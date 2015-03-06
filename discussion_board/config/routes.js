var topics = require('./../server/controllers/topics.js');

var posts = require('./../server/controllers/posts.js');

 module.exports = function(app) {
	app.get('/topic/show', function(req, res) {
	  	topics.show(req, res);
	})

	app.post('/topic/add', function(req, res) {
		console.log("POST DATA", req.body);
	  	topics.add(req, res);
	})

	app.post('/topic/show_topic', function(req, res) {
		console.log("POST DATA", req.body);
	  	topics.show_topic(req, res);
	})

	app.post('/post/add', function(req, res) {
		console.log("POST DATA", req.body);
	  	posts.add(req, res);
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