var mysql      = require('mysql');
var express = require('express');
var io = require('socket.io')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'kong'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});
connection.query('SELECT * FROM Sensor WHERE SensorTemperature = ?',[SensorTemp], function (error, results, fields) {
  if (error) {
      console.log("error ocurred",error)
  }else{
      console.log(SensorTemp)
  }
});
connection.query('SELECT * FROM Sensor WHERE SensorHumidity = ?',[SensorHumid], function (error, results, fields) {
  if (error) {
      console.log("error ocurred",error)
  }else{
      console.log(SensorHumid)
  }
});
connection.query('SELECT * FROM Sensor WHERE SensorDT = ?',[SensorDT], function (error, results, fields) {
  if (error) {
      console.log("error ocurred",error)
  }else{
      console.log(SensorDT)
  }
});
connection.query('SELECT * FROM login WHERE Username = ?',[username], function (error, results, fields) {
  if (error) {
      console.log("error ocurred",error)
  }else{
      console.log(username)
  }
});
