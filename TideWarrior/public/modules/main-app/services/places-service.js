// This is not a redeclaration. Just referencing the mainApp module
var mainApp = angular.module('mainApp');

/* This is the service (or factory) that takes care of getting
 * the places from the backend server using the api the server provides
 */
mainApp.factory('PlacesService', [
	'$http',
	function($http) {
		var service = {};

		/* This function is part of the service
		 * Specifically, it gets all the available place categories
		 * from the server, using the api
		 * Parameter is a callback to invoke once all the categories
		 * have been gotten or an error occured
		 * callback signature is callback(err, data)
		 */
		service.getAllCategories = function(callback) {
			$http.get('/api/places/categories')
				.error(function() {
					callback({errorMessage: "no response from server"});
				})
				.success(function(data) {
					// if there is no data or the response status in the data says error
					if (!data || data.responseStatus == "error") {
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