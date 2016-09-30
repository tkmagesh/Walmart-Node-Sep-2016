
var path = require('path'),
	fs = require('fs');

var staticResExtns= ['.html', '.xml', '.js', '.css', '.jpg', '.png', '.json'];

function isStatic(resource){
	var extn = path.extname(resource);
	return staticResExtns.indexOf(extn) !== -1;
}

module.exports = function(staticResourcePath){
	return function(req, res, next){
		var urlObj = req.urlData;
		if (isStatic(urlObj.pathname)){
			var resource = path.join(staticResourcePath, urlObj.pathname);
			if (!fs.existsSync(resource)){
				res.statusCode = 404;
				res.end();
				return;
			}
			fs.createReadStream(resource).pipe(res);
			
		} else {
			next();
		}
	}
}