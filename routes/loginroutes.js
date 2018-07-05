var mysql      = require('mysql');
var express = require('express');
var path = require('path');
var router = express.Router();

var sql = 'SELECT * FROM Purchase WHERE Email = ? AND Password = ?';
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'kong'
});

db.connect(function(err){
	if(!err) {
		console.log("Database is connected ... nn");
	}else {
		console.log("Error connecting database ... nn");
	}
});

router.use(function(req, res, next){
	console.log(req.method, req.url);
	next();
});

// Here we're dealing with the get and post methods for /register
router.route('/')
	.post(function(req, res) {
		console.log('processing....');
		
		// Variables to hold the form values
		var login = {
			"Email":req.body.email,
			"Password":req.body.password,
		};
		
		console.log(login.Email, login.Password);					
		//Here we check if the data exsists is updating!
		db.query(sql, [login.Email, login.Password], function (error, results) {
			if(error) {
				console.log('DB ERROR: User and pass not matching');
				res.sendFile(path.join(__dirname, '../site', 'kong_grow_fail.html'));
			} else {
				console.log('DB SUCCESS! ', results);
				res.sendFile(path.join(__dirname, '../site', 'data.html'));
			}
		});

	});
	
module.exports = router;

