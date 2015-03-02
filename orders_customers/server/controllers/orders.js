var mongoose = require('mongoose');
var Order = mongoose.model('Order');

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
					console.log("results", results);
					console.log('successfully added a user!');
					res.json({name: results.name, age: results.age, _id: results._id, orders: results.orders });
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
		}
  	}
})();