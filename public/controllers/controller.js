var myApp = angular.module('myApp',['angularUtils.directives.dirPagination']);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("AppCtrl initialised");
    $scope.results = [];
    $scope.resultsCount = 0;
    $scope.filterBy = {field: "Title"};

    $scope.getHotels = function () {
        $http.get('/hotels').success(function(response) {
            console.log(response);
            $scope.results = response.Establishments;
            $scope.resultsCount = $scope.results.length;
        });
    }
    $scope.getHotels();
}]);