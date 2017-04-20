var server = require('./server');
server.start();
exports.app = server.app;