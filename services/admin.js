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
 
function Admin() {
	this.admin ={
		test : "IN ADMIN"
	}
}
 
 
Admin.prototype.find = function (params, callback) {
	callback(null, this.admin);
}
 
module.exports = Admin;