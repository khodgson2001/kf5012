const mysql = require('mysql2');
const express = require('express');
const session = require('express-session');
const path = require('path');
const alert = require('alert'); 
const router = express.Router();

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'password',
	database : 'mydb'
});

// allows for a userID to be passed in via url args
router.param('userid', function(request, response, next, userid) {
	request.userid = userid;
	next();
		});


		//none of this is going to work yet, so don't be optimistic :) 
router.post('/:userid', function(request,response){
	let userID = request.userid;
	let searcherID = request.body.searcherID;

	if ((userID === null)||(searcherID === null)) response.json(error, 'missing parameters');

	connection.beginTransaction(function(error){

		connection.query('SELECT * from mydb.users WHERE userID = ?', [userID], function(error, results){
			if (error) throw error;
			if (results.length > 0){
				response.json(results);
			} else {
				response.send("No user exists with that ID. Please try again.")
			}
	
		});

	});

	
/*
return json of specified user details
pass in params: the userID[1] being searched, loginToken, the userID[2] of searcher
if [2] is that of an admin or the same as [1], and loginToken and [2] matches what is in DB, then return JSON of user details
otherwise return JSON with an error

HAS NO VALIDATION RN
*/
});

// http://localhost:3000/auth auth page generation
router.post('/login', function(request, response) {
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
router.get('/logout', function(request, response){
	request.session.destroy();
	response.redirect('http://localhost:3000/login');
});


//registration route
router.post('/register', function(request, response){
				console.log('register accessed');
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


module.exports = router;
