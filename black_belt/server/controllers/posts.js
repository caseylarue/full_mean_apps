var mongoose = require('mongoose');
var Post = mongoose.model('Post');

module.exports = (function() {
  	return {
  	show: function(req, res) {
  		Post.find({_topic: req.body.topic}, function(err, results) {
    		if(err) {
      			console.log(err);
    		} else {
    			//console.log("getting the posts", results);
      			res.json(results);
   			}
  		})
	},
	add: function(req, res) {
		var post = new Post({_topic: req.body._topic, msg: req.body.message, user_name: req.body.name, created_at: Date.now()});
		console.log(post);
		post.save(function(err, results){
			if(err){
				console.log('something went wrong');
			}
			else{
				console.log(results);
				console.log('successfully added a post!');
				res.json({succes: "true"});
			}
		})
	},
	add_comment: function(req, res) {
		//console.log({_topic: req.body.topic_id}, {$push: {comments: {body: req.body.message, user_name: req.body.name, created_at: Date.now() } } })
		Post.update({_topic: req.body.topic_id}, {$push: {comments: {body: req.body.message, user_name: req.body.name, created_at: Date.now() } } }, function(err, results) {
			if(err){
				console.log('something went wrong');
			}
			else{
				console.log(results);
				console.log('successfully added a comment to post!');
				res.json({succes: "true"});
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
	} // end of return
})();