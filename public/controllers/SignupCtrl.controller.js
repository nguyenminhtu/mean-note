angular.module('meannote')

    .controller('SignupCtrl', ['$scope', '$http', '$location', '$cookies', function ($scope, $http, $location, $cookies) {

        if($cookies.get('token') || $cookies.get('currentUser')){
            $location.path('/home');
        }

        $scope.signup = function () {
            var newUser = {
                username: $scope.username,
                password: $scope.password
            };

            $http.post('/api/users/register', newUser).success(function (data) {
                $cookies.put('userSignup', $scope.username);
                $location.path('/');
            });
        }

        $scope.checkUser = function () {
            var user = document.getElementById('username').value;
            if (user.length < 5) {
                $scope.lengthErr = true;
                $scope.done = false;
            } else {
                $scope.lengthErr = false;
                $http.get('/api/users/check/' + $scope.username).success(function (data) {
                    if (data === 'match') {
                        $scope.error = true;
                        $scope.done = false;
                        $scope.checkuser = false;
                    } else if (data === 'notMatch') {
                        $scope.done = true;
                        $scope.error = false;
                        $scope.checkuser = true;
                    }
                });
            }
        }

    }]);