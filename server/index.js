const express = require('express');
const getReposByUsername = require('../helpers/github.js')
const db = require('../database/index.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  
  var body = [];
  req.on('data', function(chunk) {
  	body.push(chunk);
  })
  req.on('end', function() {
  	var result = [].concat(body).toString();
  	result = JSON.parse(result);
  	console.log(result.term);
  	getReposByUsername.getReposByUsername(result.term);
  	
  	res.send('Post request to repos');
  })

  
  
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  // how do i get the username here?
  // console.log(req.body);
  var body = [];
  req.on('data', function(chunk) {
  	body.push(chunk);
  })
  req.on('end', function() {
  	// var result = [].concat(body).toString();
  	// console.log("result in app.get is: ", result);
  	// result = JSON.parse(result);
  	// console.log("get request body", result.term);
  	db.find({username: "jtleek"}, function(err, repos) {
  		if (err) {
  			console.log(err);
  		} else {
  			// console.log('repos in app.get', repos)
  			res.end(JSON.stringify(repos));
  		}
  	})
  })

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

