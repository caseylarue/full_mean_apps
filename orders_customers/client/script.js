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
        .when("/edit/:customer_id",{
        	templateUrl: 'partials/edit.html',
        	controller: 'customersController'
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

		factory.getOrders = function(callback){
	  		$http.get('/order/get').success(function(output) {
            	orders = output;
            	callback(orders);
          })
	  	}

	  	factory.addOrder = function(info, callback){
	  		console.log("factory info", info);
	  		$http.post('/order/add', {id: info.customer_id, product: info.product, qty: info.qty}).success(function(output) {
              callback();  
          	})
	  	}

	  	factory.removeOrder = function(info, callback){
	  		$http.post('/order/remove', {order_id: info._id, customer_id: info._customer}).success(function(output) {
              callback();  
          	})
	  	}

	  	return factory;
	})
	


    myApp.controller('ordersController', function ($scope, orderFactory){
    	$scope.orders = [];
    	$scope.customers = [];

    	orderFactory.getCustomers(function (data){
    		$scope.customers = data;
    	})

    	orderFactory.getOrders(function (orders){
    		for(var i=0;  i<orders.length; i++)
				{
					for(index in $scope.customers)
					{
						if($scope.customers[index]._id === orders[i]._customer)
						{
							// console.log("$scope.customers[index]._id", $scope.customers[index]._id);
							// console.log("orders[i]._customer", orders[i]._customer);
							orders[i].customer_name = $scope.customers[index].name;
							//console.log("new order", orders[i]);
						}
					}
				}
    		$scope.orders = orders;
    		console.log("scope orders", $scope.orders);
    	})

    	$scope.addOrder = function(info, callback){
    		//console.log("pass to the controller", info);
    		orderFactory.addOrder($scope.newOrder, function(){
				orderFactory.getOrders(function (orders){
		    		for(var i=0;  i<orders.length; i++)
						{
							for(index in $scope.customers)
							{
								if($scope.customers[index]._id === orders[i]._customer)
								{
									orders[i].customer_name = $scope.customers[index].name;
								}
							}
						}
			    		$scope.orders = orders;
		    		})
    		})
    	}

    	$scope.deleteOrder = function(info, callback){
    		//console.log("pass to the controller", info);
    		orderFactory.removeOrder(info, function(){

				orderFactory.getOrders(function (orders){
		    		for(var i=0;  i<orders.length; i++)
						{
							for(index in $scope.customers)
							{
								if($scope.customers[index]._id === orders[i]._customer)
								{
									orders[i].customer_name = $scope.customers[index].name;
								}
							}
						}
			    		$scope.orders = orders;
		    		})
    		})
    	}
   })

////////////////////////////////////////////////////////////
///// Customer  ///////////////////////////////////////////
////////////////////////////////////////////////////////////

    myApp.factory('customerFactory', function ($http) {

    	var orders = [];
		var customers = [];
		var factory = {};
  		
	  	factory.getCustomers = function (callback){
	  		$http.get('/customer/get').success(function(output) {
            	customers = output;
            	callback(customers);
          })
	  	}

	  	factory.getOrders = function(callback){
	  		$http.get('/order/get').success(function(output) {
            	orders = output;
            	callback(orders);
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
    	
    	$scope.orders = [];
    	$scope.customers = [];
    	$scope.display_customer;

    	customerFactory.getCustomers(function (customers){
    		customerFactory.getOrders(function (orders){
    				for(var i=0; i<customers.length; i++){
    					customers[i].order_count = 0;
    					for(index in orders){
    						if(customers[i]._id === orders[index]._customer){
    							customers[i].order_count++;
    						}
    					}
    				}
    			})
    		$scope.customers = customers;
    		console.log("$scope.customers", $scope.customers);
    	})

    	$scope.addCustomer = function(name){
			customerFactory.addCustomer($scope.newCustomer, function(){
				customerFactory.getCustomers(function (customers){
    				customerFactory.getOrders(function (orders){
	    				for(var i=0; i<customers.length; i++){
	    					customers[i].order_count = 0;
	    					for(index in orders){
	    						if(customers[i]._id === orders[index]._customer){
	    							customers[i].order_count++;
	    						}
	    					}
	    				}
	    				$scope.customers = customers;
    				})
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
    		console.log("display this customer", customer);
    		customerFactory.displayCustomer(customer, function(data){
					console.log("single customer data", data);
    				$scope.display_customer = data;
    				console.log("$scope.display_customer", $scope.display_customer);
    		})
    	}
    	
    })


