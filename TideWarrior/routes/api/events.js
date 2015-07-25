var express = require('express');
var router = express.Router();

var config = require('../../config');
var fs = require('fs');

router.get('/events', function(req, res, next) {
	/* similar to the places api */
	var apiResponse = {};
	if (req.params.filetype.toLowerCase() == 'json') {
		apiResponse.responseStatus = "success";
		apiResponse.results = [];
		var events_file = process.env.PWD + '/events.json';
		var bar_places_file = process.env.PWD + '/places/bar.json';
		fs.readFile(bar_places_file, 'utf8', function(err, bar_data) {
			if (!err) {
				fs.readFile(events_file, 'utf8', function(err, event_data) {
					if (!err) {
						apiResponse.responseStatus = "success";
						var eventsObj = JSON.parse(event_data);
						var barList = JSON.parse(bar_data).results;
						eventsObj.randomEvents.forEach(function(randEvent) {
							var entry = randEvent;
							var randBar = _.sample(barList)
							entry.latitude = randBar.geometry.location.lat;
							entry.longitude = randBar.geometry.location.lng;
							apiResponse.results.push(entry);
						})
						res.json(apiResponse);
					}
				});
			}
		})
	}
	else {
		apiResponse.responseStatus = "error";
		apiResponse.errorMessage = "requested data type not supported";
		res.json(apiResponse);
	}
});

router.all('*', function(req, res, next) {
	res.json({
		responseStatus: "error",
		errorMessage: "invalid request"
	});
});

module.exports = router;