
// First add the following two lines at the top of the friends controller so that we can access our model through var Friend
// need to require mongoose to be able to run mongoose.model()
var mongoose = require('mongoose');
var Friend = mongoose.model('Friend');

module.exports = (function() {
  	return {
	  	show: function(req, res) {
	  		Friend.find({}, function(err, results) {
	    		if(err) {
	      			console.log(err);
	    		} else {
	      			res.json(results);
	   			}
	  		})
		},
		add: function(req, res) {
			var friend = new Friend({name: req.body.name, age: req.body.age});
			friend.save(function(err, results){
				if(err){
					console.log('something went wrong');
				}
				else{
					// console.log(results);
					console.log('successfully added a user!');
					res.json({name: results.name, age: results.age, _id: results._id });
				}
			})
		},
		remove: function(req, res) {
			Friend.remove({_id: req.body.id}, function(err, results){
				if(err){
					console.log('something went wrong');
				}
				else{
					console.log("results", results);
					console.log('successfully deleted user!');
					res.json({success: "true"});
				}		
			})
		},


    // show: function(req, res) {
    //   res.json([{name: "Andrew", age: 24}, {name: "Michael", age: 35}]);
    // }
  	}
})();