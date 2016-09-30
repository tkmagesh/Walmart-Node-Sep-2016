var url = require('url');

module.exports = function(req){
	req.urlData =  url.parse(req.url === '/' ? '/index.html' : req.url);
}