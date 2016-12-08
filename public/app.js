var app = angular.module('meannote', ['ngRoute', 'ngCookies', 'toastr']);

app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
    .when('/', {
        templateUrl: '/views/login.view.html',
        controller: 'LoginCtrl'
    })
    .when('/home', {
        templateUrl: '/views/home.view.html',
        controller: 'HomeCtrl'
    })
    .when('/signup', {
        templateUrl: '/views/signup.view.html',
        controller: 'SignupCtrl'
    })
    .otherwise({
        redirectTo: '/home'
    })

}]);

app.run(['$rootScope', '$cookies', function ($rootScope, $cookies) {

    if ($cookies.get('token') && $cookies.get('currentUser')) {
        $rootScope.token = $cookies.get('token');
        $rootScope.currentUser = $cookies.get('currentUser');
    }

}]);