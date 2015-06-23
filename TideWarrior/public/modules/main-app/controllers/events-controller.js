// This is not a redeclaration. Just referencing the mainApp module
var mainApp = angular.module('mainApp');

mainApp.controller('EventsController', [
	'$scope',
	'EventsService',
	function($scope, EventsService) {
		EventsService.getAllEvents(function(err, data) {
			if (err) {
				$scope.error = true;
				$scope.errorMessage = err.errorMessage;
			}
			else {
				$scope.events = data;
			}
		});
	}
]);