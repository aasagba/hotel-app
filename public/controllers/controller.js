var myApp = angular.module('myApp',['angularUtils.directives.dirPagination','rzModule']);

myApp.controller('AppCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {

    console.log("AppCtrl initialised");
    $scope.results = [];
    $scope.resultsCount = 0;
    $scope.query = "";
    $scope.rating = "Choose a rating";
    $scope.ratingVal = 0;
    $scope.starRatings = [1,2,3,4,5];
    $scope.UserRating = 0;
    $scope.sliderVisible = false;
    $scope.minCostSlider = {
        value: 0,
        options: {
            floor: 0,
            ceil: 500
        }
    };
    $scope.minUserRating = {
        value: 0,
        options: {
            floor: 0,
            ceil: 10
        }
    };

    $scope.refreshSlider = function () {
        $timeout(function () {
            $scope.$broadcast('rzSliderForceRender');
        });
    };

    // get route to load hotel data
    $scope.getHotels = function () {
        $http.get('/hotels').success(function(response) {
            //console.log(response);
            $scope.results = response.Establishments;
            $scope.resultsCount = $scope.results.length;

            $scope.minCostSlider.options.ceil = findmax($scope.results);
            $scope.refreshSlider();
            $scope.sliderVisible = true;
        });
    }

    $scope.getHotels();

    $scope.filter = function (row) {
        return (($scope.ratingVal == "" || row.Stars == ($scope.ratingVal || '')) &&
                ($scope.query.toLowerCase() == "" || row.Name.toLowerCase().includes($scope.query.toLowerCase() || '')) &&
                ($scope.minUserRating.value == 0 || row.UserRating >= $scope.minUserRating.value) &&
                ($scope.minCostSlider.value == 0 || row.MinCost >= $scope.minCostSlider.value));
    };

    function findmax(array) {
        var max = 0,
            a = array.length,
            counter

        for (counter=0;counter<a;counter++) {
            if (array[counter].MinCost > max) {
                max = array[counter].MinCost
            }
        }
        return max
    }

}]);