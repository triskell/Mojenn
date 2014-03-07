var mongoose = require('mongoose');

function PageStore() {}

PageStore.prototype.find = function (params, callback) {
	var contents = mongoose.model('Content');
	contents.find({ type:'page' }, function (err, result) {
	  	if (err) { throw err; }
	  	callback(null, result);
	});
}
 
PageStore.prototype.get = function (id, params, callback) {
	var contents = mongoose.model('Content');
	contents.find({ _id : id, type:'page' }, function (err, result) {
	  	if (err) { throw err; }
	  	callback(null, result[0]);
	});
}
 
module.exports = PageStore;