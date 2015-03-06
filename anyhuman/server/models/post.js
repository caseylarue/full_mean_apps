var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new mongoose.Schema({
	title: String,
	content: String,  /////??????
	tags: String,
	categories: String,
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now},
	comments: [{ body: String, date: Date }],
	Ratings: []
});

mongoose.model('Post', PostSchema);