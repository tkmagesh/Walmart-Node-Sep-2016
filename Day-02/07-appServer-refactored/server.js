var http = require('http'),
	path = require('path'),
	chalk = require('chalk');
	

var app = require('./app'),
	dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic'),
	serveCalculator = require('./serveCalculator'),
	serveNotFound = require('./serveNotFound'),
	serveEmployees = require('./serveEmployees');

app.use(dataParser);
app.use(function(req, res, next){
	console.log(chalk.red(req.method) + ' - \t' + chalk.blue(req.urlData.pathname));
	next();
});
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(serveCalculator);
app.use(serveEmployees);
app.use(serveNotFound);

http.createServer(app).listen(8080);

console.log('server listening on port - 8080!!');
