var Model = require('./Model');
var inherits = require('util').inherits;

function Event () {
	Model.call(this);
}

inherits(Event, Model);

Event.prototype.find = function (filters, callback) {
	console.log("I found something");
};

module.exports = new Event();