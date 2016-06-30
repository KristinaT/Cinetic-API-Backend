  var express = require('express');
  var app = express();
  var bodyParser = require('body-parser');
  var mongoose = require('mongoose');

  app.use(bodyParser.json());
  // Add headers
  app.use(function (req, res, next) {
  	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // Pass to next layer of middleware
    next();
});
  Movie = require('./models/movie');
  //connect to Mongoose
  mongoose.connect('mongodb://test:test@ds023902.mlab.com:23902/ionicdb');

  var db=mongoose.connection;

  app.get('/', function (req,res) {
  	// body...
  	res.send('/api/movie');
  });

  app.get('/api/movie', function(req, res){
    var user = req.query.param;
        console.dir(user);
  	Movie.getMovie(user, function(err, movie){
  		if(err){
  			throw err;
  		}
  		res.json(movie);
  	});
  });

  app.post('/api/movie', function(req, res){
    console.dir(req.body.userId);
    console.dir(req.body.Search);
    var user = req.body.userId;
  	var movie = req.body.Search;
  	Movie.addMovie(user, movie, function(err, movie){
  		if(err){
  			res.send(err);
  		}
  		res.json(movie);
  	});
  });

  app.get('/api/movie/:id', function(req, res){
  	Movie.getMovieById(req.params.id, function(err, movie){
  		if(err){
  			res.send(err);
  		}
  		res.json(movie);
  	});
  });

  app.put('/api/movie/:id', function(req, res){
  	var id =  req.params._id;
  	var movie = req.body;
  	Movie.updateMovie(id, movie, function(err, movie){
  		if(err){
  			res.send(err);
  		}
  		res.json(movie);
  	});
  });
  app.delete('/api/movie/:id', function(req,res){
    var name = req.query.name;
    var id = req.params.id;
  	Movie.removeMovie(id, name, function(err, movie){
  		if(err){
  			res.send(err);
  		}
  		res.json(movie);
  	});
  }); 
  
  app.listen(3000);
  console.log('running on port 3000...'); 