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
					//Customer.update({_id: req.body.customer_id}, {$pull: {orders: {ObjectId: (req.body.order_id)} } }, function(err, results){
					//Customer.update({_id: "54f3a2844471213c3b050ee5"}, {$pull: {orders: ("54f4a29a78be0b6b202c27b3") } }, function(err, results){	
					Customer.update({_id: req.body.customer_id}, {$pull: {orders: (req.body.order_id) } }, function(err, results){	
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