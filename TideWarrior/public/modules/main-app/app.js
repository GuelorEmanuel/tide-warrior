// This is the actual declaration of the mainApp module
var mainApp = angular.module('mainApp', [
	'ngRoute'
]);

mainApp.config(['$routeProvider',
	function($routeProvider) {
    	$routeProvider.
      		when('/', {
        		templateUrl: 'partials/home.html',
        		controller: 'HomepageController'
      		}).
      		when('/events', {
        		templateUrl: 'partials/events.html',
        		controller: 'EventsController'
      		}).
      		when('/places', {
        		templateUrl: 'partials/places.html',
        		controller: 'PlacesController'
      		}).
      		otherwise({
        		redirectTo: '/'
      		});
    }
]);