var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var Customer = mongoose.model('Customer');

module.exports = (function() {
  	return {
	  	show: function(req, res) {
	  		Order.find({}, function(err, results) {
	    		if(err) {
	      			console.log(err);
	    		} else {
	      			res.json(results);
	   			}
	  		})
		},
		add: function(req, res) {
			var order = new Order({_customer: req.body.id, product: req.body.product, qty: req.body.qty, created_at: Date.now()});
				console.log("order", order);
					order.save(function(err, results){
						if(err){
							console.log('something went wrong');
						}
						else{
							console.log("added order to db", results);
							console.log('successfully added order!');
							Customer.update({_id: req.body.id}, {$push: {orders: order} }, function(err, results){
								if(err){
									console.log('something went wrong getting the customer from db');
								}
								else{
									console.log("results of customer find", results);
								}
							})
							res.json({order: "successfully posted"});
						}
					})		
		},
		remove: function(req, res) {
			Order.remove({_id: req.body.order_id}, function(err, results){
				if(err){
					console.log('something went wrong');
				}
				else{
					Customer.update({_id: req.body.customer_id}, {$pull: {'orders': {'_id': req.body.order_id} } }, function(err, results){
						if(err){
							console.log('something went wrong getting the customer from db');
						}
						else{
							console.log("results of customer find", results);
							res.json({success: "true"});
						}
					})	
				}		
			})
		}
  	}
})();