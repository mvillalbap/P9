var express = require('express');
var router = express.Router();

var control = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/author', function(req, res, next) {
  res.render('author')
});

router.param('quizId', control.load);

router.get('/quizzes', 						control.index);
router.get('/quizzes/:quizId(\\d+)', 		control.show);
router.get('/quizzes/:quizId(\\d+)/check', 	control.check);
router.get('/quizzes/new', 					control.new);
router.post('/quizzes',						control.create);

module.exports = router;
