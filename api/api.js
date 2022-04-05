/*
load in modules;
mysql, express, express-session, path

reference: https://codeshack.io/basic-login-system-nodejs-express-mysql/
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
	// Render login template
	response.redirect('http://localhost:3000/kf5012');
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
				
				if (results.customer_customerID == null) request.session.userType = 1;
				else if (results.staff_staffID == null) request.session.userType = 2;
				else console.log(request.session.username + ' does not seem to be a customer or a staff');

				console.log(request.session.username + ' initial logged in at' + console.timeStamp());
				response.redirect('http://localhost:3000/kf5012');
			} else {
				alert('Incorrect username and/or password');
				response.redirect('http://localhost:3000/login');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.redirect('http://localhost:3000/login');
		console.log(request.session.loggedin + request.session.username);
		response.end();
	}
});

app.get('/logout', function(request, response){
	request.session.destroy();
	response.redirect('http://localhost:3000/login');
	response.end();
});

app.post('/register', function(request, response){
	let email = request.body.email;
	let password = request.body.pwrd;
	let fname = request.body.fname;
	let sname = request.body.sname;
	let dob = request.body.dob;

	if (username && password && fname && sname && dob){
		connection.query('INSERT INTO mydb.customers (email, password, fName, sName, dob) VALUES (?,?,?,?,?)', 
						[username, password, fname, sname, dob], function(error, results, fields){
							console.log(results);
							if (error) throw error;
							
							if (results.length > 0){
								console.log(email + ' registered');
								alert('Account registered. Please login');
								response.redirect('http://localhost:3000/login');
							} else { 
								alert('Error registering. Please try again');
								response.redirect('http://localhost:3000/register');
							}
							response.end();
						}); 
						
						//need to create a trigger
	}
});

app.listen(9999);