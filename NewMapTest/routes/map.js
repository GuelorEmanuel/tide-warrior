var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('map-view', { 
		title: 'Tide-Warrior',
		partials: {
			head: 'partials/head'
		}
	});
});

router.get('/:lat/:lng', function(req, res, next) {
	res.render('map-view', { 
		title: 'Tide-Warrior',
		marker: {
			latitude: req.params.lat,
			longitude: req.params.lng
		},
		partials: {
			head: 'partials/head'
		}
	});
});

module.exports = router;
