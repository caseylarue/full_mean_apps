var questions = require("./../server/controllers/questions.js");
var answers = require("./../server/controllers/answers.js")

module.exports = function(app) {

	app.post("/questions", function(req, res) {
		questions.create(req, res);
	});

	app.get("/questions", function(req, res) {
		questions.read(req, res);
	});

	app.get("/questions/:id", function(req, res) {
		questions.readOne(req, res);
	});

	app.post("/answers", function(req, res) {
		answers.create(req, res);
	});

	app.post("/like", function(req, res) {
		answers.updateLike(req, res);
	});
}