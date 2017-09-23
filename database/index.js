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

// let findAll = 

let save = (repoObj) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  find({username: repoObj.username, reponame: repoObj.reponame}, function(err, result) {
    if (err) {
      console.log(error);
    } else {
      if (result.length === 0) {
        var obj =  new Repo(repoObj);
        obj.save(function (err, obj) {
          if (err) {

            return console.error(err);
          }
          console.log("record added: ", obj);
        });
      }
    }
  });
}



// db.Repo.drop();

// find({username: "jtleek"}, function(err, results) {
// 	console.log("from database file: ", results);
// 	console.log(err);
// })

module.exports.save = save;
module.exports.find = find;