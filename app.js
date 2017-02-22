var express = require('express');
var hbs = require('hbs');

var app = express();

app.set('view engine', 'hbs');
app.engine('html', hbs.__express);

app.set('views', __dirname + '/views');

hbs.registerPartials(__dirname + '/views/partials');

app.use('/', function(req, res) {
	res.render('test.html', {'message' : 'hello rendered world'});
});

app.listen(process.env.PORT || 3000, function() {
	console.log("Server Running...on port " + (process.env.PORT || 3000));
});
