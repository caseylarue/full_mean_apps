var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var QuestionSchema = new mongoose.Schema({
	question: String,
	description: String,
	answers: [{answer: String, likes: Number, details: String, user: String, created_at: Date }],
	// likes: Number,
	created_at: {type: Date, default: Date.now},
});

mongoose.model('Question', QuestionSchema);
