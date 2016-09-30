var http = require('http');
	

var app = require('./app'),
	dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic'),
	serveCalculator = require('./serveCalculator'),
	serveNotFound = require('./serveNotFound'),
	serveEmployees = require('./serveEmployees');

app.use(dataParser);
app.use(function(req, res, next){
	console.log(req.method + ' - \t' + req.urlData.pathname);
	next();
});
app.use(serveStatic);
app.use(serveCalculator);
app.use(serveEmployees);
app.use(serveNotFound);

http.createServer(app).listen(8080);

console.log('server listening on 8080!!');
