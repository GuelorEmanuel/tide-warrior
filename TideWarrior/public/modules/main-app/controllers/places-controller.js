// This is not a redeclaration. Just referencing the mainApp module
var mainApp = angular.module('mainApp');

mainApp.controller('PlacesController', [
	'$scope',
	'PlacesService',
	function($scope, PlacesService) {
		PlacesService.getAllPlaces(function(err, data) {
			if (err) {
				$scope.error = true;
				$scope.errorMessage = err.errorMessage;
			}
			else {
				$scope.categories = data;
			}
		});
	}
]);