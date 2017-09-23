const request = require('request');
const config = require('../config.js');
const db = require('../database/index.js');

let getReposByUsername = (term) => {

  let options = {
    url: 'https://api.github.com/search/repositories?q=user:'+ term + '&sort=updated&order=desc',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  return new Promise(function(resolve, reject) {
    request.get(options, function(error, response) {
      // console.log("error", error);
      if (error) {
        reject(error);
      } else {
        resolve(response)
      }
    })
  }).then((response) => {
      var results = JSON.parse(response.body);
      var repos = [];
      // var counter = 0;
      //refactor this function to send an array of objects to save
      //then wait for save's response
      //then....?? call server get function?
      // var numRecordsFound = results.items.length;
      // var numRecordsToBeSaved = numRecordsFound;
      // var numSuccessfullySaved = 0;
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
      db.save(repos, function(err, obj) {
        if (err) {
          console.log(err);
          // numRecordsToBeSaved--;
        } else {
          // numSuccessfullySaved++;
          console.log("record added (from getRepos): ", obj);
        }
      }); 
      // if (numSuccessfullySaved === )
    });
  
}

module.exports.getReposByUsername = getReposByUsername;
