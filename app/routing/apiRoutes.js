// Link the routes to data source
var path = require("path");
var friends = require("../data/friends");

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
// 	if (friends.length < 4) {
// 		friends.push(req.body);
// 		res.json(true);
// 	}
// 	else {
// 		// What could happen if the boolean is false?
// 		friends.push(req.body);
// 		res.json(false);
// 	}
// });
	var user = {
		name: req.body.name,
		photo: req.body.photo,
		scores: [
			req.body.q1,
			req.body.q2,
			req.body.q3,
			req.body.q4,
			req.body.q5,
			req.body.q6,
			req.body.q7,
			req.body.q8,
			req.body.q9,
			req.body.q10
		]
	};

	var matches = [];

	for (i = 0; i < friends.length; i++) {
		var delta = 0;
		var friend = friends[i];
		for (n = 0; n < friend.scores.length; n++) {
			delta += Math.abs(parseInt(user.scores[n] - friend.scores[n]))
		}
		matches.push(delta);
	}

	var index = 0;
	var delta = 100;
	var match;

	for (i = 0; i < matches.length; i++) {
		if (matches[i]) {
			match = i
		}
	}

	friends.push(user);
	res.send(friends[match]);
	});
}

// // Don't need, but nice to have in order to clear table
//   app.post("/api/clear", function() {
//     // Empty out the arrays of data
//     tableData = [];
//     waitListData = [];

//     console.log(tableData);
//   });
// };


// }