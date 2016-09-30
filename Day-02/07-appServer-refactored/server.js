var http = require('http');
	

var dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic'),
	serveCalculator = require('./serveCalculator'),
	serveNotFound = require('./serveNotFound');



var server = http.createServer(function(req, res){
	dataParser(req);	
	serveStatic(req, res);
	serveCalculator(req, res);
	serveNotFound(res);
});

server.listen(8080);

console.log('server listening on 8080!!');


//dataParser
//serveStatic
//serveCalculator
//serveNotFound