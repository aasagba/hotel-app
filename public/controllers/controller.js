var myApp = angular.module('myApp',['angularUtils.directives.dirPagination','rzModule']);

myApp.controller('AppCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
    console.log("AppCtrl initialised");
    $scope.results = [];
    $scope.resultsCount = 0;
    $scope.filterBy = {field: "Title"};
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

    $scope.getHotels = function () {
        $http.get('/hotels').success(function(response) {
            console.log(response);
            $scope.results = response.Establishments;
            $scope.resultsCount = $scope.results.length;

            $scope.minCostSlider.options.ceil = findmax($scope.results);
            $scope.refreshSlider();
            $scope.sliderVisible = true;


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
        //console.log("row.MinCost: " + row.MinCost + ", slider: " +  $scope.minCostSlider.value);
        //console.log("type: " + typeof row.MinCost);
       //console.log("mincost less equal to slider: " + row.MinCost <= $scope.minCostSlider.value);
        return (($scope.ratingVal == "" || row.Stars == ($scope.ratingVal || '')) &&
                ($scope.query == "" || row.Name.includes($scope.query || '')) &&
                ($scope.minUserRating.value == 0 || row.UserRating >= $scope.minUserRating.value) &&
                ($scope.minCostSlider.value == 0 || row.MinCost >= $scope.minCostSlider.value));
    };

    function findmax(array)
    {
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