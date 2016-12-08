angular.module('meannote')

    .controller('LoginCtrl', ['$scope', '$http', '$location', '$rootScope', '$cookies', 'toastr', '$window', function($scope, $http, $location, $rootScope, $cookies, toastr, $window) {

        if ($cookies.get('userSignup')) {
            $scope.username = $cookies.get('userSignup');
        }

        if($rootScope.currentUser || $rootScope.token){
            $location.path('/home');
        }

        $scope.login = function() {
            $http.post('/api/users/login', { username: $scope.username, password: $scope.password }).success(function(data) {
                if (data === 'No User Found') {
                    toastr.error('Invalid User', 'Error', {
                        closeButton: true
                    });
                } else if (data === 'Wrong password. Try again!') {
                    toastr.error('Wrong password. Try again!', 'Error', {
                        closeButton: true
                    });
                } else {
                    $cookies.put('token', data.token);
                    $cookies.put('currentUser', $scope.username);
                    $rootScope.token = data.token;
                    $rootScope.currentUser = $scope.username;
                    $cookies.remove('userSignup');
                    $location.path('/home');
                }
            });
        }

        $scope.FBLogin = function() {
            FB.login(function(response) {
                if(response.authResponse) {
                    FB.api('/me', function (response) {
                        var accessToken = FB.getAuthResponse().accessToken;
                        var user = response.name;
                        $cookies.put('token', accessToken);
                        $cookies.put('currentUser', user);
                        $rootScope.currentUser = user;
                        $rootScope.token = accessToken;
                        $window.location.href = '/home';
                    });
                }else{
                    $location.path('/')
                }
            });
        }

    }]);