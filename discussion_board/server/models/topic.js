var mongoose = require('mongoose');

var Post = require('./post');

var Schema = mongoose.Schema;

var TopicSchema = new mongoose.Schema({
	topic: String,
	description: String,
	category: String,
	user_name: String,
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date},
	posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});

mongoose.model('Topic', TopicSchema);
