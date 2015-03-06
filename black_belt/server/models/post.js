var mongoose = require('mongoose');

var Topic = require('./topic');
var Schema = mongoose.Schema;

var PostSchema = new mongoose.Schema({
	_topic: {type: Schema.ObjectId, ref: 'Topic'},
	msg: String,
	user_name: String,
	upvote: Number,
	downvote: Number,
  	created_at: {type: Date, default: Date.now},
  	updated_at: {type: Date, default: Date.now},
  	comments: [{ body: String, user_name: String, created_at: Date }]
});

mongoose.model('Post', PostSchema);