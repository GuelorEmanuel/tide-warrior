var express = require('express');
var router = express.Router();

var config = require('../config.js');

router.get('/', function(req, res, next) {
	res.render('map-view', {
		title: config.appName,
		accessToken: config.map.accessToken,
		partials: {
			head: 'partials/head',
			navigation: 'partials/collapsed-navigation',
			footer: 'partials/footer',
			scripts: 'partials/scripts'
		}
	});
});

router.get('/:lat/:lng', function(req, res, next) {
	res.render('map-view', {
		title: config.appName,
		accessToken: config.map.accessToken,
		marker: {
			latitude: req.params.lat,
			longitude: req.params.lng
		},
		partials: {
			head: 'partials/head',
			navigation: 'partials/collapsed-navigation',
			footer: 'partials/footer',
			scripts:  'partials/scripts'
		}
	});
});

module.exports = router;
