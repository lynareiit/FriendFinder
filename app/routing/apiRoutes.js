// Link the routes to data source
var tableData = require("../friends");

// routes
module.exports = function(app) {

// API GET Requests
// Your apiRoutes.js file should contain two routes:
// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends
// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic

app.get("/api/friends", function(req, res) {
	res.json(friends);
});

app.post("/api/friends", function(req, res) {
	if (friends.length < 5) {
		friends.push(req.body);
		res.json(true);
	}
	else {
		// What could happen if the boolean is false?
		friends.push(req.body);
		res.json(false);
	}
});



// Don't need, but nice to have in order to clear table
  app.post("/api/clear", function() {
    // Empty out the arrays of data
    tableData = [];
    waitListData = [];

    console.log(tableData);
  });
};


// }