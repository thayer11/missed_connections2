var app = angular.module('missedconnections', ['ngRoute',])
	.controller('ProfileController', ProfileController)
    .controller('MessagesIndexController', MessagesIndexController)
    .controller('MessagesPostController', MessagesPostController)
    .controller('ResponsePostController', ResponsePostController)
    .controller('ResponseIndexController', ResponseIndexController);

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
    .when('/messages/index',{
    templateUrl: '/views/messageIndex.html',
    controller: 'ResponsePostController',
    })
    // .when('/profile',{
    // templateUrl: '/views/profile.html',
    // controller: 'ResponseIndexController',
    // })

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
            window.location = "#/messages/index"
            })
        } 
}

MessagesIndexController.$inject = ['$scope','$http'];
    function MessagesIndexController($scope, $http){
        $http.get('/api/messages')
        .then(function(response){
            console.log(response)
            $scope.messages = response.data.reverse(); 
            console.log($scope.messages);
    });
}

ResponsePostController.$inject = ['$scope','$http'];
    function ResponsePostController($scope, $http){
        $scope.newResponse={};
        $scope.saveResponse = function(message) {
            $scope.newResponse.responded_to = message;
            console.log('message is: ');
            console.dir(message);
            $http.post('/api/response', $scope.newResponse)
            .then(function(response){
                console.log(response)
            window.location = "#/profile"
            })
        } 
}

ResponseIndexController.$inject = ['$scope','$http'];
    function ResponseIndexController($scope, $http){
        console.log("ResponseIndexController");
        $http.get('/api/response')
        .then(function(response){
            console.log(response)
            $scope.responses = response.data.reverse(); 
            console.log($scope.responses);
    });
}
 


