var path = require('path');

var Sequelize = require('sequelize');

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);

var DATABASE_PROTOCOL = url[1];
var DATABASE_DIALECT = url[1];
var DATABASE_USER = url[2];
var DATABASE_PASSWORD = url[3];
var DATABASE_HOST = url[4];
var DATABASE_PORT = url[5];
var DATABASE_NAME = url[6];
var DATABASE_STORAGE = process.env.DATABASE_STORAGE;

var sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD,
						{dialect: DATABASE_DIALECT, 
							protocol: DATABASE_PROTOCOL,
							port: DATABASE_PORT,
							host: DATABASE_HOST,
							storage: DATABASE_STORAGE,
							omit: true});

var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

sequelize
.sync()
.then(function(){
	return Quiz
			.count()
			.then(function(c){
				if(c === 0){
					return Quiz
							.bulkCreate([ {question: 'Capital de Italia',   answer: 'Roma'},
										  {question: 'Capital de Portugal', answer: 'Lisboa'}
										])
							.then(function(){
								console.log('Base de datos creada');
							});
				}
			})
}).catch(function(error){
	console.log('Error sincronizando la base de datos:', error);
	process.exit(1);
});

exports.Quiz = Quiz;