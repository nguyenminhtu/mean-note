angular.module('meannote')

    .controller('HomeCtrl', ['$scope', '$http', '$location', '$rootScope', '$cookies', 'toastr', function ($scope, $http, $location, $rootScope, $cookies, toastr) {

        if (!$rootScope.currentUser || !$rootScope.token) {
            $location.path('/');
        }

        function getNote() {
            $http.get('/api/notes',
                {headers: {
                        'author': $rootScope.token
                    }
                }).success(function (data) {
                    $scope.notes = data;
                });
        }

        $scope.addNote = function () {
            $http.post('/api/notes/add',
                { text: $scope.newNote },
                {headers: {
                        'author': $rootScope.token
                    }
                }).success(function (data) {
                    getNote();
                    $scope.newNote = '';
                });
        }

        $scope.removeNote = function (note) {
            if (confirm("Are you sure want to delete this note ?")) {
                $http.post('/api/notes/remove', { note: note }).success(function (data) {
                    toastr.success('Note deleted.', 'Success', {
                        closeButton: true
                    });
                    getNote();
                });
            }
        }

        getNote();

        $scope.logout = function () {
            $cookies.remove('token');
            $cookies.remove('currentUser');
            $rootScope.token = null;
            $rootScope.currentUser = null;
            $location.path('/');
        }

    }]);