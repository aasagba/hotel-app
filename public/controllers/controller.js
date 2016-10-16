var myApp = angular.module('myApp',['angularUtils.directives.dirPagination']);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("AppCtrl initialised");
    $scope.results = [];
    $scope.resultsCount = 0;
    $scope.filterBy = {field: "Title"};
    $scope.query = "";
    $scope.rating = "Choose a rating";
    $scope.ratingVal = "";

    $scope.getHotels = function () {
        $http.get('/hotels').success(function(response) {
            console.log(response);
            $scope.results = response.Establishments;
            $scope.resultsCount = $scope.results.length;
        });
    }
    $scope.getHotels();

    $scope.remove = function(item){

        console.log(item);
        for(var i = $scope.results.length - 1; i >= 0; i--){
            //console.log($scope.results[i].Stars);
            if($scope.results[i].Stars != item){
                console.log("match: "+$scope.results[i]);

                    $scope.results.splice(i,1);

            }
        }
        console.log($scope.results);
        console.log($scope.results.length);
    }

    $scope.search = function (row) {
       // console.log("$scope.ratingVal: "+$scope.ratingVal);
        //console.log("row.Stars: " + row.Stars);
        //console.log(row.Stars == ($scope.ratingVal || ''));

        return (($scope.ratingVal == "" || row.Stars == ($scope.ratingVal || '')) &&
        ($scope.query == "" || row.Name.includes($scope.query || '')));
    };
}]);