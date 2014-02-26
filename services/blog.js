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
 
function Blog() {
	this.blog = [{
		id: '0',
		name: 'Test Post',
		content: '###Hello !  \nHelloworld from blog !'
	},
	{
		id: '1',
		name: 'Other Post',
		content: 'This is a sample content in blog'
	}];
	this.lastId = 2;
}
 
// Returns a Post by it's id
Blog.prototype.getById = function (id) {
	var currentPost;
	for (var i = 0; i < this.blog.length; i++) {
		currentPost = this.blog[i];
		if (currentPost.id == id) {
			return currentPost;
		}
	}
	 
	return null;
}
 
Blog.prototype.find = function (params, callback) {
	callback(null, this.blog);
}
 
Blog.prototype.get = function (id, params, callback) {
	var post = this.getById(id);
	if (post === null) {
		return callback(new Error('Post not found'));
	}
	 
	callback(null, post);
}
 
Blog.prototype.create = function (data, params, callback) {
	// Create our actual Page object so that we only get what we really want
	var newPost = {
		id: this.lastId++,
		description: escapeHtml(data.description),
		done: !!data.done
	};
	 
	this.pages.push(newPage);
	 
	callback(null, newPage);
}
	 
Blog.prototype.update = function (id, data, params, callback) {
	var post = this.getById(id);
	if (post === null) {
		return callback(new Error('Post does not exist'));
	}
	 
	// We only want to update the `done` property
	// !! is used for sanitization turning everything into a real booelan
	post.done = !!data.done;
	 
	callback(null, post);
}
 
Blog.prototype.remove = function (id, params, callback) {
	var post = this.getById(id);
	if (post === null) {
		return callback(new Error('Can not delete Post'));
	}
	 
	// Just splice our post out of the array
	this.posts.splice(this.blog.indexOf(post), 1);
	callback(null, post);
}
 
module.exports = Blog;