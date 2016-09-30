var url = require('url'),
	querystring = require('querystring');

module.exports = function(req, res, next){
	req.urlData =  url.parse(req.url === '/' ? '/index.html' : req.url);
	req.queryData = querystring.parse(req.urlData.query);
	if (req.method === 'POST'){
		var postData = '';
		req.on('data', function(chunk){
			postData += chunk;
		});
		req.on('end', function(){
			req.bodyData = querystring.parse(postData);
			next();
		})
	} else {
		next();
	}
}