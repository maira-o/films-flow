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
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var Film = require('./app/models/film');

const uri = 'mongodb+srv://mairao:mairao@cluster0.ontvx.mongodb.net/films-flow?retryWrites=true&w=majority';

MongoClient.connect(uri, { useUnifiedTopology: true }, (err, db) => {
    assert.strictEqual(null, err);
    // ...
    db.close();
});

// mongoose.connect('mongodb://localhost/films-flow');

// Setup of the variables app to use bodyParser    
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Defining a port where the api will be executed
var port = process.env.port || 8000;

// ====================
// *** ROTAS DA API ***
// ====================

// Creating an instance via express
// I'll move the routers to a specific folder
var router = express.Router();


// middleware
router.use(function(req, res, next) {
    console.log('algo está acontecendo aqui...');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'Olá, vc está em Film & Flow!' })   
});

// ====================
// *** APIs ***
// ====================

// all the routes will be prefixed with '/api'
app.use('/api', router);

// Starting the app (server)
app.listen(port);
console.log('Iniciando Film & Flow na porta ' + port);