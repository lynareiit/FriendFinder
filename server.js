// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Set up Express App
var app = express();
var PORT = process.env.PORT || 3000;

// Set up the Express App to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// application handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// require mysql
var mysql = require("mysql");

var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "friend_finder_db"
});

connection.connect(function(err) {
	if (err) {
		console.error("error connecting: " + err.stack);
		return;
	}

	console.log("connected as id " + connection.threadId);
});

// Root get route
app.get("../friends", function(req,res) {
	connection.query("SELECT * FROM tasks;", function(err, data) {
		if (err) throw err;
		// send render response to the index and pass the data through friends file
		res.render("index", { friends: data});
	});
});

// Post route, redirect back to home page
app.post("/", function(req, res) {
	connection.query("INSERT INTO (task) VALUES (?)", [req.body.friends], function(err, results) {
		if(err) throw err;

		res.redirect("../home")
	});
});

app.listen(port);