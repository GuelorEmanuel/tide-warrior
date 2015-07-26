// This is not a redeclaration. Just referencing the mainApp module
var mainApp = angular.module('mainApp');

/* On initialization, this controller invokes the PlacesService
 * function to get all the available categories from the server, to populate
 * the front end with
 */
mainApp.controller('PlacesController', [
	'$scope',
	'PlacesService',
	function($scope, PlacesService) {
		$scope.getAllCategories = function() {
			PlacesService.getAllCategories(function(err, data) {
				if (err) {
					$scope.error = true;
					$scope.errorMessage = err.errorMessage;
				}
				else {
					$scope.categories = data;
				}
			});
		};

		$scope.getPlacesForCategory = function(categoryId) {
			PlacesService.getPlacesByCategory(categoryId, function(err, data) {
				if (err) {
					$scope.error = true;
					$scope.errorMessage = err.errorMessage;
				}
				else {
					$scope.places = data;
				}
			});
		};

		$scope.getCoordinates = function(points) {
			return points.match(/\d+\.\d+/g);
		};

		// first get all categories once loaded
		$scope.getAllCategories();
	}
]);