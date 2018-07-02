var mysql      = require('mysql');
var express = require('express');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Garrett1',
  database : 'kong'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});

exports.register = function(req,res){
  // console.log("req",req.body);
  var login={
      "Username":req.body.txtusername
	"password":req.body.txtPassword,
	}
var purchase={
	"password":req.body.txtPassword,
	"email":req.body.Email,
      "Cardnum" :req.body.CreditCard,
      "ShipAdd":req.body.ShippingAddress,
      "zipcode":req.body.ZipCode,
  }
  connection.query('INSERT INTO purchase SET ?',purchase, function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    response.sendfile('signup_fail.html')
  }else{
    console.log('The solution is: ', results);
    response.sendfile('data.html');
  }
  });
}
connection.query('INSERT INTO login SET ?',login, function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    response.sendfile('signup_fail.html')
  }else{
    console.log('The solution is: ', results);
    response.sendfile('data.html');
  }
  });
}
exports.login = function(req,res){
  var email= req.body.email;
  var password = req.body.Password;
  connection.query('SELECT * FROM purchase WHERE email = ?',[email], function (error, results, fields) {
  if (error) {
    // console.log("error ocurred",error);
    response.sendfile('kong_grow_fail.html')
  }else{
    // console.log('The solution is: ', results);
    if(results.length >0){
      if([0].password == password){
        response.sendfile('data.html');
      }
      else{
        ressponse.sendfile('kong_grow_fail.html');
      }
    }
    else{
      response.sendfile('kong_grow_fail.html');
    }
  }
  });
}
