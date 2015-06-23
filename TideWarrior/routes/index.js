var express = require('express');
var router = express.Router();

var config = require('../config.js');

router.get('/', function(req, res, next) {
	res.render('index', {
		config: config,
	  	title: 'Tide-Warrior',
	  	partials: {
	  		head: 'partials/head',
	  		navigation: 'partials/navigation',
	  		scripts:  'partials/scripts'
	  	}
	});
});

module.exports = router;
