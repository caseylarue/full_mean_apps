var mongoose = require('mongoose');
var Question = mongoose.model('Question');

module.exports = (function() {
  	return {
  	show: function(req, res) {
  		Question.find({}, function(err, results) {
    		if(err) {
      			console.log(err);
    		} else {
    			//console.log("results in the model", results)
      			res.json(results);
   			}
  		})
	},
	add: function(req, res) {
		var question = new Question({question: req.body.question, description: req.body.description, created_at: Date.now()});
		//console.log("topic in server controller", topic);
		question.save(function(err, results){
			if(err){
				console.log('something went wrong');
			}
			else{
				console.log("results", results);
				console.log('successfully added a user!');
				res.json(results);
			}
		})
	},
	display: function(req, res) {
		Question.findOne({_id: req.body.id}, function(err, results){
			if(err){
				console.log('something went wrong');
			}
			else{
				//console.log("results", results);
				res.json(results);
			}		
		})
	},
	new_answer: function(req, res) {
		console.log({_id: req.body.id}, {$push: {answers: {answer: req.body.answer, details: req.body.details, likes: req.body.likes, user: req.body.user, created_at: Date.now()}}});
		Question.update({_id: req.body.id}, {$push: {answers: {answer: req.body.answer, details: req.body.details, likes: req.body.likes, user: req.body.user, created_at: Date.now()}}}, function(err, results){
			if(err){
				console.log('something went wrong');
			}
			else{
				//console.log("results", results);
				res.json(results);
			}		
		})
	},
	add_like: function(req, res) {
		//console.log({_id: req.body.id}, {$push: {answers: {answer: req.body.answer, details: req.body.details, likes: req.body.likes, user: req.body.user, created_at: Date.now()}}});
		Question.find({answers: {_id: "54fa431a52cc89226ae6544a" }}, function(err, results){
			if(err){ 
				console.log('something went wrong');
			}
			else{
				console.log("result of query in add_like model", results);
				res.json(results);
			}		
		})
	}

		
  	}
})();