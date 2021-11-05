var express = require('express');
var hbs = require('hbs');
var sql = require('mysql');
var parser = require('body-parser');
var session = require('express-session');

var controllers = require('./controllers.js');

const PORT = 8080;
const HOST = '0.0.0.0';

var app = express();

app.use(session({
	secret: 'password',
	resave: false,
	saveUninitialized: true
}));

app.use(function(req, res, next) {
	res.locals.request = req;
	if(req.session != null && req.session.user != null) {
		res.locals.username = req.session.user;
	}
	next(null, req, res);
});

app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/css'));

hbs.registerHelper('ShortDate', function(value) {
	var d = new Date(value);
	var month = Number(d.getMonth() + 1);
	if (month < 10) { month = '0' + month; }
	var day = d.getDate();
	if (day < 10) { day = '0' + day; }
	return new hbs.SafeString(day + '/' + month + '/' + d.getFullYear());
});

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

controllers(app, conn);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
