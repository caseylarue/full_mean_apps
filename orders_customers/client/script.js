// inject the ngRoute dependency in the module.
    var myApp = angular.module('myApp', ['ngRoute']);
    //  use the config method to set up routing:
    myApp.config(function ($routeProvider) {
      $routeProvider
        .when('/',{
            templateUrl: 'partials/view1.html'
        })
        .when('/partial2',{
            templateUrl: 'partials/view2.html'
        })
        .when('/edit',{
        	templateUrl: 'partials/edit.html'
        })
        .otherwise({
          redirectTo: '/'
        });
    });

///// Orders  ///////////////////////////////////////////	
	myApp.factory('orderFactory', function ($http) {
		var orders = [];
		var customers = [];
		var factory = {};


		factory.getCustomers = function (callback){
	  		$http.get('/customer/get').success(function(output) {
            	customers = output;
            	callback(customers);
          })
	  	} 

		// factory.getOrders = function(callback){
	 //  		callback(orders);
	 //  	}

	  	factory.addOrder = function(info, callback){
	  		console.log("info", info);
	  		// $http.post('/order/add', {name: info.name}).success(function(output) {
     //          console.log("succes back to factory", output);
     //          callback();  
     //      	})
	  	}

	  	return factory;
	})
	


    myApp.controller('ordersController', function ($scope, orderFactory){
    	$scope.orders = [];
    	$scope.customers = [];

    	orderFactory.getCustomers(function (data){
    		$scope.customers = data;
    	})

    	// orderFactory.getOrders(function (data){
    	// 	$scope.orders = data;
    	// })

    	$scope.addOrder = function(info, callback){
    		console.log("info", info);
    		// $http.post('/order/add', {name: info.name, qty: info.qty, product: info.product}).success(function(output) {
              //console.log("succes back to factory", output);
           //    callback();  
          	// })
    		// 	console.log($scope.newOrder);
    		// 	orderFactory.addOrder($scope.newOrder, function(data){
			// $scope.orders = data;
	   //  	})
    	}

    	$scope.addCustomer = function(name){
			customerFactory.addCustomer($scope.newCustomer, function(){
				customerFactory.getCustomers(function (data){
    				$scope.customers = data;
    				$scope.newCustomer = {};
    			})
    		})
    	}
   })

////////////////////////////////////////////////////////////
///// Customer  ///////////////////////////////////////////
////////////////////////////////////////////////////////////

    myApp.factory('customerFactory', function ($http) {

		var customers = [];
		var factory = {};
  		
	  	factory.getCustomers = function (callback){
	  		$http.get('/customer/get').success(function(output) {
            	customers = output;
            	callback(customers);
          })
	  	}

	  	factory.addCustomer = function(info, callback){
	  		$http.post('/customer/add', {name: info.name}).success(function(output) {
              //console.log("succes back to factory", output);
              callback();  
          	})
	  	}

	  	factory.removeCustomer = function(info, callback){
	  		$http.post('/customer/remove', {id: info._id}).success(function(output) {
            	callback();
          	})
	  	}

	  	factory.displayCustomer = function(info, callback){
	  		$http.post('/customer/display', {id: info._id}).success(function(output) {
            	//console.log("made it back to factory", output);
            	callback(output);
          	})
	  	}

	  	return factory
	});

	myApp.controller('customersController', function ($scope, customerFactory){
    	
    	$scope.customers = [];
    	$scope.display_customer;


    	customerFactory.getCustomers(function (data){
    		$scope.customers = data;
    		//console.log("customers", $scope.customers);
    	})

    	$scope.addCustomer = function(name){
			customerFactory.addCustomer($scope.newCustomer, function(){
				customerFactory.getCustomers(function (data){
    				$scope.customers = data;
    				$scope.newCustomer = {};
    			})
    		})
    	}		

    	$scope.removeCustomer = function(customer){
    		console.log("customer", customer);
    		customerFactory.removeCustomer(customer, function(){
				customerFactory.getCustomers(function (data){
    				$scope.customers = data;
    			})
    		})
    	}

    	$scope.displayCustomer = function(customer){
    		//console.log("display this customer", customer);
    		customerFactory.displayCustomer(customer, function(data){
					console.log("single customer data", data);
    				$scope.display_customer = data;
    				console.log("$scope.display_customer", $scope.display_customer);
    		})
    	}
    	
    })


