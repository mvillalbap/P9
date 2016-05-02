var models = require('../models');

exports.index = function(req,res,next){
	models
	.Quiz
	.findAll()
	.then(function(quizzes){
		res
		.render('quizzes/index.ejs', {quizzes: quizzes});
	})
	.catch(function(error){
		next(error);
	});
};

exports.show = function(req,res,next){
	models
	.Quiz
	.findById(req.params.quizId)
	.then(function(quiz) {
		if(quiz) {
			var answer = req.query.answer || '';
			res.render('quizzes/show', {quiz: quiz, answer: answer});
		} else {
			throw new Error('No existe ese quiz en la base de datos');
		}
	})
	.catch (function(error) { 
		next(error); 
	});
};

exports.check = function(req,res,next){
	models
	.Quiz
	.findById(req.params.quizId)
	.then(function(quiz){
		if(quiz){
			var answer = req.query.answer || '';
			answer = answer.trim();
			var exp = RegExp('^' + quiz.answer + '$','i');
			var result = answer.match(exp)? 'Correcta' : 'Incorrecta';
			res
			.render('quizzes/result', {quiz: quiz, result: result, answer: answer});
		}else{
			throw new Error('No existe ese quiz en la base de datos.');
		}
	})
	.catch(function(error){
		next(error);
	});
};