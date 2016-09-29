var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator');

var staticResExtns= ['.html', '.xml', '.js', '.css', '.jpg', '.png', '.json'];

function isStatic(resource){
	var extn = path.extname(resource);
	return staticResExtns.indexOf(extn) !== -1;
}

var server = http.createServer(function(req, res){
	var urlObj = url.parse(req.url === '/' ? '/index.html' : req.url);
	console.log(req.method + '-\t' + urlObj.pathname);
	if (isStatic(urlObj.pathname)){
		var resource = path.join(__dirname, urlObj.pathname);
		if (!fs.existsSync(resource)){
			res.statusCode = 404;
			res.end();
			return;
		}
		fs.createReadStream(resource).pipe(res);
	} else if (urlObj.pathname === '/calculator' && req.method === 'GET'){
		var calculatorData = querystring.parse(urlObj.query);
		var op = calculatorData.op,
			n1 = parseInt(calculatorData.n1, 10),
			n2 = parseInt(calculatorData.n2, 10)

		var result = calculator[op](n1, n2);
		res.write(result.toString());
		res.end();
	} else if (urlObj.pathname === '/calculator' && req.method === 'POST'){
		var postData = '';
		req.on('data', function(chunk){
			postData += chunk;
		});
		req.on('end', function(){
			var calculatorData = querystring.parse(postData);
			var op = calculatorData.op,
				n1 = parseInt(calculatorData.n1, 10),
				n2 = parseInt(calculatorData.n2, 10)

			var result = calculator[op](n1, n2);
			res.write(result.toString());
			res.end();	
		})
		
	} else {
		res.statusCode = 404;
		res.end();
	}

});

server.listen(8080);

console.log('server listening on 8080!!');


//dataParser
//serveStatic
//serveCalculator
//serveNotFound