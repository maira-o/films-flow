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

mongoose.connect('mongodb+srv://mairao:<maira123>@cluster0.ontvx.mongodb.net/<films-flow>?retryWrites=true&w=majority');

// mongoose.connect('mongodb://localhost/films-flow');

// Setup of the variables app to use bodyParser    
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Defining a port where the api will be executed
var port = process.env.port || 8000;

// Creating an instance via express
// I'll move the routers to a specific folder
var router = express.Router();

// Example of a route
router.get('/', function(req, res) {
res.json({ message: 'Olá, bem vinda a Film & Flow!' })
});

// all the routes will be prefixed with '/api'
app.use('/api', router);

// Starting the app (server)
app.listen(port);
console.log('Iniciando Film & Flow na porta ' + port);