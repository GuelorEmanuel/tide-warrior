var express = require('express');
var router = express.Router();
var needle = require('needle');
var querystring = require('querystring');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tide' });
});

/* POST location form. */
router.post('/find-location', function(req, res, next) {

    var google_options = {
        sensor: false,
        address: req.body.location
    }

    var options = {
        rejectUnauthorized: false,
        requestCert: true,
        agent: false
    }

    needle.get('https://maps.google.com/maps/api/geocode/json?'+querystring.stringify(google_options), options, 
        function(err, resp, body) {
            if (!err) {
                var response = '';
                response += 'Longitude: ' + body.results[0].geometry.location.lng;
                response += '<br/>';
                response += 'Latitude: ' + body.results[0].geometry.location.lat;
                res.send(response);
            } else {
                res.render('error', {
                    message: err.message,
                    error: err
                })
            }
        }
    );
});

module.exports = router;
