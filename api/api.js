/*
load in modules;
mysql, express, express-session, path
*/
const mysql = require('mysql2');
const express = require('express');
const session = require('express-session');
const path = require('path');
const alert = require('alert'); 

//connect to MySQL db, currently locally ran
const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'password',
	database : 'mydb'
});

//intialize express
const app = express();

//create session variables
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// ???
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

// redirect if go to api homepage
app.get('/', function(request, response) {
	response.send(`
	API for Biscuit Bulk Barbering (Team Biscuit Bulk Project - KF5012)
	
	Routes:
	<br>/user - POST

	/appointment
	`);
});


const user = require('./routes/User');
app.use('/user', user);

const appointment = require('./routes/Appointment');
app.use('/appointment', appointment);

//Returns all available cuts in JSON format
app.get('/cuts', function(request, response){
	connection.query('SELECT * FROM mydb.cuts', function(error, results) {
		if (error) throw error;
		response.json(results);
	});
});

app.listen(9999);