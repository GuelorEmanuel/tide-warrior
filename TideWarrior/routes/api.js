var express = require('express');
var router = express.Router();

var config = require('../config.js');
var fs = require('fs');
var _ = require('underscore');

router.get('/places/:filetype', function(req, res, next) {
	var apiResponse = {};
	if (req.params.filetype.toLowerCase() == 'json') {
		apiResponse.results = [];
		var places_dir = process.env.PWD + '/places/';
		fs.readdir(places_dir, function(err, files){
		    if (err) {
		    	apiResponse.responseStatus = "error";
				apiResponse.errorMessage = "error accessing database";
				res.json(apiResponse);
				return;
		    }

		    var semaphore = 0;
			apiResponse.responseStatus = "success";
		    _.each(files, function(file){
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
						_.each(eventsObj.randomEvents, function(randEvent) {
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