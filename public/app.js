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
        .when('/ngsocial', {
            templateUrl: '/views/login.view.html',
            controller: 'LoginCtrl'
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

    window.fbAsyncInit = function () {
        FB.init({
            appId: '208626509587992',
            xfbml: true,
            version: 'v2.8'
        });
        FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    } (document, 'script', 'facebook-jssdk'));

}]);