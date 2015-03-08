var myApp = angular.module('myApp', ['ngRoute']);
//  use the config method to set up routing:
myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
        templateUrl: 'partials/home.html'
    })
    .when('/add_question',{
        templateUrl: 'partials/add_question.html'
    })
    .when('/submit_question',{
        templateUrl: 'partials/home.html'
    })
    .when('/show/:question_id',{
        templateUrl: 'partials/show_question.html'
    })
    .when('/answer/:question_id',{
        templateUrl: 'partials/add_answer.html'
    })
    .when('/answer/:question_id',{
        templateUrl: 'partials/add_answer.html'
    })
    .otherwise({
    	redirectTo: '/'
    });
});
	var show_question;
	var add_answer_id;
	var topic_id;

myApp.factory('questionFactory', function ($http) {
	var questions;
	var factory = {};
	var default_likes = 0

	factory.getQuestions = function(callback){
		//console.log("in the get questions factory");
		$http.get('/question/get').success(function(output) {
			//console.log("output in the factory", output);
        	questions = output;
        	callback(questions);
	    })
	}
		
	factory.addQuestion = function(info, callback){
		// info.likes = default_likes;
		//console.log("in add question factory", info);
  		$http.post("/question/add", info).success(function(output) {
  			alert("you have added an question successfully!");
	    	//console.log("succes back to factory", output);
	    	topic_id = output._id
	    	//console.log("topic_id in get factory", topic_id)
	     	callback(output);  
      	})
  	}
  	factory.showQuestion = function(info, callback){
		show_question = info;
		console.log("adding the question id to the factory", show_question);
  		// $http.post("/question/add", info).success(function(output) {
	   //  	//console.log("succes back to factory", output);
	   //  	topic_id = output._id
	   //  	//console.log("topic_id in get factory", topic_id)
	   //   	callback(output);  
    //   	})
  	}
  	factory.displayQuestion = function(callback){
  		console.log("displayQuestion factory, this question data", show_question)
  		$http.post("/question/display_question", {id: show_question}).success(function(output) {
	    	console.log("succes back to factory", output);
	    	topic_id = output._id
	    	//console.log("topic_id in get factory", topic_id)
	     	callback(output);  
      	})
  	}
  	factory.newAnswer = function(info, callback){
  		info._id = topic_id;
  		info.likes = default_likes;
  		console.log("inside the newAnswer controller process:", info);
  		$http.post("/question/new_answer", {id: info._id, likes: info.likes, answer: info.answer, details: info.details, user: info.user}).success(function(output) {
	    	console.log("succes back to factory", output);
	     	callback(output);  
      	})
  	}
  	factory.addLike = function(info, callback){
  		console.log("in the addLike factory answer id", info)
  		console.log("in the addLike factory this is the question id", topic_id)
  		$http.post("/question/add_like", {topic_id: topic_id, answer_id: info}).success(function(output) {
	    	console.log("succes back to factory", output);
	    	//topic_id = output._id
	    	//console.log("topic_id in get factory", topic_id)
	     	callback(output);  
      	})
  	}
  	// factory.addAnswer = function(info, callback){
  	// 	console.log("addAnswer factory", info);
  	// 	add_answer_id = info;
  	// 	console.log("set the variable", add_answer_id);
  	// 	$http.post("/question/display_question", {id: add_answer_id}).success(function(output) {
	  //   	console.log("succes back to factory", output);
	  //   	//topic_id = output._id
	  //   	//console.log("topic_id in get factory", topic_id)
	  //    	callback(output);  
   //    	})
  	// }

  	return factory
});


myApp.controller('questionsController', function ($scope, $location, questionFactory){
    	
	$scope.questions;

	questionFactory.getQuestions(function(data){
		$scope.questions = data;
		console.log($scope.questions);
	})

	$scope.addQuestion = function(newQuestion){
		questionFactory.addQuestion($scope.newQuestion, function(data){
			$scope.question = data;
		})
	}

	// put the question id into the factory
	$scope.showQuestion = function(question_id, callback){
		console.log("inside the showQuestion controller", question_id);
		questionFactory.showQuestion(question_id, function(data){
			//$scope.display_question = data;
		})
	}

	$scope.addAnswer = function(question_id, callback){
		console.log("inside the addAnswer controller", question_id);
		questionFactory.showQuestion(question_id, function(data){
			//$scope.display_question = data;
		})
	}			
})

myApp.controller('displayController', function ($scope, $location, questionFactory){
	
	$scope.display_question;

	questionFactory.displayQuestion(function(data){
		$scope.display_question = data;
		console.log("$scope.display_question", $scope.display_question);
	})
	
	$scope.newAnswer = function(addAnswer, callback){
		console.log("inside the newAnswer controller", addAnswer);
		questionFactory.newAnswer(addAnswer, function(data){
			//$scope.display_question = data;
		})
	}

	$scope.addLike = function(answer_id, callback){
		console.log("inside the addLike controller, update for this answer", answer_id);
		questionFactory.addLike(answer_id, function(data){
			//$scope.display_question = data;
		})
	}			
})
