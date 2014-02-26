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
 
function PageStore() {
	this.pages = [{
		id: '0',
		name: 'Test Page',
		content: 'Helloworld !'
	},
	{
		id: '1',
		name: 'Other Page',
		content: 'This is a sample content'
	}];
	this.lastId = 2;
}
 
// Returns a Page by it's id
PageStore.prototype.getById = function (id) {
	var currentPage;
	for (var i = 0; i < this.pages.length; i++) {
		currentPage = this.pages[i];
		if (currentPage.id == id) {
			return currentPage;
		}
	}
	 
	return null;
}
 
PageStore.prototype.find = function (params, callback) {
	callback(null, this.pages);
}
 
PageStore.prototype.get = function (id, params, callback) {
	var page = this.getById(id);
	if (page === null) {
		return callback(new Error('Page not found'));
	}
	 
	callback(null, page);
}
 
PageStore.prototype.create = function (data, params, callback) {
	// Create our actual Page object so that we only get what we really want
	var newPage = {
		id: this.lastId++,
		description: escapeHtml(data.description),
		done: !!data.done
	};
	 
	this.pages.push(newPage);
	 
	callback(null, newPage);
}
	 
PageStore.prototype.update = function (id, data, params, callback) {
	var page = this.getById(id);
	if (page === null) {
		return callback(new Error('Page does not exist'));
	}
	 
	// We only want to update the `done` property
	// !! is used for sanitization turning everything into a real booelan
	page.done = !!data.done;
	 
	callback(null, page);
}
 
PageStore.prototype.remove = function (id, params, callback) {
	var page = this.getById(id);
	if (page === null) {
		return callback(new Error('Can not delete Page'));
	}
	 
	// Just splice our page out of the array
	this.pages.splice(this.pages.indexOf(page), 1);
	callback(null, page);
}
 
module.exports = PageStore;