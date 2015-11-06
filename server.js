var http = require('http');
var express = require('express');
var Resource = require('express-resource');
var bodyParser= require('body-parser');
var methodOverride= require('method-override');
var path = require('path');
var app = express();
app.use(bodyParser());
app.use(methodOverride());
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 3000);
app.set('ipaddr', process.env.OPENSHIFT_NODEJS_IP || "localhost");


var session = require('express-session');
app.use(session({
resave: false, // don't save session if unmodified
saveUninitialized: false, // don't create session until something stored
secret: 'shhhh, very secret'
}));




app.resource('login',require('./controllers/login.js'));
var def1=require('./controllers/default.js');
var def2=app.resource(def1);
def2.map("get","/log/out",def1.logout);

def2.map("post","/store/session",def1.store_session);


app.use(express.static(__dirname + '/views'));


var waterlineConfig = require('./config/waterline')
, waterlineOrm = require('./init/models').waterlineOrm;
var modelPath = path.join(__dirname, '/models');
//console.dir(modelPath);
require('./init/models')(modelPath);

waterlineOrm.initialize(waterlineConfig, function (err, models) {
    if (err) throw err;

	db = function (table) { return models['collections'][table]; };
    db.collections = models.collections;
    db.connections = models.connections;

    
});

var con=http.createServer(app).listen(app.get('port'),app.get('ipaddr'),function(){
	console.log("Server is Listening on Port 3000");
});


io = require('socket.io')(con);

io.on('connection', function(socket){
    console.log("*.*.*.*.*.*.*.*\nUser is connecting : "+socket.id);    
	io.emit('socket',socket.id);

});
