const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: Number,
  username: String,
  reponame: String,
  updated: Date,
  url: String
});

let Repo = mongoose.model('Repo', repoSchema);

let find = (keyValuePair, callback) => {
  Repo.find(keyValuePair, callback).sort('-updated').limit(25);
}


let save = (repoObjs, callback) => {
  

  // function asyncMap(tasks, callback) {
  //   var arrayOfPromises = tasks.map(function(task){
  //     return new Promise(task);
  //   });
  //   return Promise
  //     .all(arrayOfPromises)
  //     .then( function(values){
  //       callback(values);
  //     })
  // }

  var arrayOfSaves = repoObjs.map(function(repoObj) {
    find({username: repoObj.username, reponame: repoObj.reponame}, function(err, result) {
      if (err) {
        console.log(error);
      } else {
        if (result.length === 0) {
          var obj =  new Repo(repoObj);
          return obj.save();
        }
      }
    });
  });

  return Promise.all(arrayOfSaves);

  // repoObjs.forEach(function(repoObj) {
  //   find({username: repoObj.username, reponame: repoObj.reponame}, function(err, result) {
  //     if (err) {
  //       console.log(error);
  //     } else {
  //       if (result.length === 0) {
  //         var obj =  new Repo(repoObj);
  //         obj.save(function (err, obj) {
  //           if (err) {
  //             // return console.error(err);
  //             return callback(err, null);
  //           } else {
  //             callback(null, repoObj);
  //             // console.log("record added: ", obj);
  //           }
            
  //         });
  //       }
  //     }
  //   });
  // })
}


module.exports.save = save;
module.exports.find = find;