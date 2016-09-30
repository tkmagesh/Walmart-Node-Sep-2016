function f1Sync(){
	console.log('f1Sync invoked');
	console.log('f1Sync completed');
}

function f2Sync(){
	console.log('f2Sync invoked');
	console.log('f2Sync completed');
}

function f3Sync(){
	console.log('f3Sync invoked');
	console.log('f3Sync completed');
}

function f4Sync(){
	console.log('f4Sync invoked');
	console.log('f4Sync completed');
}

var syncFns = [f1Async, f2Sync, f3Sync, f4Sync];

module.exports.runSync = function(){
	for(var i=0; i<syncFns.length; i++)
		syncFns[i]();
}

function f1Async(next){
	console.log('f1Async invoked');
	setTimeout(function(){
		console.log('f1Async completed');
		if (typeof next === 'function')
			next();
	}, 2000);
}

function f2Async(next){
	console.log('f2Async invoked');
	setTimeout(function(){
		console.log('f2Async completed');
		if (typeof next === 'function')
			next();
	}, 2000);
}

function f3Async(next){
	console.log('f3Async invoked');
	setTimeout(function(){
		console.log('f3Async completed');
		if (typeof next === 'function')
			next();
	}, 2000);
}

function f4Async(next){
	console.log('f4Async invoked');
	setTimeout(function(){
		console.log('f4Async completed');
		if (typeof next === 'function')
			next();
	}, 2000);
}

/*module.exports.runAsync = function(){
	f1Async(function(){
		f2Async(function(){
			f3Async(function(){
				f4Async();
			})
		})
	})
}*/

var asyncFns = [f1Async, f2Async, f3Async, f4Async];

module.exports.runAsync = function(){
	function exec(asyncFns){
		var first = asyncFns[0],
			remaining = asyncFns.slice(1),
			next = function(){
				exec(remaining);
			};
		if (typeof first === 'function')
			first(next);

	}
	exec(asyncFns);
}
