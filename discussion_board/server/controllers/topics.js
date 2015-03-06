var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');

module.exports = (function() {
  	return {
  	show: function(req, res) {
  		Topic.find({}, function(err, results) {
    		if(err) {
      			console.log(err);
    		} else {
      			res.json(results);
   			}
  		})
	},
	add: function(req, res) {
		var topic = new Topic({topic: req.body.topic, description: req.body.description, category: req.body.category, user_name: req.body.user_name, created_at: Date.now()});
		//console.log("topic in server controller", topic);
		topic.save(function(err, results){
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
	show_topic: function(req, res) {
		Topic.findOne({_id: req.body._id}, function(err, results){
			if(err){
				console.log('something went wrong');
			}
			else{
				console.log("results", results);
				console.log('successfully added a user!');
				res.json(results);
			}
		})
	}
		// remove: function(req, res) {
		// 	Customer.remove({_id: req.body.id}, function(err, results){
		// 		if(err){
		// 			console.log('something went wrong');
		// 		}
		// 		else{
		// 			//console.log("results", results);
		// 			//console.log('successfully deleted user!');
		// 			res.json({success: "true"});
		// 		}		
		// 	})
		// },
		// display: function(req, res) {
		// 	Customer.findOne({_id: req.body.id}, function(err, results){
		// 		if(err){
		// 			console.log('something went wrong');
		// 		}
		// 		else{
		// 			//console.log("results", results);
		// 			res.json(results);
		// 		}		
		// 	})
		// }
  	}
})();