// This is the actual declaration of the mainApp module
var mainApp = angular.module('mainApp', [
	'ngRoute'
]);

/* This takes care of the routing on the homepage
 * by loading the appropriate controller and view
 * on each subpage
 */
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