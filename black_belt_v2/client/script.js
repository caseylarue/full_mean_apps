var myApp = angular.module('myApp', ['ngRoute']);
//  use the config method to set up routing:
myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
        templateUrl: 'partials/first.html'
    })
    .when('/home',{
        templateUrl: 'partials/home.html'
    })
    .when('/add_question',{
        templateUrl: 'partials/add_question.html'
    })
    .when('/show/:question_id',{
        templateUrl: 'partials/show_question.html'
    })
    .when('/answer/:question_id',{
        templateUrl: 'partials/add_answer.html'
    })
    // .when('/answer/:question_id',{
    //     templateUrl: 'partials/add_answer.html'
    // })
    .otherwise({
    	redirectTo: '/'
    });
});

// global variables
var user;

myApp.factory('questionFactory', function ($http) {
	var questions;
	var question_id;
	var display_question;
	var default_likes = 0;
	var factory = {};
	
	factory.addUser = function(info, callback){
		user = info;
		//console.log("user save to factory", user);
		callback(user);
	}
	
	factory.getUser = function(callback){
		//console.log("sending user to controller", user);
		callback(user);
	}	
  	
  	factory.addQuestion = function(info, callback){
  		info.user = user;
  		console.log("this will be posted to db", info);
  		$http.post("/question/add", info).success(function(output) {
  			alert("you have added an question successfully!");
	     	callback(output);  
      	})
  	}

  	factory.getQuestions = function(callback){
		$http.get('/question/get').success(function(output) {
        	questions = output;
        	callback(questions);
	    })
	}

	factory.showQuestion = function(info){
	 	question_id = info;
	 	console.log("saved this question_id to factory", question_id);
  	}

  	factory.displayQuestion = function(callback){
	 	$http.post("/question/show_question", {id: question_id}).success(function(output) {
	     	display_question = output;
	     	console.log("saved this question to factory", display_question);
	     	callback(display_question);  
      	})
  	}

  	factory.newAnswer = function(info, callback){
  		info._id = question_id;
  		info.user = user
  		info.likes = default_likes;
  		console.log("info in the factory", info);
  		$http.post("/answer/add", {question: info._id, likes: info.likes, answer: info.answer, details: info.details, user: info.user}).success(function(output) {
	     	callback(output);  
      	})
  	}

  	factory.displayAnswers = function(callback){
  		$http.post("/answer/get", {question: question_id}).success(function(output) {
	     	callback(output);  
      	})
  	}

  	factory.addLike = function(info, callback){
  		console.log("addLike", info)
  		$http.post("/answer/add_like", {answer_id: info}).success(function(output) {
	     	callback(output);  
      	})
  	}

  	return factory
});   // close the myFactory 


myApp.controller('questionsController', function ($scope, $location, questionFactory){
    
    $scope.user;
    $scope.added_question;
   	$scope.questions;
   	//$scope.display_question;

    questionFactory.getUser(function(data){
		$scope.user = data;
		console.log("$scope.user", $scope.user);
	})

	questionFactory.getQuestions(function(data){
		$scope.questions = data;
		console.log("$scope.questions", $scope.questions);
	})

    $scope.addUser = function(newUser){
		questionFactory.addUser($scope.newUser, function(data){
			$scope.user= data;
			//console.log("$scope.user saved!", $scope.user);
		})
	}	

	$scope.addQuestion = function(newQuestion, callback){
		console.log("made it to the addQuestion controller", newQuestion)
		questionFactory.addQuestion($scope.newQuestion, function(data){
			$scope.added_question = data;
			console.log("$scope.added_question", $scope.added_question);
		})
	}

	$scope.showQuestion = function(question_id, callback){
		console.log("inside the showQuestion controller", question_id);
		questionFactory.showQuestion(question_id, function(data){
			//$scope.display_question = data;
			//console.log("$scope.display_question", $scope.display_question);
		})
	}
	$scope.addAnswer = function(question_id, callback){
		questionFactory.showQuestion(question_id, function(data){
		})
	}			
})


myApp.controller('displayController', function ($scope, $location, questionFactory){
    
    $scope.user;
   	$scope.display_question;
   	$scope.display_answers;

    questionFactory.getUser(function(data){
		$scope.user = data;
		console.log("$scope.user", $scope.user);
	})

	questionFactory.displayQuestion(function(data){
		$scope.display_question = data;
		console.log("$scope.display_question", $scope.display_question);
	})

	questionFactory.displayAnswers(function(data){
		$scope.display_answers = data;
		console.log("$scope.display_answers", $scope.display_answers);
	})

	$scope.newAnswer = function(addAnswer, callback){
		console.log("made it to newAnswer controller", addAnswer);
		questionFactory.newAnswer($scope.addAnswer, function(data){
		})
	}

	$scope.addLike = function(answer_id, callback){
		console.log("answer_id to add like", answer_id);
		questionFactory.addLike(answer_id, function(data){
		})
	}			


	// $scope.displayAnswers = function(question_id, callback){
	// 	questionFactory.showQuestion(question_id, function(data){
	// 		$scope.display_answers = data;
	// 		console.log("$scope.display_answers", $scope.display_answers);
	// 	})
	// }
})



// 	var show_question;
// 	var add_answer_id;
// 	var topic_id;

// myApp.factory('questionFactory', function ($http) {
// 	var questions;
// 	var factory = {};
// 	var default_likes = 0


		

//   	factory.showQuestion = function(info, callback){
// 		show_question = info;
//   	}


//   	factory.addLike = function(info, callback){
//   		$http.post("/question/add_like", {topic_id: topic_id, answer_id: info}).success(function(output) {
// 	     	callback(output);  
//       	})
//   	}
//   	return factory
// });


// myApp.controller('questionsController', function ($scope, $location, questionFactory){
    	
// 	$scope.questions;

// 	questionFactory.getQuestions(function(data){
// 		$scope.questions = data;
// 	})

// 	$scope.addQuestion = function(newQuestion){
// 		questionFactory.addQuestion($scope.newQuestion, function(data){
// 			$scope.question = data;
// 		})
// 	}

// 	$scope.showQuestion = function(question_id, callback){
// 		console.log("inside the showQuestion controller", question_id);
// 		questionFactory.showQuestion(question_id, function(data){
// 		})
// 	}

// 	$scope.addAnswer = function(question_id, callback){
// 		questionFactory.showQuestion(question_id, function(data){
// 		})
// 	}			
// })

// myApp.controller('displayController', function ($scope, $location, questionFactory){
	
// 	$scope.display_question;

// 	questionFactory.displayQuestion(function(data){
// 		$scope.display_question = data;
// 	})
	


