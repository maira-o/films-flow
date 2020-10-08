/**
 * 
 * File: server.js
 * Description:
 * Author: Maíra Oliveira
 * 
 */

// setup app 
// call the packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const filmRoute = require('./routes/film_route');
const serieRoute = require('./routes/serie_route');

// Setup of the variables app to use bodyParser    
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Defining a port where the api will be executed
var port = process.env.port || 8000;

mongoose.connect('mongodb://localhost/films-flow', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
  }).then(()=> {
    console.log('BD conectado');
  })
  .catch((error)=> {
    console.log('Error ao conectar ao BD');
  });
mongoose.Promise = global.Promise;

var router = express.Router();

// middleware
router.use(function(req, res, next) {
    console.log('algo está acontecendo aqui...');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'Olá, vc está em Film & Flow!' })   
});

app.use('/api/films', filmRoute);
app.use('/api/series', serieRoute);

// Starting the app (server)
app.listen(port);