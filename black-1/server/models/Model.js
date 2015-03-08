var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schemaQuestion = mongoose.Schema({
	user 			: String,
	question 		: String,
	description		: String,
	created_at 		: { type: Date, default: Date.now },
	answers 		: [{type: Schema.Types.ObjectId, ref: 'Answer'}]
});

var schemaAnswer = mongoose.Schema({
	_question 		: {type: Schema.ObjectId, ref: 'Question'},
	user 			: String,
 	answer 			: String,
 	description		: String,
 	like 			: Number,
 	created_at 		: { type: Date, default: Date.now }
})

mongoose.model("Question", schemaQuestion);
mongoose.model("Answer", schemaAnswer);
