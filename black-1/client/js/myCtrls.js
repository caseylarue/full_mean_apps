angular.module("myCtrls", [])
.controller("homeCtrl", function($scope, questionFactory) {
	
	$scope.user = prompt();
	questionFactory.user = $scope.user;

	$scope.predicate = "-created_at"

	questionFactory.readQuestion(function(result) {
		$scope.questions = result;
	})

})

.controller("newQuestionCtrl", function($scope, $location, questionFactory) {


	$scope.isError = false;

	$scope.createQuestion = function(newQuestion) {
		$scope.isError = false;
		questionFactory.createQuestion(newQuestion, function(err, result) {
			if(err != null) {
				$scope.isError = true;
				$scope.errors = err;
				console.log(err);
			}
			else {
				console.log("success");
				$scope.isError = false;
				$scope.errors = [];
				$location.path("/");
			}
		});
	}
})

.controller("questionCtrl", function($scope, $routeParams, questionFactory) {


	questionFactory.readOneQuestion($routeParams, function(result) {
		$scope.question = result[0];
		$scope.answers = result[0].answers;
		$scope.predicate = "-like";
		console.log("$scope.question, specific", $scope.question);
	})

	$scope.updateLike = function(selectedAnswer) {
		questionFactory.updateLike(selectedAnswer, function(result) {
			console.log("updatedAnswer", result);
			$scope.answers[$scope.answers.indexOf(selectedAnswer)] = result;
		});
	}
})

.controller("newAnswerCtrl", function($scope, $routeParams, $location, questionFactory) {
	console.log("newAnswer params", $routeParams);
	$scope.isError = false;
	$scope.params = $routeParams.id;

	$scope.createAnswer = function(newAnswer) {
		$scope.isError = false;
		newAnswer.questionId = $routeParams.id;
		console.log("Create Answer :", newAnswer)
		questionFactory.createAnswer(newAnswer, function(err, result) {
			if(err != null) {
				$scope.isError = true;
				$scope.errors = err;
				console.log(err);
			}
			else {
				console.log("success");
				$scope.isError = false;
				$scope.errors = [];
				$location.path("/question/" + $routeParams.id);
			}
		});
	};
})

