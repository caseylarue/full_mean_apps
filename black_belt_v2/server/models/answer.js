var mongoose = require("mongoose");

var Question = require("./question");
var Schema = mongoose.Schema;

var AnswerSchema = new mongoose.Schema({
	_question: {type: Schema.ObjectId, ref: "Question"},
	answer: String,
	details: String,
	likes: Number,
	user: String,
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date}
});

mongoose.model("Answer", AnswerSchema);
