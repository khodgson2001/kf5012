/*
load in modules
*/


const mysql = require('mysql2');
const express = require('express');
const session = require('express-session');
const path = require('path');
const alert = require('alert'); 
const cookieParser = require('cookie-parser');


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
			console.log();
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				response.cookie('loggedin', true, {httpOnly: false});
				response.cookie('username', username, {httpOnly: false});
				
				if (results[0]['customer_customerID']) {
					response.cookie('userType', 1 , {httpOnly: false});
				}
				else if (results[0]['staff_staffID']) {
					response.cookie('userType', 2 , {httpOnly: false});
				}
				else{
					console.log(username + ' does not seem to be a customer or a staff');
				}

				console.log(username + ' initial logged in at ' + Date.now());
				response.redirect('http://localhost:3000/kf5012');
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
	console.log('cleared cookies');
	console.log(Date.now());
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

//checks availability of a specific appointment
/*logic:
	pass in the start (x) and length of time (y), and who (z) with
	query DB with something like:
		SELECT * FROM mydb.appointments WHERE staff_staffID = z;
		
	IF (E1 <= S2 || S1 >= E2) THEN BOOK
	ELSE
	NOPE

*/

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


	console.log(email);
	console.log(staffID);
	console.log(date);
	console.log(cutID);
	console.log(duration);
	console.log(time_start);
	console.log(time_end);

	response.json({status: 'fucked'});


	/*function failed(error, inConn){ 
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

	if (staffID && date && time_start && customerID){
			connection.query(`SELECT customerID FROM mydb.customers WHERE email = ?`, [email], function(error, results){ // insert into cust table, escape strings for xtr validate
				if (error) failed(error, 1); // run failed function
				else custID = results[0]['customerID'];
			});
			connection.query(`SELECT duration FROM mydb.cuts WHERE cutID = ?`, [cutID], function(error, results){  // insert into user table, escape strings for xtr validate
				if (error) failed(error, 1); // run reg_failed function
				else duration = time_convert(results[0]['duration']);
				time_end = time_start + duration;
			});
			
			console.log(duration);
			console.log(staffID);
			console.log(date);
			console.log(time_start);
			console.log(email);
			console.log(time_end);

			/*
			connection.query('SELECT * from mydb.appointments WHERE staff_staffID = ? AND date = ?', function(error, results){
				if(error) failed(error, 1);
				else if (results){
					results.every(element=>{
						if ((time_end <= element['time']) || (time_start >= (element['time'] + duration))){
							connection.query('INSERT INTO mydb.appointments(date, time_start, time_end, staff_staffID) VALUES (?, ?, ?, ?);', [date, time_start, time_end, staff], function(error, results){
								if (error) response.json({error : error});
								response.json({state: 'booked', date: date, time_start: time_start, time_end: time_end, staff: staff});
							})
							return false;
						} else {
							response.json({state: 'not booked', reason: 'time unavailable'});
						}
					});
				} else {
					response.json({state: 'not booked', reason: 'error'});
				}
			});


	} else {
		
		failed(null, 0);

	}*/


});

app.post('/availability', function(request, response){
	/*let date = request.body.date;
	let time_start = request.body.time_start;
	let time_end = request.body.time_end;
	let booking = request.body.booking;
	let staff = request.body.staffID;

	connection.query('SELECT * FROM mydb.appointments WHERE date = ? AND staff_staffID = ?', [date, staff], function(error, results){
		if (error) throw error;
		
		else if (results){
			results.every(element=>{
				if ((time_end <= element['time_start']) || (time_start >= element['time_end'])){
					connection.query('INSERT INTO mydb.appointments(date, time_start, time_end, staff_staffID) VALUES (?, ?, ?, ?);', [date, time_start, time_end, staff], function(error, results){
						if (error) response.json({error : error});
						response.json({state: 'booked', date: date, time_start: time_start, time_end: time_end, staff: staff});
					})
					return false;
				} else {
					response.json({state: 'not booked', reason: 'time unavailable'});
				}
			});
		} else {
			response.json({state: 'not booked', reason: 'error'});
		}
	});
	*/
	response.json({state: 'coming soon'});
});

app.post('/editUser', function(request, response){
	/*let userID = request.body.userID;
	let fName = request.body.fName;
	let sName = request.body.sName;
	let email = request.body.email;
	response.json({message: 'coming soon'});*/
	//connection.query('UPDATE ')
});

app.post('/test')


app.post('/resetPassword', function(request, resposne){
	let email = request.body.email;
	let password = request.body.password;

	connection.query('UPDATE * FROM mydb.users(password) WHERE username = ? VALUES (?);' [email, password], function(error, results){
		if(error) response.json({error: error});
		else if (results) response.json({status: 'Updated'});
		else response.json({status: 'error'});
	});
	

	response.json({message: 'coming soon'});
});

app.listen(9999);