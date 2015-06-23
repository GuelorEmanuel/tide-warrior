var express = require('express');
var router = express.Router();

var config = require('../config.js');

router.get('/', function(req, res, next) {
	res.render('map-view', {
		config: config,
		title: 'Tide-Warrior',
		partials: {
			head: 'partials/head',
			navigation: 'partials/collapsed-navigation',
			scripts: 'partials/scripts'
		}
	});
});

router.get('/:lat/:lng', function(req, res, next) {
	res.render('map-view', {
		config: config,
		title: 'Tide-Warrior',
		marker: {
			latitude: req.params.lat,
			longitude: req.params.lng
		},
		partials: {
			head: 'partials/head',
			scripts:  'partials/scripts'
		}
	});
});

module.exports = router;
