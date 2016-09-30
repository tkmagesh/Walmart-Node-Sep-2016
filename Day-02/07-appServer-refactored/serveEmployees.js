
var data = [
	{id : 100, name : 'Suresh'},
	{id : 101, name : 'Magesh'}
];

module.exports = function(req, res, next){
	if (req.urlData.pathname === '/employees'){
		res.write(JSON.stringify(data));
		res.end();
	} else {
		next();
	}
}