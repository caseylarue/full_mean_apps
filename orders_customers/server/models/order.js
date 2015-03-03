var mongoose = require('mongoose');

var Customer = require('./customer');
var Schema = mongoose.Schema;

var OrderSchema = new mongoose.Schema({
	_customer: {type: Schema.ObjectId, ref: 'Customer'},
  	product: String,
  	qty: Number,
  	created_at: {type: Date, default: Date.now}
});

mongoose.model('Order', OrderSchema);




// This is the friend.js file located at /server/models/friend.js
// We want to create a file that has the schema for our friends and creates a model that we can then call upon in our controller
// var mongoose = require('mongoose');
// // create our friendSchema
// var OrderSchema = new mongoose.Schema({
//   name: String,
//   product: String,
//   qty: Number,
//   created_at: {type: Date, default: Date.now}
// });
// // use the schema to create the model
// // Note that creating a model CREATES the collection in the database (makes the collection plural)
// mongoose.model('Orders', OrderSchema);
// notice that we aren't exporting anything -- this is because this file will be run when we require it using our config file and then since the model is defined we'll be able to access it from our controller