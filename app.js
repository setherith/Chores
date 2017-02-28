var express = require('express');
var hbs = require('hbs');
var sql = require('mysql');
var parser = require('body-parser');

var controllers = require('./controllers.js');

var app = express();

app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));

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

app.listen(process.env.PORT || 3000, function() {
	console.log("Server Running...\nhttp://localhost:" + (process.env.PORT || 3000));
});