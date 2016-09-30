
var path = require('path'),
	fs = require('fs');

var staticResExtns= ['.html', '.xml', '.js', '.css', '.jpg', '.png', '.json'];

function isStatic(resource){
	var extn = path.extname(resource);
	return staticResExtns.indexOf(extn) !== -1;
}

module.exports = function(req, res){
	var urlObj = req.urlData;
	if (isStatic(urlObj.pathname)){
		var resource = path.join(__dirname, urlObj.pathname);
		if (!fs.existsSync(resource)){
			console.log('[serveStatic] serving 404');
			res.statusCode = 404;
			res.end();
			return;
		}
		console.log('[serveStatic] ' + resource + '  - exists');
		//fs.createReadStream(resource).pipe(res);
		var stream = fs.createReadStream(resource);
		stream.on('data', function(chunk){
			console.log('[serveStatic] serving resource chunk');
			res.write(chunk);
		});
		stream.on('end', function(){
			console.log('[serveStatic] ending serving resource');
			res.end();
		});
	}
}