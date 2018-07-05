var mysql      = require('mysql');
var express = require('express');
var path = require('path');
var router = express.Router();

var sql = "INSERT INTO Purchase SET ?";
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
	.get(function(req, res) {
		console.log('SignUp Page!');
		res.sendFile(path.join(__dirname, '../site', 'signup.html'));
	})
	.post(function(req, res) {
		console.log('processing....');
		
		// Variables to hold the form values
		var purchase = {
			"Email":req.body.email,
			"Password":req.body.psw,
			"CreditCard":req.body.credit,
			"ShippingAddress":req.body.address,
			"ZipCode":req.body.zip,
		};
		var RepPassword = req.body.pswrepeat;
		
		console.log(purchase);
		
		//Here we check for the password match
		if(purchase.Password != RepPassword) {
			console.log('SignUp FAIL!');
			res.sendFile(path.join(__dirname, '../site', 'signup_fail.html'));
		} else {
			console.log('SignUp SUCCESS!');					
			//Here we check if the database is updating!
			db.query(sql, purchase, function (error, results, purchase) {
				if(error) {
					console.log('DB ERROR: Purchase not updated!');
					res.sendFile(path.join(__dirname, '../site', 'signup_fail.html'));
				} else {
					console.log('DB SUCCESS! ', results);
					res.sendFile(path.join(__dirname, '../site', 'success.html'));
				}
			});
		}

	});
	
module.exports = router;
