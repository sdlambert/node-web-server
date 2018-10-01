const express = require('express');
const hbs     = require('hbs');
const fs      = require('fs');

var app = express();

// Handlebars Setup
// ______________________________

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.set('view engine', 'hbs');

// Middleware
// ______________________________

app.use((req, res, next) => {
	var now = new Date().toString(),
	    log = (`${req.ip} | ${now}: ${req.method} ${req.path}`);

  console.log(log);
  fs.appendFile('server log', log + '\n', (err) => {
  	if (err)
  		console.log('Unable to append to server.log');
  });
	next();
});

// app.use((req, res) => {
// 	res.render('maintenance.hbs');
// });

// Static
app.use(express.static(__dirname + '/public'));


// Routes
// ______________________________

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle:      'Home Page',
		welcomeMessage: 'Welcome to my website',
		currentYear:    new Date().getFullYear(),
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle:   'About Page',
		currentYear: new Date().getFullYear(),
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'This is bad. Really, really bad.'
	});
});

// Start server
// ______________________________

app.listen(3000, () => {
	console.log("Server is up on port 3000.");
});