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
    .when('/add_comment/:topic_id',{
        templateUrl: 'partials/topic.html'
    })
    .otherwise({
    	redirectTo: '/'
    });
});

var new_user;

myApp.factory('topicFactory', function ($http) {
	var user;
	var topic_id;
	var factory = {};

	factory.displayUser = function(info, callback){
		user = info;
		callback(user);
	}

	factory.getUser = function(callback){
		callback(user);
	}

	factory.getTopics = function(callback){
		$http.get('/topic/show').success(function(output) {
        	callback(output);  
      	})
	}

	factory.addTopic = function(info, callback){
  		$http.post('/topic/add', info).success(function(output) {
	     	callback(output);  
      	})
  	}
		
	factory.showTopic = function(info, callback){
		console.log("in show_topic factory", info);
  		$http.post('/topic/show_topic', {_id: info}).success(function(output) {
	    	//console.log("succes back to factory", output);
	    	topic_id = output._id
	    	//console.log("topic_id in get factory", topic_id)
	     	callback(output);  
      	})
  	}	
	
	factory.deleteTopic = function(info, callback){
		console.log("in show_topic factory", info);
		$http.post('/topic/delete_topic', {_id: info}).success(function(output) {
	    	//console.log("succes back to factory", output);
	    	//opic_id = output._id
	    	//console.log("topic_id in get factory", topic_id)
	     	//callback(output);  
      	})
	}

  	factory.addPost = function(info, callback){
  		info._topic = topic_id;
  		info.name = user;
  		console.log("info in factory", info);
  		$http.post('/post/add', info).success(function(output) {
          callback();  
      	})
  	}

  	factory.getPosts = function(callback){
  		$http.post( '/post/get', {topic: topic_id} ).success(function(output) {
     		// console.log("output", output);
     		callback(output);
      	})
  	}

  	factory.addComment = function(info, callback){
  		info.topic_id = topic_id;
  		info.name = user;
  		console.log("sending this factory info to routes", info);
  		$http.post( '/post/add_comment', info ).success(function(output) {
     		console.log("output out of factory", output);
     		callback(output);
      	})
  	}

  	factory.getComments = function(callback){
  		$http.post( '/post/get_comments', {topic: topic_id} ).success(function(output) {
     		console.log("output of comments in factory", output);
     		callback(output);
      	})
  	}

  	factory.show_topic_after_comment = function(callback){
  		$http.post('/topic/show_topic', {_id: topic_id}).success(function(output) {
	     	callback(output);  
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
			new_user = newUser;
		})
	}

	topicFactory.getUser(function(data){
		$scope.user_name = data;
	})

	topicFactory.getTopics(function(data){
		$scope.topics = data
	})
	
	$scope.addTopic = function(newTopic){
		newTopic.user_name = new_user;
		topicFactory.addTopic($scope.newTopic, function(data){
			$scope.topic = data;
		})
	}		

	$scope.showTopic = function(topic_id, callback){
		console.log("show topic in topicController", topic_id);
		topicFactory.showTopic(topic_id, function(data){
			$scope.single_topic = data
			//console.log("$scope.single_topic", $scope.single_topic);
			$location.path('/topic/:topic_id').search({single_topic: data});
		})
	}

	$scope.deleteTopic = function(topic_id, callback){
		console.log("made it to delete topic controller", topic_id);
		topicFactory.deleteTopic(topic_id, function(data){

		})
	}
})

myApp.controller('displayTopicController', function($scope, $location, $routeParams, topicFactory){
	$scope.posts
	$scope.single_topic;
	$scope.user_name;


	//console.log("$routeParams", $routeParams.single_topic);
	//$scope.single_topic = $routeParams.single_topic;
	//console.log("$scope.single_topic just inside the displayTopicController", $scope.single_topic);

	topicFactory.show_topic_after_comment(function(data){
		$scope.single_topic = data;
		console.log("in the displayTopicController $scope.single_topic", $scope.single_topic)
	})


	topicFactory.getUser(function(data){
		$scope.user_name = data;
		//console.log("$scope.user_name", $scope.user_name);
		//console.log("$scope.user_name in the getUser", $scope.user_name);
	})

	topicFactory.getPosts(function(data){
		// alert("hi");
		// console.log("back to controller", data);
		$scope.posts = data;
		console.log("$scope.posts", $scope.posts);
	})

	// topicFactory.getComments(function(data){

	// })

	$scope.addPost = function(newPost, callback){
		// newPost.name = $scope.user_name;
		console.log("newPost to controller", newPost);
		topicFactory.addPost(newPost, function (data){
			//$scope.single_post = data;
			//console.log("$scope.single_post", $scope.single_post);
		})
	}

	$scope.addComment = function(newPost, callback){
		// newPost.name = $scope.user_name;
		console.log("newPost to controller", newPost);
		topicFactory.addPost(newPost, function (data){
			//$scope.single_post = data;
			//console.log("$scope.single_post", $scope.single_post);
		})

	}

	$scope.addComment = function(newPost, callback){
		// newPost.name = $scope.user_name;
		console.log("newComment to controller", newPost);
		topicFactory.addComment(newPost, function (data){
			//$scope.single_post = data;
			//console.log("$scope.single_post", $scope.single_post);
		})
	}
})