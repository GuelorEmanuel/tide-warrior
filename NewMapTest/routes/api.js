var express = require('express');
var router = express.Router();

router.get('places/:filetype', function(req, res, next) {
	var places = {};
	res.json(places);
});

router.get('events/:filetype', function(req, res, next) {
	var events = {};
	res.json(events);
});

module.exports = router;