var myApp = angular.module('myApp', ['ngRoute']);
//  use the config method to set up routing:
myApp.config(function ($routeProvider) {
	$routeProvider
	.when('/',{
	    templateUrl: 'partials/main.html'
	})
	.when('/post/:post_id',{
	    templateUrl: 'partials/post.html'
	    // controller: 'editController'
	})
	.when('/about',{
	    templateUrl: 'partials/about.html'
	})
	.when('/archive',{
	    templateUrl: 'partials/archive.html'
	})
	.when('/admin',{
	    templateUrl: 'partials/admin.html'
	})
	.when('/manage',{
	    templateUrl: 'partials/managePosts.html'
	})
	.when('/add_post',{
	    templateUrl: 'partials/add_post.html'
	})
	.when('/edit_post/:post_id',{
	    templateUrl: 'partials/edit_post.html'
	})
	.otherwise({
	  	redirectTo: '#'
	});
})

///// Posts  ///////////////////////////////////////////

myApp.factory('postFactory', function ($http){
	var posts = [];
	var factory = {};

	factory.getPosts = function(callback){
  		$http.get('/post/show').success(function(output) {
        	callback(output);  
      	})
  	}

  	factory.addPost = function(info, callback){
  		console.log("info in factory", info);
  		$http.post('/post/add', {title: info.title, content: info.content, tags: info.tags, categories: info.categories}).success(function(output) {
          callback();  
      	})
  	}

  	 factory.displayPost = function(post_id, callback){
  		console.log("info in factory", post_id);
  		$http.post('/post/get_post', {_id: post_id}).success(function(output) {
          callback(output);  
      	})
  	}

	return factory;
})

myApp.controller('postController', function ($scope, $location, postFactory){
	$scope.posts = [];
	$scope.single_post;

	postFactory.getPosts(function (data){
		$scope.posts = data;
		console.log("$scope.posts", $scope.posts);
	})

	$scope.addPost = function(info, callback){
		console.log("info to controller", info)
		postFactory.addPost($scope.newPost, function (){
		})
	}	

	$scope.displayPost = function(post_id, callback){
		//console.log("info to controller", post_id)
		postFactory.displayPost(post_id, function (data){
			$scope.single_post = data;
			console.log("$scope.single_post", $scope.single_post);
			$location.path('/post/:post_id').search({single_post: data});
		})
	}

	$scope.editPost = function(post_id, callback){
		console.log("info to controller", post_id)
		postFactory.displayPost(post_id, function (data){
			$scope.single_post = data;
			console.log("$scope.single_post", $scope.single_post);
			$location.path('/edit_post/:post_id').search({single_post: data});
		})
	}
})

myApp.controller('displayController', function ($scope, $location, $routeParams, postFactory){
	$scope.single_post;

	console.log("$routeParams", $routeParams.single_post);

	$scope.single_post = $routeParams.single_post;

	$scope.displayPost = function(post_id, callback){
		console.log("info to controller", post_id)
		postFactory.displayPost(post_id, function (data){
			$scope.single_post = data;
			console.log("$scope.single_post", $scope.single_post);
		})
	}
})

myApp.controller('editController', function ($scope, $location, $routeParams, postFactory){
	$scope.single_post;

	console.log("$routeParams", $routeParams.single_post);
	$scope.single_post = $routeParams.single_post;

	$scope.displayPost = function(post_id, callback){
		console.log("info to controller", post_id)
		postFactory.displayPost(post_id, function (data){
			$scope.single_post = data;
			console.log("$scope.single_post", $scope.single_post);
		})
	}

	$scope.editPost = function(single_post, callback){
		console.log("info to controller", single_post);
		// postFactory.displayPost(post_id, function (data){
		// 	$scope.single_post = data;
		// 	console.log("$scope.single_post", $scope.single_post);
		// })
	}

})
