/*
load in modules;
mysql, express, express-session, path

reference: https://codeshack.io/basic-login-system-nodejs-express-mysql/
*/


const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');

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
	// Render login template
	response.redirect('http://localhost:3000');
});

// http://localhost:3000/auth auth page generation
app.post('/auth', function(request, response) {
	// store input
	let username = request.body.email;
	let password = request.body.pwrd;

	// validation for empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM mydb.users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			console.log(results);
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;

				console.log(request.session.username + ' initial logged in at' + console.timeStamp());
				response.redirect('http://localhost:3000');
			} else {
				response.send('Incorrect Username and/or Password!');
				console.log(username + password);
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

// http://localhost:3000/home home page generation
app.get('/home', function(request, response) {
	// If loggedin
	if (request.session.loggedin) {
		// return username
		console.log(request.session.username + ' logged in at' + console.timeStamp());
		response.redirect('localhost:3000');
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});

app.listen(9999);