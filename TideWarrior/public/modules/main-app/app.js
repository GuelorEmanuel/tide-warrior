// This is the actual declaration of the mainApp module
var mainApp = angular.module('mainApp', [
	'ngRoute'
]);

mainApp.config(['$routeProvider',
	function($routeProvider) {
    	$routeProvider.
      		when('/', {
        		templateUrl: 'partials/home.html',
        		controller: 'HomepageCtrl'
      		}).
      		when('/events', {
        		templateUrl: 'partials/events.html',
        		controller: 'EventsCtrl'
      		}).
      		when('/places', {
        		templateUrl: 'partials/places.html',
        		controller: 'PlacesCtrl'
      		}).
      		otherwise({
        		redirectTo: '/'
      		});
    }
]);