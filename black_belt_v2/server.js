// require express so that we can build an express app
var express = require('express');
var session = require('express-session');
// require path so that we can use path stuff like path.join
var path = require('path');
// instantiate the app
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// app.use(session({secret: 'ssshhhhh'}));


require('./config/mongoose.js');

require('./config/routes.js')(app);



// set up a static file server that points to the "client" directory
app.use(express.static(path.join(__dirname, './client')));
app.listen(8000, function() {
  console.log('cool stuff on: 8000');
})