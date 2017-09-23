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
        resolve(response);
      }
    })
  });
  
}

module.exports.getReposByUsername = getReposByUsername;
