var models = require('../models');

exports.load = function(req,res,next,quizId){
	models
	.Quiz
	.findById(quizId)
	.then(function(quiz){
		if(quiz){
			req.quiz = quiz;
			next()
		} else {
			next(new Error('No existe quizId=' + quizId));
		}
	})
	.catch (function (error){
		next(error);
	});
};

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
	var answer = req.query.answer || '';
	res.render('quizzes/show', {quiz: req.quiz, answer: answer});
};

exports.check = function(req,res,next){
	var answer = req.query.answer || '';
	answer = answer.trim();
	var exp = RegExp('^' + req.quiz.answer + '$','i');
	var result = answer.match(exp)? 'Correcta' : 'Incorrecta';
	res.render('quizzes/result', {quiz: req.quiz, result: result, answer: answer});
};

exports.new = function(req,res,next){
	var quiz = models
				.Quiz
				.build({question: "", answer: ""});
	res.render('quizzes/new', {quiz: quiz});
};

exports.create = function(req,res,next){
	var quiz = models
				.Quiz
				.build({	question: 	req.body.quiz.question,
							answer: 	req.body.quiz.answer}	);
	quiz.save({fields: ['question', 'answer']})
	.then(function(quiz){
		res.redirect('/quizzes');
	})
	.catch (function(error){
		next(error);
	});
};