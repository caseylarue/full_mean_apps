angular.module("myConfig", [])
.config(function($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl: "home.html",
		controller: "homeCtrl"
	})
	.when("/new_question", {
		templateUrl: "new_question.html",
		controller: "newQuestionCtrl"
	})
	.when("/question/:id", {
		templateUrl: "question.html",
		controller: "questionCtrl"
	})
	.when("/question/:id/new_answer", {
		templateUrl: "new_answer.html",
		controller: "newAnswerCtrl"
	})
	.otherwise({
		templateUrl: "home.html"
	})
})