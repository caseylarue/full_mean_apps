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
		console.log("show topic POST DATA", req.body);
	  	topics.show_topic(req, res);
	})

	app.post('/post/add', function(req, res) {
		console.log("POST DATA", req.body);
	  	posts.add(req, res);
	})

	app.post('/post/get', function(req, res) {
		console.log("POST DATA request to show post", req.body);
	  	posts.show(req, res);
	})

	app.post('/post/add_comment', function(req, res) {
		console.log("POST DATA to add comment", req.body);
	  	posts.add_comment(req, res);
	})

	app.post('/post/get_comments', function(req, res) {
		console.log("POST DATA to get comments", req.body);
	  	posts.get_comments(req, res);
	})

	app.post()
  }