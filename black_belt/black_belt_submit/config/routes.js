var questions = require('./../server/controllers/questions.js');

 module.exports = function(app) {
	app.get('/question/get', function(req, res) {
		//console.log("in the get question route")
	  	questions.show(req, res);
	})

	app.post('/question/add', function(req, res) {
		console.log("POST question to db", req.body);
	  	questions.add(req, res);
	})

	app.post('/question/display_question', function(req, res) {
		console.log("looking for this question in routes file", req.body);
	  	questions.display(req, res);
	})

	app.post('/question/new_answer', function(req, res) {
		console.log("looking for this new answer in routes file", req.body);
	  	questions.new_answer(req, res);
	})

	app.post('/question/add_like', function(req, res) {
		console.log("adding like to this POST DATA", req.body);
	  	questions.add_like(req, res);
	})
	// app.post('/topic/show_topic', function(req, res) {
	// 	console.log("show topic POST DATA", req.body);
	//   	topics.show_topic(req, res);
	// })

	// app.post('/post/add', function(req, res) {
	// 	console.log("POST DATA", req.body);
	//   	posts.add(req, res);
	// })

	// app.post('/post/get', function(req, res) {
	// 	console.log("POST DATA request to show post", req.body);
	//   	posts.show(req, res);
	// })

	// app.post('/post/add_comment', function(req, res) {
	// 	console.log("POST DATA to add comment", req.body);
	//   	posts.add_comment(req, res);
	// })

	// app.post('/post/get_comments', function(req, res) {
	// 	console.log("POST DATA to get comments", req.body);
	//   	posts.get_comments(req, res);
	// })

  }