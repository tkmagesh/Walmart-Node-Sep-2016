var http = require('http'),
	fs = require('fs'),
	path = require('path');

var server = http.createServer(function(req, res){
	console.log('A new connection is established - ', req.url	);
	var resource = path.join(__dirname, req.url);
	if (!fs.existsSync(resource)){
		res.statusCode = 404;
		res.end();
		return;
	}
	fs.createReadStream(resource).pipe(res);

});

server.listen(8080);

console.log('server listening on 8080!!');
