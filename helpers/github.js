const request = require('request');
const config = require('../config.js');
const db = require('../database/index.js');

let getReposByUsername = (term) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
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

      
      // console.log(repos);
    })
  }).then((response) => {
      // console.log("body", body);
      var results = JSON.parse(response.body);
      // console.log("response", results.items);
      var repos = [];
      
      results.items.forEach(function(repo, index) {
        if (index < 25) {
          var repoObj = {};
          repoObj.username = repo.owner.login;
          repoObj.reponame = repo.name
          repoObj.updated = repo.updated_at;
          repoObj.url = repo.svn_url;
          repos.push(repoObj);
          db.save(repoObj);
        }
        
      })
    });
  
}

module.exports.getReposByUsername = getReposByUsername;

/*
var url = 'https:\//\//api.github.com/search/repositories?q=user:'+ term 
    //+ '&sort=updated&order=desc'
    // var url = 'https:\//\//api.github.com/search/repositories';
    $.ajax({
      url: url,
      method: "GET",
      data: {
        access_token: module.exports.TOKEN,
        // q: term
        sort: "updated",
        order: "desc"
      },
      success: function(data) {
        console.log("success: ", data);
      },
      error: function(error) {
        console.log("error: ", error);
      }
    })

    */