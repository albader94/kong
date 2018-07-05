var express    = require('express');
var register = require('/home/pi/Desktop/kong/routes/registerroutes');
var login = require('/home/pi/Desktop/kong/routes/loginroutes');
var bodyParser = require('body-parser');
var app = express();

var path = require('path');
var public = path.join(__dirname, '');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/register', register);
app.use('/login', login);
app.get('/', function(req, res){
	console.log('HOME!');
	res.sendFile(path.join(public, 'Kong Grow.html'));
});
app.post('/', function(req, res){
	console.log('HOME!');
	res.sendFile(path.join(public, 'Kong Grow.html'));
});
app.use('/', express.static(public));	

app.listen(9000);

