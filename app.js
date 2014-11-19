var express = require('express');
var app = express();
var fortune = require('./libs/fortune.js');
var handlebars = require('express3-handlebars').create({ defaultLayout : 'main' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('home');
});

app.get('/about', function(req, res) {
	res.render('about', { fortune: fortune.getFortune() });
});

//Custom 404 message
app.use(function(req, res) {
	console.log(req, res);
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found');
});

//Custom 500 message
app.use(function(req, res) {
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 - Horrible Error');
});

app.listen(app.get('port'), function() {
	console.log('Express started' + app.get('port'));
});