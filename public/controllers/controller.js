var myApp = angular.module('myApp',[]);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("AppCtrl initialised");
    $scope.results = [];

    $scope.getHotels = function () {
        $http.get('/hotels').success(function(response) {
            console.log(response);
            $scope.results = response;
        });
    }
}]);