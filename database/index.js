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

let save = (repoObj) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  var obj =  new Repo(repoObj);

  obj.save(function (err, obj) {
  if (err) {

  	return console.error(err);
  }

});

}

let find = (keyValuePair, callback) => {
	Repo.find(keyValuePair, callback);
}

find({username: "jtleek"}, function(err, results) {
	console.log("from database file: ", results);
	console.log(err);
})

module.exports.save = save;
module.exports.find = find;