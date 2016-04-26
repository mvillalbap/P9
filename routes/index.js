var express = require('express');
var router = express.Router();

var control = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/question', control.question);
router.get('/check', control.check);

module.exports = router;
