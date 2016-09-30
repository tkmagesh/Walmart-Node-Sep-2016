var express = require('express');
var router = express.Router();

var list = [
	{id : 1, name : 'Watch a movie', isCompleted : false},
	{id : 2, name : 'Plan for the weekend', isCompleted : true},
]
/* GET home page. */
router.get('/', function(req, res, next) {
	var viewData = { 
		tasks : list
	}
  res.render('tasks/list', viewData)
});

router.get('/new', function(req, res, next){
	res.render('tasks/new');
});

router.post('/new', function(req, res, next){
	var newTask = {
		id : list.reduce(function(result, task){
			return result > task.id ? result : task.id
		},0) + 1,
		name : req.body.newTaskName,
		isCompleted : false
	};
	list.push(newTask);
	res.redirect('/tasks');
});

router.get('/api', function(req, res, next){
	res.json({ tasks : list});
})

module.exports = router;

