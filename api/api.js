/*
load in modules
*/


const mysql = require('mysql2');
const express = require('express');
const session = require('express-session');
const path = require('path');
const alert = require('alert'); 
const cookieParser = require('cookie-parser');
const moment = require('moment');
const { response } = require('express');


//connect to MySQL db, currently locally ran
const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'password',
	database : 'mydb'
});

//intialize express
const app = express();

app.use(cookieParser());

function getCookie(request){
	let cookie = request.headers.cookie;
	return cookie.split('; ');
}


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

app.use(function(request, response, next) {
	response.header("Access-Control-Allow-Origin", "*");
	response.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
	});
  


// api homepage for get method
app.get('/', function(request, response) {
	response.json({title: 'Biscuit Bulk Barbering API'});
});

// login route
app.post('/auth', function(request, response) {
	// store post input
	let username = request.body.email;
	let password = request.body.pwrd;

	// validation for empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM mydb.users WHERE username = ? AND password = ?', [username, password], function(error, results) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// assign loggedIn cookie and username cookie
				response.cookie('loggedin', true, {httpOnly: false});
				response.cookie('username', username, {httpOnly: false});
				//if they're a customer, assign usertype cookie type 1
				if (results[0]['customer_customerID']) {
					response.cookie('userType', 1 , {httpOnly: false});
				} // elseif they're staff, assign usertype cookie type 2
				else if (results[0]['staff_staffID']) {
					response.cookie('userType', 2 , {httpOnly: false});
				}
				else{ // if they're neither, log to the console that they don't seem to be a user
					console.log(username + ' does not seem to be a customer or a staff');
				}
				response.redirect('http://localhost:3000/kf5012'); // redirect to homepage once logged in
			} else {
				alert('Incorrect username and/or password');
				response.redirect('http://localhost:3000/login');
			}			
		});
	} else {
		response.send('Please enter Username and Password!');
		response.redirect('http://localhost:3000/login');
	}
});

//Clears all cookies
app.get('/logout', function(request, response){
	response.cookie('loggedin', '', {expire: Date.now()});
	response.cookie('userType', '',{expire: Date.now()});
	response.cookie('username', '',{expire: Date.now()});
	response.redirect('http://localhost:3000/login');
});

//registration route
app.post('/register', function(request, response){
	let email = request.body.emailReg;
	let password = request.body.pwrdReg;
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
	connection.query('SELECT * FROM mydb.cuts', function(error, results) {
		if (error) throw error;
		response.json(results);
	});
});


app.get('/staff', function(request, response){
	connection.query('SELECT staffID, fName, sName from mydb.staff', function(error,results){
		if (error) response.json({error: error});
		else if (results) response.json(results);
		else response.json({error: 'no staff'});
	});
});


app.post('/staffAvailability', function(request, response){
	let staffID = request.body.barbers;
	let date = request.body.date;

	console.log(staffID);
	console.log(date);

	connection.query('SELECT time from mydb.appointments WHERE staff_staffID = ? AND date = ?',[staffID, date], function(error,results){
		if (error) response.json({error: error});
		else response.json(results);
	});

});


app.post('/book', function(request,response){
	let staffID = request.body.barbers;
	let date = request.body.date;
	let time_start = request.body.time;
	let email = request.body.customerID;
	let cutID = request.body.hairCuts;
	let duration, custID, time_end;


	function failed(error, inConn){ 
		if (inConn === 0){ // if not in a connection (0)
			console.log(error)
			alert('Error booking. Please try again'); // client facing error
			response.redirect('http://localhost:3000/booking'); // redirect to registration form
			response.end();
		}
		if(error && inConn === 1) connection.rollback(function(){ //rollback the transaction if failed
			throw error; //throw error
		});
	};

	function time_convert(num){ 
		var hours = Math.floor(num / 60);  
		var minutes = num % 60;
		return hours + ":" + minutes;         
  	};

	if (staffID && date && time_start && email){
			connection.query(`SELECT customerID FROM mydb.customers WHERE email = ?`, [email], function(error, results){ // search customer table for customer ID
				if (error) failed(error, 1); // run failed function
				else if (typeof results[0] !== 'undefined'){ //if results aren't false
					custID = results[0]['customerID']; // set customer ID to whatever the value is
				} else {
					alert('There was an error getting your ID. Please try again');
					response.redirect('http://localhost:3000/booking');
				};

				connection.query(`SELECT duration FROM mydb.cuts WHERE cutID = ?`, [cutID], function(error, results){  // search for duration
					if (error) failed(error, 1); // run reg_failed function
					else{ duration = time_convert(results[0]['duration']);
					time_end = moment(date + ' ' + time_start).add(duration, 'minutes').format('HH:mm');
					};

					connection.query('SELECT time, time_end from mydb.appointments WHERE staff_staffID = ? AND DATE(date) = ?', [staffID, date], function(error, results){
						if(error) response.json(error);
						else if (results && (typeof results[0] !== 'undefined')){
							results.every(element=>{
								let alreadyBooked_start = moment(date + ' ' + element['time']);
								let alreadyBooked_end = moment(date + ' ' + element['time_end']);

								if ((moment(date + ' ' + time_end).isSameOrBefore(alreadyBooked_start)) || 
									(moment(date + ' ' + time_start).isSameOrAfter(alreadyBooked_end))								
								){
									connection.query('INSERT INTO mydb.appointments(date, time, time_end, staff_staffID, customers_customerID, cuts_cutID) VALUES (?, ?, ?, ?, ?, ?)', [date, (time_start + ':00'), (time_end + ':00'), staffID, custID, cutID], function(error, results){
										if (error) console.log(error);
										response.json({state: 'booked', date: date, time_start: time_start, time_end: time_end, staff: staffID});
									})
								} else {
									response.json({state: 'not booked', reason: 'time unavailable'});
								}
							});
						} else if (results) {
							connection.query('INSERT INTO mydb.appointments(date, time, time_end, staff_staffID, customers_customerID, cuts_cutID) VALUES (?, ?, ?, ?, ?, ?)', [date, (time_start + ':00'), (time_end + ':00'), staffID, custID, cutID], function(error, results){
								if (error) console.log(error);
								response.json({state: 'booked', date: date, time_start: time_start, time_end: time_end, staff: staffID});
							});
						}
						else {
							response.json({state: 'not booked', reason: 'error'});
						}
					});
			});
		});
	} else {
		failed(null, 0);
	}
});


app.post('/resetPassword', function(request, response){
	let email = request.body.email;
	let currentPassword = request.body.password;
	let newPassword = request.body.passwordNew;
	let conf_newPassword = request.body.passwordNewConf;

	console.log(email);
	console.log(currentPassword)
	console.log(newPassword);
	console.log(conf_newPassword);

	if (typeof email == 'undefined' || typeof currentPassword == 'undefined' || typeof newPassword == 'undefined' || typeof conf_newPassword == 'undefined'){
		alert('You have not entered a field, please try again.')
	}
	else if(newPassword != conf_newPassword){
		alert('Your passwords do not match. Please try again');
	}else{
		connection.query('SELECT userID FROM mydb.users WHERE username = ? AND password = ?', [email, currentPassword], function(error, results){
			if(typeof results[0] === 'undefined') alert('Incorrect username or password.');
			else {
				connection.query('UPDATE mydb.users SET password = ? WHERE username = ?', [newPassword, email], function(error, results){
					alert('Password updated');
					})
			}
		})

	}
	response.redirect('http://localhost:3000/resetPassword');

});


app.get('/getAppointments', function(request, response){

	connection.query('SELECT * FROM mydb.appointments', function(error,results){
		if(error) response.json(error);
		else response.json(results);
	})
});

app.get('/getCustomers', function(request, response){

	connection.query('SELECT * FROM mydb.customers', function(error,results){
		if(error) response.json(error);
		else response.json(results);
	})
});

app.post('/deleteBooking', function(request,response){
	let bookingID = request.body.bookingID;
	connection.query('DELETE FROM mydb.appointments WHERE appointmentID = ?', [bookingID], function(error,results){
		if (error) {response.json(error);
		} else {alert('Booking has been cancelled.');
		response.redirect('http://localhost:3000/manageBookings');
	}
	});


});

app.get('/addCut', function(request,response){
	connection.query('INSERT INTO mydb.cuts(name) VALUES (?)', ['placeholder'], function(error, results){
		if(error) console.log(error);
		else console.log('cut created');
	});
	response.redirect('http://localhost:3000/ManageCuts');
});

app.post('/manageCut', function(request, response){
	let cutID = request.body.cutID;
	let cutName = request.body.cutName;
	let cutDuration = request.body.cutDuration;
	let cutLength = request.body.cutLength;
	let cutCost = request.body.cutCost;
	let cutAvailability = request.body.cutAvailable;

	connection.query('UPDATE mydb.cuts SET name = ?, duration = ?, cost = ?, available = ?, hairLength = ? WHERE cutID = ?', [cutName, cutDuration, cutCost, cutAvailability, cutLength, cutID], function(error, results){
		if(error) console.log(error);
		else response.redirect('http://localhost:3000/manageCuts');
	});

});

app.post('/manageUser', function(request, response){
	let email = request.body.username;
	let fName = request.body.fName;
	let sName= request.body.sName;

	console.log('test');
	if (typeof email != 'undefined'){
		connection.query('UPDATE mydb.customers SET fName = ?, sName = ? WHERE email = ?', [fName, sName, email], function(error, results){
			if(error) console.log(error);
			else{
				alert('User details update');
				response.redirect('http://localhost:3000/ManageUserAccount');
			}
		});
	}

});

app.listen(9999);