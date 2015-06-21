var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index', {
	  	title: 'Tide-Warrior',
	  	partials: {
	  		head: 'partials/head',
	  		navigation: 'partials/navigation',
	  		scripts:  'partials/scripts'
	  	}
	});
});

module.exports = router;
