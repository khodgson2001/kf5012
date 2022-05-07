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

router.get('/', function(request,response){
    response.send("Please specify an action.");
    response.end();
})

//checks availability of a specific appointment
/*logic:
	pass in the start (x) and length of time (y), and who (z) with
	query DB with something like:
		SELECT * FROM mydb.appointments WHERE staff_staffID = z;
		
	IF (E1 <= S2 || S1 >= E2) THEN BOOK
	ELSE
	NOPE

*/
router.get('/availability', function(request, response){
	/*let date = request.date;
	let time_start = request.time_start;
	let time_end = request.time_end;
	let booking = request.booking;

	connection.query('SELECT * FROM mydb.appointments WHERE date = ?', date, function(error, results){
		if (error) throw error;
		
		else if (results){
			if (time_start >= results.)
		}

	});
	*/
	response.send('coming soon');
});

module.exports = router;
