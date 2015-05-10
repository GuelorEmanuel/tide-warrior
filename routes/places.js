var express = require('express');
var router = express.Router();

/* POST found places form. */
router.post('/', function(req, res, next) {
    res.send(req.body.map_results);
});

module.exports = router;
