var express = require('express');
var hbs = require('hbs');
var sql = require('mysql');
var parser = require('body-parser');

var app = express();

app.set('view engine', 'hbs');
app.engine('html', hbs.__express);

app.set('views', __dirname + '/views');

hbs.registerPartials(__dirname + '/views/partials');

app.use(parser.urlencoded({
	extended: true
}));

app.use(parser.json());

var conn = sql.createConnection({
	host: "localhost",
	user: "chores_user",
	password: "user_chores",
	database: "chores"
});

app.get('/', function(req, res) {
	conn.query('select * from tasks', function(err, rows) {
		if(err) throw err;
		res.render('test.html', {'message' : rows});
	});
	
});

app.get('/user/add', function(req, res) {
	res.render('./user/add.html');
});

app.post('/user/add', function(req, res) {
	console.log(req.body);
});

app.post('/update', function(req, res) {
	console.log(req.body);
	res.redirect('/');
});

app.listen(process.env.PORT || 3000, function() {
	console.log("Server Running...on port " + (process.env.PORT || 3000));
});
