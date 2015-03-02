var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');

module.exports = (function() {
  	return {
	  	show: function(req, res) {
	  		Customer.find({}, function(err, results) {
	    		if(err) {
	      			console.log(err);
	    		} else {
	      			res.json(results);
	   			}
	  		})
		},
		add: function(req, res) {
			var customer = new Customer({name: req.body.name, created_at: Date.now()});
			customer.save(function(err, results){
				if(err){
					console.log('something went wrong');
				}
				else{
					//console.log(results);
					//console.log('successfully added a user!');
					res.json({name: results.name, created_at: results.created_at ,id: results._id });
				}
			})
		},
		remove: function(req, res) {
			Customer.remove({_id: req.body.id}, function(err, results){
				if(err){
					console.log('something went wrong');
				}
				else{
					//console.log("results", results);
					//console.log('successfully deleted user!');
					res.json({success: "true"});
				}		
			})
		},
		display: function(req, res) {
			Customer.findOne({_id: req.body.id}, function(err, results){
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