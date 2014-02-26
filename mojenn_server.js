var feathers = require('feathers');

var PageService = require('./services/pages');

 
feathers().configure(feathers.socketio())
.use(feathers.static(__dirname + '/app'))
.use('/pages', new PageService())
.listen(8080);