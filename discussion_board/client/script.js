var myApp = angular.module('myApp', ['ngRoute']);
//  use the config method to set up routing:
myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
        templateUrl: 'partials/home.html'
    })
    .when('/dashboard',{
        templateUrl: 'partials/dashboard.html'
    })
    .when('/topic',{
        templateUrl: 'partials/topic.html'
    })
    .when('/user',{
        templateUrl: 'partials/user.html'
    })
    .when('/topic/:topic_id',{
        templateUrl: 'partials/topic.html'
    })
    .when('/add_post/:topic_id',{
        templateUrl: 'partials/topic.html'
    })
    .otherwise({
    	redirectTo: '/'
    });
});

var new_user;

myApp.factory('topicFactory', function ($http) {
	var user;
	var factory = {};

	factory.displayUser = function(info, callback){
		user = info;
		callback(user);
	}

	factory.getUser = function(callback){
		//console.log("made it to the getUser factory.  User=", user);
		callback(user);
	}


	factory.getTopics = function(callback){
		$http.get('/topic/show').success(function(output) {
			console.log("made it back to the factory", output);
        	callback(output);  
      	})
	}

	factory.addTopic = function(info, callback){
  		$http.post('/topic/add', info).success(function(output) {
	    	//console.log("succes back to factory", output);
	     	callback(output);  
      	})
  	}
		
	factory.showTopic = function(info, callback){
		//console.log("in factory topic_id", info);
  		$http.post('/topic/show_topic', {_id: info}).success(function(output) {
	    	//console.log("succes back to factory", output);
	     	callback(output);  
      	})
  	}	
		
  	 factory.addPost = function(info, callback){
  		console.log("info in factory", info);
  		$http.post('/post/add', {title: info.title, content: info.content, tags: info.tags, categories: info.categories}).success(function(output) {
          callback();  
      	})
  	}
  	return factory
});


myApp.controller('topicController', function ($scope, $location, topicFactory){
    	
	$scope.topic;
	$scope.user_name;
	$scope.topics;
	$scope.single_topic;
	
	$scope.displayUser = function(newUser){
		topicFactory.displayUser($scope.newUser, function(data){
			$scope.user_name = data;
			//console.log("$scope.user_name in the intailizer", $scope.user_name)
			new_user = newUser;
		})
	}

	topicFactory.getUser(function(data){
		$scope.user_name = data;
		//console.log("$scope.user_name in the getUser", $scope.user_name);
	})

	topicFactory.getTopics(function(data){
		$scope.topics = data
		console.log("$scope.topics", $scope.topics);
	})
	
	$scope.addTopic = function(newTopic){
		//console.log("newTopic", newTopic);
		newTopic.user_name = new_user;
		// console.log("$scope.newTopic", $scope.newTopic);
		topicFactory.addTopic($scope.newTopic, function(data){
			$scope.topic = data;
			//console.log("$scope.topic", $scope.topic);
		})
	}		

	$scope.showTopic = function(topic_id, callback){
		console.log("in controller topic_id", topic_id);
		topicFactory.showTopic(topic_id, function(data){
			$scope.single_topic = data
			console.log("$scope.single_topic", $scope.single_topic);
			$location.path('/topic/:topic_id').search({single_topic: data});
		})
	}
})

myApp.controller('displayTopicController', function($scope, $location, $routeParams, topicFactory){
	$scope.single_topic;
	$scope.user_name;

	console.log("$routeParams", $routeParams.single_topic);
	$scope.single_topic = $routeParams.single_topic;
	//console.log("$scope.single_topic just inside the displayTopicController", $scope.single_topic);

	topicFactory.getUser(function(data){
		console.log("$scope.user_name", $scope.user_name);
		$scope.user_name = data;
		//console.log("$scope.user_name in the getUser", $scope.user_name);
	})

	$scope.addPost = function(newPost, callback){
		console.log("newPost to controller", newPost);
		newPost.user_name = $scope.user_name;

		topicFactory.addPost(newPost, function (data){
			//$scope.single_post = data;
			//console.log("$scope.single_post", $scope.single_post);
		})
	}

})