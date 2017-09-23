const express = require('express');
const getReposByUsername = require('../helpers/github.js')
const db = require('../database/index.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {

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
  	getReposByUsername.getReposByUsername(result.term).then((response) => {
      var results = JSON.parse(response.body);
      var repos = [];
      results.items.forEach(function(repo, index) {
        if (index < 25) {
          var repoObj = {};
          repoObj.username = repo.owner.login;
          repoObj.reponame = repo.name
          repoObj.updated = repo.updated_at;
          repoObj.url = repo.svn_url;
          repos.push(repoObj);
        }
      })
      db.save(repos).then(function(repos) {
        res.send('Post request was saved');
      })
      .catch(function(error){
        res.sendStatus(500);
      })
      // db.save(repos, function(err, obj) {
      //   if (err) {
      //     console.log(err);
      //     // numRecordsToBeSaved--;
      //   } else {
      //     // numSuccessfullySaved++;
      //     console.log("record added (from getRepos): ", obj);
      //   }
      // }); 
      
    });
    // .error(function(error) {
    //   res.sendStatus(500);
    // });
  	
  	// res.send('Post request to repos');
  })
});

app.get('/repos', function (req, res) {
  var body = [];
  req.on('data', function(chunk) {
  	body.push(chunk);
  })
  req.on('end', function() {
    db.find({}, function(err, repos) { 
  		if (err) {
  			console.log(err);
  		} else {
  			res.end(JSON.stringify(repos));
  		}
  	})
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

