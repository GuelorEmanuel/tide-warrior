// This is not a redeclaration. Just referencing the mainApp module
var mainApp = angular.module('mainApp');

/* On initialization, this controller invokes the PlacesService
 * function to get all the available places from the server, to populate
 * the front end with
 */
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