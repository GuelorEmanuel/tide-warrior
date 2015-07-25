var express = require('express');
var router = express.Router();

var config = require('../../config');
var fs = require('fs');
var Place = require('../../models/Place');

router.get('/', function(req, res, next) {
 	var apiResponse = {};
	apiResponse.results = [];
	Place.find(null, function (err, results) {
		if (err) {
			apiResponse.responseStatus = "error";
	 		apiResponse.errorMessage = err.message;
	 		console.log(err.databaseError);
	 		res.json(apiResponse);
		}
		else {
			apiResponse.responseStatus = "success";
			apiResponse.results = results;
			res.json(apiResponse);
		}
	});
});

router.get('/:category', function(req, res, next) {
	var apiResponse = {};
	if (req.params.filetype.toLowerCase() == 'json') {
		apiResponse.results = {};
		var places_dir = process.env.PWD + '/places/';
		/* right now, it just reads all the files in the
		 * places directory and makes a response from the necessary fields
		 * this is just here for demo right now
		 * we need to change this
		 */
		 fs.readFile(places_dir+req.params.category+".json",'utf8',function(err, data){
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