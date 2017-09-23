const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: Number,
  username: String,
  repoame: String,
  pushdate: Date,
  url: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoObj) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  return new Repo(repoObj);
}

let find = (keyValuePair, callback) => {
	Repo.find(keyValuePair, callback);
}

module.exports.save = save;