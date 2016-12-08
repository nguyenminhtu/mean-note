angular.module('meannote')

    .controller('LoginCtrl', ['$scope', '$http', '$location', '$rootScope', '$cookies', 'toastr', function ($scope, $http, $location, $rootScope, $cookies, toastr) {

        if($cookies.get('userSignup')){
            $scope.username = $cookies.get('userSignup');
        }

        $scope.login = function () {
            $http.post('/api/users/login', { username: $scope.username, password: $scope.password }).success(function (data) {
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

    }]);