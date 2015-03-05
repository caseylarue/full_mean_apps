// Posts controller

var mongoose = require('mongoose');
var Post = mongoose.model('Post');

module.exports = (function() {
  	return {
	  	show: function(req, res) {
	  		Post.find({}, function(err, results) {
	    		if(err) {
	      			console.log(err);
	    		} else {
	      			res.json(results);
	   			}
	  		})
		},
		add: function(req, res) {
			var post = new Post({title: req.body.title, content: req.body.content, tags: req.body.tags, categories: req.body.categories, created_at: Date.now()});
			post.save(function(err, results){
				if(err){
					console.log('something went wrong');
				}
				else{
					console.log("results to adding to db", results);
					console.log('successfully added a post!');
					res.json({succes: "true" });
				}
			})
		},
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
		get_post: function(req, res) {
			Post.findOne({_id: req.body._id}, function(err, results){
				if(err){
					console.log('something went wrong');
				}
				else{
					//console.log("results", results);
					res.json(results);
				}		
			})
		}
  	}
})();