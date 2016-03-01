var express  = require('express');
var port = 80;
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(__dirname +'/app'));

var Genre = require('./api/models/genres.js');
var Book = require('./api/models/books.js');

//Create instance of ;ongoose and connect to local
//MongoDB data
mongoose.connect('mongodb://localhost/database');

//Log to console any errors or a succesful connection.
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
	console.log("Connected to db at /database");
});

////////ROUTES

app.get('/', function(req, res){
	res.send('Please use /api/books or /api/genres');
});

app.get('/api/genres', function(req, res){
	Genre.getGenres(function(err, genres){
		if(err){
			throw err;
		}
		res.json(genres);
	});
});

app.post('/api/genres', function(req, res){
	var genre = req.body;
	Genre.addGenre(genre, function(err, genre){
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

app.put('/api/genres/:_id', function(req, res){
	var  id = req.params._id;
	var genre = req.body;
	Genre.updateGenre(id, genre, {}, function(err, genre){
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

app.delete('/api/genres/:_id', function(req, res){
	var  id = req.params._id;
	Genre.removeGenre(id, function(err, genre){
		if(err){
			throw err;
		}
		res.json(genre);
	});
});


app.get('/api/books', function(req, res){
	Book.getBooks(function(err, books){
		if(err){
			throw err;
		}
		res.json(books);
	});
});

app.get('/api/books/:_id', function(req, res){
	Book.getBookById(req.params._id,function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.post('/api/books', function(req, res){
	var book = req.body;
	Book.addBook(book, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.put('/api/books/:_id', function(req, res){
	var  id = req.params._id;
	var book = req.body;
	Book.updateBook(id, book, {}, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.delete('/api/books/:_id', function(req, res){
	var  id = req.params._id;
	Book.removeBook(id, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});





//////////////////////////////////////////////

//Connect to local host
app.listen(port, function(){
	//when I send an http request to THIS URL, it will connect whatever  I am sending it from to server.js
	console.log('listening on http://localhost:' + port);
	console.log('Stop server with CTRL + C');
});