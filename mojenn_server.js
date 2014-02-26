var feathers = require('feathers');
 
feathers().configure(feathers.socketio())
.use(feathers.static(__dirname + '/app'))
.listen(8080);