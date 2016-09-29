var fs = require('fs');

//var fileContents = fs.readFileSync('test.txt', {encoding : 'utf8'});

/*
fs.readFile('test.txt', {encoding : 'utf8'}, function(err, fileContents){
	console.log(fileContents);	
});
*/

var stream = fs.createReadStream('test.txt', {encoding : 'utf8'});

/* data, open, close, end, error - events of ReadableStream */

stream.on('data', function(chunk){
	console.log(chunk);
});

stream.on('end', function(){
	console.log('---------------- EOF ---------------');
});

