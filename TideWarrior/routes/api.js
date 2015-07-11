var express = require('express');
var router = express.Router();

var config = require('../config.js');
var fs = require('fs');

/* This provides a sort of api for us to pass data from the
 * backend to the front end (and vice versa), without caring
 * about how the data is stored
 * The beauty of this is, this code will definately change very soon,
 * when we start using a database or whatever we go with, but the front
 * end doesn't have to, as long as we keep the response data similar
 */

 router.get('/places/:filetype', function(req, res, next) {
 	var apiResponse = {};
	// we might want to extend this to also serve xml or whatever
	if (req.params.filetype.toLowerCase() == 'json') {
		apiResponse.results = [];
		var places_dir = process.env.PWD + '/places/';
		/* right now, it just reads all the files in the
		 * places directory and makes a response from the necessary fields
		 * this is just here for demo right now
		 * we need to change this
		 */
		 fs.readdir(places_dir, function(err, files){
		 	if (err) {
		 		apiResponse.responseStatus = "error";
		 		apiResponse.errorMessage = "error accessing database";
		 		res.json(apiResponse);
		 		return;
		 	}

		 	var semaphore = 0;
		 	apiResponse.responseStatus = "success";
		 	files.forEach(function(file) {
		 		++semaphore;
		 		fs.readFile(places_dir+file,'utf8',function(err, data){
		 			--semaphore;
		 			if (!err) {
		 				var entry= {};
		 				entry.name = (file.charAt(0).toUpperCase() +
		 					file.slice(1, -5)).replace("_"," ");
		 				var jsonObj = JSON.parse(data);
		 				entry.places = [];
		 				_.each(jsonObj.results, function(info) {
		 					var useful_info = {};
		 					useful_info.latitude = info.geometry.location.lat;
		 					useful_info.longitude = info.geometry.location.lng;
		 					useful_info.name = info.name;
		 					useful_info.tags = info.types;
		 					useful_info.address = info.vicinity;
		 					entry.places.push(useful_info);
		 				});
		 				apiResponse.results.push(entry);
		 			}
		 			if (semaphore === 0) {
		 				res.json(apiResponse);
		 			}
		 		});
		 	});
		 });
	}
	else {
		apiResponse.responseStatus = "error";
		apiResponse.errorMessage = "requested data type not supported";
		res.json(apiResponse);
	}
});

router.get('/events/:filetype', function(req, res, next) {
	/* similar to the places api. Just using a randomly generated data
	*  well.... not so random
	*/
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

router.get('/place/:placetype/:filetype', function(req, res, next) {
	var apiResponse = {};
	// we might want to extend this to also serve xml or whatever
	if (req.params.filetype.toLowerCase() == 'json') {
		apiResponse.results = {};
		var places_dir = process.env.PWD + '/places/';
		/* right now, it just reads all the files in the
		 * places directory and makes a response from the necessary fields
		 * this is just here for demo right now
		 * we need to change this
		 */
		 fs.readFile(places_dir+req.params.placetype+".json",'utf8',function(err, data){
		 	if (!err) {
		 		var results = apiResponse.results;
		 		results.name = req.params.placetype;
		 		var jsonObj = JSON.parse(data);
		 		results.places = [];
		 		_.each(jsonObj.results, function(info) {
		 			var useful_info = {};
		 			useful_info.latitude = info.geometry.location.lat;
		 			useful_info.longitude = info.geometry.location.lng;
		 			useful_info.name = info.name;
		 			useful_info.tags = info.types;
		 			useful_info.address = info.vicinity;
		 			results.places.push(useful_info);
		 		});
			 	res.json(apiResponse);
		 	}
		 	else {
				apiResponse.responseStatus = "error";
				apiResponse.errorMessage = "requested place type not supported";
				res.json(apiResponse);
			}
		 });
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