var feathers = require('feathers');

var PageService = require('./services/pages'),
	BlogService = require('./services/blog');

 
feathers().configure(feathers.socketio())
.use(feathers.static(__dirname + '/app'))
.use('/pages', new PageService())
.use('/blog', new BlogService())
.listen(8080);