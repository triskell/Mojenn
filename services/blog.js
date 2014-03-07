var mongoose = require('mongoose');

function Blog() {}
 
Blog.prototype.find = function (params, callback) {
	var contents = mongoose.model('Content');
	contents.find({ type:'post' }, function (err, result) {
	  	if (err) { throw err; }
	  	callback(null, result);
	});
}
 
Blog.prototype.get = function (id, params, callback) {
	var contents = mongoose.model('Content');
	contents.find({ _id : id, type:'post' }, function (err, result) {
	  	if (err) { throw err; }
	  	callback(null, result[0]);
	});
}
 
module.exports = Blog;