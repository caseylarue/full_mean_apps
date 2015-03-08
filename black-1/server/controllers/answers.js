var mongoose = require("mongoose");
var Question = mongoose.model("Question");
var Answer = mongoose.model("Answer");

module.exports =(function() {
	return {
		create: function(req, res) {
			console.log(req.body);
			var errors = [];
			
			if(req.body.answer.length < 5 ) {
				errors.push({ error: "Complain should be at least 5 characters." });
			}

			if(errors.length > 0 ) {
				res.json(errors);
			}
			else {
				Question.findOne({_id: req.body.questionId}, function(err, foundQuestion) {
					console.log("foundQuestion", foundQuestion);
					var newAnswer = new Answer({
						_question	: req.body.questionId,
						user 		: req.body.user,
						answer 		: req.body.answer,
						description : req.body.description,
						like 		: 0
					});
					foundQuestion.answers.push(newAnswer);

					newAnswer.save(function(err1, createdAnswer) {
						foundQuestion.save(function(err2, updatedQuestion) {
							if(!err2) {
								console.log("createAnswer", createdAnswer);
								console.log("updatedQuestion", updatedQuestion);
								res.json(createdAnswer);
							}
						})
					})
				})
			}
		},
		updateLike: function(req, res) {
			Answer.findOne({_id: req.body._id}, function(err, foundAnswer) {
				console.log("foundAnswer", foundAnswer);
				foundAnswer.like++;
				foundAnswer.save(function(err, updatedAnswer) {
					console.log("updatedAnswer", updatedAnswer);
					res.json(updatedAnswer);
				})
			})
		}
	}
})();