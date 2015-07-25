var Model = require('./Model');
var inherits = require('util').inherits;

function Place () {
	Model.call(this);
}

inherits(Place, Model);

Place.prototype.find = function (filters, callback) {
	if (callback) {
		var queryString = 'SELECT * from places';
		this.db.query(queryString, function (err, results) {
			if (err) {
				var errResponse = {};
				errResponse.status = 'Database Error';
				errResponse.message = 'Error retrieving data from database';
				errResponse.databaseError = err;
				callback(errResponse);
			}
			else {
				callback(null, results);
			}
		});
	}
};

module.exports = new Place();