var mongoose = require('mongoose');
var Answer = mongoose.model('Answer');
var Question = mongoose.model('Question');

module.exports = (function() {
  	return {
	// add: function(req, res) {
	// 	var answer = new Answer({_question: req.body.question, answer: req.body.answer, details: req.body.details, likes: req.body.likes, user: req.body.user, created_at: Date.now()});
	// 	console.log("saving this question to the db", answer);
	// 	answer.save(function(err, results){
	// 		if(err){
	// 			console.log('something went wrong');
	// 		}
	// 		else{
	// 			console.log("results of save to db", results);
	// 			res.json(results);
	// 		}
	// 	})
	// }
	add: function(req, res) {
		Question.findOne({_id: req.body.question}, function(err, question){
			var answer = new Answer({_question: req.body.question, answer: req.body.answer, details: req.body.details, likes: req.body.likes, user: req.body.user, created_at: Date.now()});
			question.answers.push(answer);
			answer.save(function(err, results){
				if(err){
					console.log('something went wrong saving the answer');
				}
				else{
					question.save(function(err, results){
						if(err){
							console.log('something went wrong saving the question');
						}
						else{
							console.log("question of saved to db", results);
							res.json(results);
						}
					})
				}
			})
		})
	},
	display: function(req, res) {
		console.log("in the model", {_question: req.body.question})
		Answer.find({_question: req.body.question}, function(err, results){
			if(err){
				console.log('something went wrong getting the answers');
			}
			else{
				console.log("answers from db", results);
				res.json(results);
			}
		})
	},
	add_like: function(req, res) {
		//console.log({_id: req.body.id}, {$push: {answers: {answer: req.body.answer, details: req.body.details, likes: req.body.likes, user: req.body.user, created_at: Date.now()}}});
		Answer.findOne({_id: req.body.answer_id}, function(err, answer){
			if(err){
				console.log('something went wrong getting the answers');
			}
			else{
				answer.likes++;
				console.log("updated answer", answer);
				answer.save(function(err, updatedAnswer){
					if(err){
						console.log('something went wrong saving the question');
					}
					else{
						console.log("question of saved to db", updatedAnswer);
						res.json(updatedAnswer);
					}
				})
				// console.log("answers from db", results);
				// res.json(results);
	
			}
		})
	}
	// display: function(req, res) {
	// 	Question.findOne({_id: req.body.id}, function(err, results){
	// 		if(err){
	// 			console.log('something went wrong');
	// 		}
	// 		else{
	// 			console.log("results from db", results);
	// 			res.json(results);
	// 		}		
	// 	})
	// },
	// new_answer: function(req, res) {
	// 	console.log({_id: req.body.id}, {$push: {answers: {answer: req.body.answer, details: req.body.details, likes: req.body.likes, user: req.body.user, created_at: Date.now()}}});
	// 	Question.update({_id: req.body.id}, {$push: {answers: {answer: req.body.answer, details: req.body.details, likes: req.body.likes, user: req.body.user, created_at: Date.now()}}}, function(err, results){
	// 		if(err){
	// 			console.log('something went wrong');
	// 		}
	// 		else{
	// 			//console.log("results", results);
	// 			res.json(results);
	// 		}		
	// 	})
	// },


		
  	}
})();