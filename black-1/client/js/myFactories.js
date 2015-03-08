angular.module("myFactories", [])
.factory("questionFactory", function($http) {
	var factory = {};
	var questions = [];
	var question = {};
	factory.user = "";

	factory.createQuestion = function(newQuestion, callback) {
		newQuestion.user = factory.user;
		console.log("newQuestion", newQuestion);
		$http.post("/Questions", newQuestion).success(function(result) {
			
			console.log("=================");
			if(angular.isArray(result)) {
				console.log("err:", result);
				callback(result, null);
			}
			else {
				console.dir("success:", result);
				questions.push(result);
				callback(null, result);
			}
		});
	};

	factory.readQuestion = function(callback) {
		$http.get("/questions").success(function(result) {
			questions = result;
			callback(questions);
		});
	};

	// only for one question
	factory.readOneQuestion = function(questionId, callback) {
		console.log("question id", questionId.id);
		$http.get("/questions/" + questionId.id).success(function(result) {
			question = result
			console.log(question);
			callback(question);
		})
	}

	factory.createAnswer = function(newAnswer, callback) {
		newAnswer.user = factory.user;
		console.log("creating newAnswer from factory", newAnswer);
		$http.post("/answers", newAnswer).success(function(result) {
			console.log("=================");
			if(angular.isArray(result)) {
				console.log("err:", result);
				callback(result, null);
			}
			else {
				console.dir("success:", result);
				questions.push(result);
				callback(null, result);
			}
		})
	}

	// update like
	factory.updateLike = function(selectedAnswer, callback) {
		console.log("selectedAnswer", selectedAnswer);
		$http.post("/like", selectedAnswer).success(function(result) {
			callback(result);
		})
	}

	return factory;
})