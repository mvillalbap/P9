var models = require('../models');

exports.question = function(req,res,next){
	models
	.Quiz
	.findOne()
	.then(function(quiz){
		if(quiz){
			var answer = req.query.answer || '';
			res
			.render('quizzes/question', {question: quiz.question, answer: answer});
		}else{
			throw new Error('No hay preguntas en la base de datos.');
		}
	}).catch(function(error){
		next(error);
	});
};

exports.check = function(req,res,next){
	models
	.Quiz
	.findOne()
	.then(function(quiz){
		if(quiz){
			var answer = req.query.answer || '';
			answer = answer.trim();
			var exp = RegExp('^' + quiz.answer + '$','i');
			var result = answer.match(exp)? 'Correcta' : 'Incorrecta';
			res
			.render('quizzes/result', {result: result, answer: answer});
		}else{
			throw new Error('No hay preguntas en la base de datos.');
		}
	}).catch(function(error){
		next(error);
	});
};