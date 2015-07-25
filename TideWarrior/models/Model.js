var dbClient = require('../dbClient');

function Model () {
	this.db = dbClient;
}

// Functions all models should support
// The functions just return an err object
// stating the activity is not supported
// Most of these will be overriden in
// the subclasses of Model

Model.prototype.save = function (newData, callback) {
	if (callback) {
		var errResponse = {};
		errResponse.status = 'Invalid action';
		errResponse.message = 'This model does not support saving';
		callback(errResponse);
	}
};

Model.prototype.getAll = function (callback, fields) {
	if (callback) {
		var errResponse = {};
		errResponse.status = 'Invalid action';
		errResponse.message = 'This model does not support retrieving';
		callback(errResponse);
	}
};

Model.prototype.find = function (filters, callback, fields) {
	if (callback) {
		var errResponse = {};
		errResponse.status = 'Invalid action';
		errResponse.message = 'This model does not support searching';
		callback(errResponse);
	}
};

Model.prototype.update = function (newData, oldData, callback) {
	if (callback) {
		var errResponse = {};
		errResponse.status = 'Invalid action';
		errResponse.message = 'This model does not support updating';
		callback(errResponse);
	}
};

module.exports = Model;