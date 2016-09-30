var querystring = require('querystring'),
	calculator = require('./calculator');


module.exports = function(req, res){
	var urlObj = req.urlData;
	if (urlObj.pathname === '/calculator' && req.method === 'GET'){
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
		
	} 
}