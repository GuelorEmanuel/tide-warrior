// This is not a redeclaration. Just referencing the mainApp module
var mainApp = angular.module('mainApp');

mainApp.factory('PlacesService', [
	'$http',
	function($http) {
		var service = {};

		service.getAllPlaces = function(callback) {
			$http.get('/api/places/json')
				.error(function() {
					callback({errorMessage: "no response from server"});
				})
				.success(function(data) {
					if (!data || data.responseStatus == "error" || !data.results.length) {
						callback({errorMessage: data.errorMessage ||
							"empty response from server" });
					}
					else {
						callback(null, data.results);
					}
				});
		}

		return service;
	}
]);