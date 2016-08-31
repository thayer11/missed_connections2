var app = angular.module('missedconnections', ['ngRoute',])
	.controller('ProfileController', ProfileController);

console.log("angular is good");

// ROUTES
app.config(function($routeProvider, $httpProvider){
  	$httpProvider.defaults.withCredentials = true;
    $routeProvider
    .when('/', {
    templateUrl: '/views/home.html',
    })
    .when('/profile', { 
    templateUrl: '/views/profile.html',
    controller: 'ProfileController',
   	})
    .when('/messages', {
    templateUrl: '/views/messages.html',
    controller: 'MessagesIndexController',
    })
    })

ProfileController.$inject = ['$scope','$http'];
	function ProfileController($scope, $http){
		$http.get('/api/profile')
		.then(function(response){
        $scope.user = response.data;
        console.log($scope.user); 
    });
}

MessagesIndexController.$inject = ['$scope','$http'];
    function MessagesIndexController($scope, $http){
        $scope.saveMessage = function() {
            $http.post('/api/messages', {test: 'This is thest data'})
            .then(function(response){
                console.log(response)
            })
        } 
}

 


