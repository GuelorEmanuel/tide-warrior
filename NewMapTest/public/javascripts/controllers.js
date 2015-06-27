var searchControllers = angular.module('searchControllers',['ngAnimate']);

searchControllers.controller('ListController', ['$scope', '$http', function() {
  //let ask http server to get information from GJASON file.
  $http.get('../../places/accounting.json').success(function(data) {
    //let put it in our model
    $scope.locName = data;
  });
}]);
