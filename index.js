
var server = require("./server"),
    router = require("./router"),
    requestHandler = require("./requestHandler"),
    dust = require('dust');;

var handle = {};

handle['/'] = requestHandler.start;
handle['/start'] = requestHandler.start;
handle['/stop'] = requestHandler.stop;

// Starting server
server.start(router.route, handle);