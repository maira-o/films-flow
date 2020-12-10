/**
 * 
 * File: app.js
 * Description: App Starter
 * Author: Maíra Oliveira
 * 
 */

// setup app 
// call the packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Import routes
const filmRoute = require('./app/routes/film_route');
const serieRoute = require('./app/routes/serie_route');
const userRoute = require('./app/routes/user_route');

// Import user_controller to verify token
const controller = require('./app/controller/user_controller');

// Setup of the variables app to use bodyParser    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
    console.log("hora do request: " + Date.now());
    console.log("método: " + req.method)
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'Olá, vc está em Film & Flow!' })   
});

// app.use('/api/films', filmRoute);
app.use('/api/films', controller.validateToken, filmRoute);
// app.use('/api/series', serieRoute);
app.use('/api/series', controller.validateToken, serieRoute);

app.use('/api/users', userRoute);

// Starting the app (server)
app.listen(port);