var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
app = express();

app.use(express.static(path.join(__dirname, "./client")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require("./config/mongoose.js");
require("./config/routes.js")(app);

app.listen(8018, function() {
	console.log("listening on port 8018");
})