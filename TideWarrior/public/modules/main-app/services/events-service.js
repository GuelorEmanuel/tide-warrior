// This is not a redeclaration. Just referencing the mainApp module
var mainApp = angular.module('mainApp');

/* This is very similar to the PlacesServices for now
 * The thought is it might get very different from the places page
 * and will eventually need its own place later on.
 * However, if it continues to be a bunch of repitition of the Places* code,
 * we can refactor and merge the two later
 */
mainApp.factory('EventsService', [
	'$http',
	function($http) {
		var service = {};

		service.getAllEvents = function(callback) {
			$http.get('/api/events/json')
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