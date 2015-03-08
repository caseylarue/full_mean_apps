var questions = require('./../server/controllers/questions.js');
var answers = require('./../server/controllers/answers.js');

 module.exports = function(app) {

	app.get('/question/get', function(req, res) {
		//console.log("in the get question route")
	  	questions.show(req, res);
	})

	app.post('/question/add', function(req, res) {
		//console.log("POST question to db", req.body);
	  	questions.add(req, res);
	})

	app.post('/question/show_question', function(req, res) {
		//console.log("show questions routes file", req.body);
	  	questions.display(req, res);
	})

	app.post('/answer/add', function(req, res) {
		console.log("POST DATA for new answer", req.body);
	  	answers.add(req, res);
	})

	app.post('/answer/get', function(req, res) {
		console.log("getting this question answers POST DATA", req.body);
	  	answers.display(req, res);
	})

	app.post('/answer/add_like', function(req, res) {
		console.log("adding like to this POST DATA", req.body);
	  	answers.add_like(req, res);
	})


	// app.get('/',function(req,res){
	// 	console.log("session in server.js", req.session);
	// })


  }