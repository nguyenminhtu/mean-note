angular.module('meannote')

    .controller('HomeCtrl', ['$scope', '$http', '$location', '$rootScope', '$cookies', 'toastr', function($scope, $http, $location, $rootScope, $cookies, toastr) {

        if (!$cookies.get('token') || !$cookies.get('currentUser')) {
            $location.path('/');
        }

        function getNote() {
            $http.get('/api/notes',
                {
                    headers: {
                        'author': $rootScope.token
                    }
                }).success(function(data) {
                    $scope.notes = data;
                });
        }

        $scope.addNote = function() {
            $http.post('/api/notes/add',
                { text: $scope.newNote },
                {
                    headers: {
                        'author': $rootScope.token
                    }
                }).success(function(data) {
                    toastr.success('Note added.', 'Success', {
                        closeButton: true
                    });
                    getNote();
                    $scope.newNote = '';
                });
        }

        $scope.removeNote = function(note) {
            if (confirm("Are you sure want to delete this note ?")) {
                $http.post('/api/notes/remove', { note: note }).success(function(data) {
                    toastr.success('Note deleted.', 'Success', {
                        closeButton: true
                    });
                    getNote();
                });
            }
        }

        $scope.saveNote = function(note) {
            var id = note._id;
            var text = document.getElementById(id).value;
            $http.post('/api/notes/edit/' + note._id, { text: text }).success(function(data) {
                if (data === 'ok') {
                    $scope.editMode = false;
                    toastr.success('Note updated.', 'Success', {
                        closeButton: true
                    });
                    getNote();
                }
            });
        }

        getNote();

        $scope.logout = function() {
            var cookies = $cookies.getAll();
            angular.forEach(cookies, function(v, k) {
                $cookies.remove(k);
            });
            $rootScope.token = null;
            $rootScope.currentUser = null;
            $location.path('/');
        }

    }]);