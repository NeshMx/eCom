var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var app = express();

// Establish connection to Mongoose DB

mongoose.connect('mongodb://nesh:amuCSgD0oYaNDhhZ6mAl@ds045054.mlab.com:45054/ecommerce', function(err) {
	if (err) {
		console.log(err);
	} else {
		console.log("Connected to the database");		
	}
});

// Middleware

app.use(morgan('dev'));

app.get('/', function(req, res) {
	var name = "Alex"
	res.json("My name is " + name);
});

app.listen(3000, function(err) {
	if (err) throw err;
	console.log("Server is running on port 3000...");
});