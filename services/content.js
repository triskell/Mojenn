var mongoose = require('mongoose');

var contentSchema = new mongoose.Schema({

    id      : mongoose.Schema.ObjectId,
    type	: String,
    date 	: { type : Date, default : Date.now },
    title   : String,
    body	: String

});
var ContentModel = mongoose.model('Content', contentSchema);

var tagsToReplace = {
'&': '&amp;',
'<': '&lt;',
'>': '&gt;'
};
 
// Escapes HTML so that evil people can't inject mean things into the page
function escapeHtml(str) {
	return str.replace(/[&<>]/g, function (tag) {
		return tagsToReplace[tag] || tag;
	});
}
 
function Content() {

}
 
Content.prototype.create = function(data, params, callback) {
	// Create our actual Page object so that we only get what we really want
	if(data.type!="post" && data.type!="page") callback(null, null); //Do not create content if type is not acceptable

	var newContent =  new ContentModel();

	newContent.type = data.type,
	newContent.title = escapeHtml(data.title);
	newContent.body = escapeHtml(data.body);

	newContent.save(function(err) {
		if (err) { throw err; }
  		console.log('Content added !');
  		callback(null, newContent);
	});
}
 
module.exports = Content;