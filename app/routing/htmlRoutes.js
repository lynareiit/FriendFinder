// path package to get the file path for the html page
var path = require("path");

// routes
module.exports = function(app) {

// Include two routes
// A GET Route to /survey which should display the survey page
// A default, catch-all route that leads to home.html which displays the home page
app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "../public/home.html"));
});
// -------- CATCH-ALL ROUTE? -----------
// If no matching route is found, default to home
app.get("/survey", function(req, res) {
	res.sendFile(path.join(__dirname, "../public/survey.html"))
});
};