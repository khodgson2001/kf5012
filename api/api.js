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
		connection.query('SELECT * FROM mydb.users WHERE username = ? AND password = ?', [username, password], function(error, results) {
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
		});
	} else {
		response.send('Please enter Username and Password!');
		response.redirect('http://localhost:3000/login');
		console.log(request.session.loggedin + request.session.username);
	}
});

//Clears all session variables
app.get('/logout', function(request, response){
	request.session.destroy();
	response.redirect('http://localhost:3000/login');
});

//registration route
app.post('/register', function(request, response){
	let email = request.body.email;
	let password = request.body.pwrd;
	let fName = request.body.fName;
	let lName = request.body.lName;

	function reg_failed(error, inConn){ 
		if (inConn === 0 && error === null){ // if not in a connection (0)
			alert('Error registering. Please try again'); // client facing error
			response.redirect('http://localhost:3000/register'); // redirect to registration form
			response.end();
		}
		if(error && inConn === 1) connection.rollback(function(){ //rollback the transaction if failed
			throw error; //throw error
		});
	}

	if (email && password && fName && lName){
		connection.beginTransaction(function(error){ // starts a transaction - need to do several queries, one uses the previous' insert ID as a ForeignKey in DB
			
			if (error) {throw error;} //throw any errors
			
			connection.query(`INSERT INTO customers(email, fName, sName) VALUES (?, ?, ?)`, [email, fName, lName], function(error, results){ // insert into cust table, escape strings for xtr validate
				reg_failed(error, 1); // run reg_failed function
				
				let custID = results.insertId; // set custID var as the previous insertID, used in next query
				
				connection.query(`INSERT INTO users(username, password, customer_customerID) VALUES (?, ?, ?);`, [email, password, custID], function(error){  // insert into user table, escape strings for xtr validate
					reg_failed(error, 1); // ruun reg_failed function

					connection.commit(function(error){ // commit the transaction
						reg_failed(error, 1); // run reg_failed function
						connection.end(); // close DB connection
						console.log(email + ' registered'); // log registration in console
						alert('Account registered. Please login'); // client facing success msg
						response.redirect('http://localhost:3000/login'); // redirect to login form

					});
				});
			});
		});

	} else {
		
		reg_failed(null, 0);

	}
});


//Returns all available cuts in JSON format
app.get('/cuts', function(request, response){
	connection.query('SELECT * FROM mydb.cuts', function(error, results, fields) {
		response.json(results);
	});
});

//checks availability of a specific appointment
/*logic:
	pass in the start (x) and length of time (y), and who (z) with
	query DB with something like:
		SELECT * FROM mydb.appointments WHERE staff_staffID = z;
		
	IF (E1 <= S2 || S1 >= E2) THEN BOOK
	ELSE
	NOPE

*/
app.get('/availability', function(request, response){
	response.send('coming soon');
});

app.listen(9999);