var mongoose = require('mongoose');

var Answer = require("./answer");
var Schema = mongoose.Schema;

var QuestionSchema = new mongoose.Schema({
	question: String,
	description: String,
	user: String,
	created_at: {type: Date, default: Date.now},
	udpated_at: {type: Date},
	answers: [{type: Schema.Types.ObjectId, ref: "Answer"}]
});

mongoose.model("Question", QuestionSchema);
