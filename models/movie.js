var mongoose = require('mongoose');

//schema
var movieSchema = mongoose.Schema({

	/*	
	userId:{
		type: String,
		required: true
	},
	
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
		type: Object
	}
});

var Movie = module.exports = mongoose.model('Movie', movieSchema);

//Get watchlist
module.exports.getMovie = function (callback, limit) {
	Movie.find(callback).limit(limit);
}

module.exports.getMovieById = function (movie, callback) {
	var query = {imdbID: movie}
	Movie.find(query, callback);
}

module.exports.addMovie = function ( movie,callback) {
	Movie.create(movie, callback);
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