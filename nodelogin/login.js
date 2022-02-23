const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodelogin'
});

const app = express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/auth', function(req, res){
    let username = req.body.username;
    let password = req.body.password;

    if (username && password){
        connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function( error, results, fields){
            if (error) throw error;

            if (results.lenth > 0){
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/home');
            } else {
                res.send('Incorrect username and/or password');
            }
            res.end();
        });
    } else {
        res.send('Please enter username and password.');
        res.end();
    }
});

app.get('/home', function (req, res){
    if (req.session.loggedin){
        res.send('Welcome back, ' + req.session.username);
    } else {
        res.send('Please login!');
    }
    res.send
});

app.listen(3000);