var mongoose = require('mongoose');

//schema
var movieSchema = mongoose.Schema({

	
	userId:{
		type: String,
		required: true
	},

	/*
	imdbID: {
		type:String,
		required: true
	},

	Title:{
		type: String,
		required: true
	},
	Poster:{
		type: String
	},
	Year:{
		type: String
	}, 
	*/

	Search: {
		type: Array
	}
});

var Movie = module.exports = mongoose.model('Movie', movieSchema);

//Get watchlist
module.exports.getMovie = function (user,callback, limit) {
	var user = { "userId": user };
	console.log(user);
	Movie.find(user,callback);
}

module.exports.getMovieById = function (movie, callback) {
	var query = {imdbID: movie}
	Movie.find(query, callback);
}

module.exports.addMovie = function (user, movie, callback) {
	var query = {userId: user};
	var mov = {$push: {Search: movie}};
	var safe =  {safe: true, upsert: true};
	Movie.update(query,mov,safe,callback);
}

module.exports.updateMovie = function (id, movie, callback) {
	var query = {imdbID: id};
	var update = {
		title: movie.title
	}
	Movie.findOneAndUpdate(query, update, options,movie, callback);
}

module.exports.removeMovie = function (id, callback) {
	var query = {imdbID: {'$in':id}};
	Movie.remove(query, callback);
}