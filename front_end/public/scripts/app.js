var app = angular.module('missedconnections', ['ngRoute',])
	.controller('ProfileController', ProfileController)
    .controller('MessagesIndexController', MessagesIndexController)
    .controller('MessagesPostController', MessagesPostController)

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
    templateUrl: '/views/messagePost.html',
    controller: 'MessagesPostController',
    })
    .when('/messages/index',{
    templateUrl: '/views/messageIndex.html',
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

MessagesPostController.$inject = ['$scope','$http'];
    function MessagesPostController($scope, $http){
        $scope.newMessage={};
        $scope.saveMessage = function() {
            $http.post('/api/messages', $scope.newMessage)
            .then(function(response){
                console.log(response)
            })
        } 
}

MessagesIndexController.$inject = ['$scope','$http'];
    function MessagesIndexController($scope, $http){
        $http.get('/api/messages')
        .then(function(response){
            console.log(response)
            $scope.messages = response.data; 
            console.log($scope.messages);
    });
}
 


