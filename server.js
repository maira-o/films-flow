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

// const uri = "mongodb+srv://mairao:mairao@cluster0.ontvx.mongodb.net/filmsflow?retryWrites=true&w=majority";

// const client = new MongoClient(uri, { useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

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

router.route('/films')
    // 1) method - create film (access: POST: http://localhost:8000/api/films)
    .post(function(req, res) {
        var film = new Film();
        // values of films
        film.name = req.body.name;
        film.origin = req.body.origin;
        film.year = req.body.year;
        film.director = req.body.director;
        film.genre = req.body.genre;
        film.language = req.body.language;
        film.status = req.body.status;

        film.save(function(error) {
            if(error) 
                res.send('erro ao tentar salvar um filme' + error); 
            
            res.json({ message: 'Uhuul, você adicionou mais um filme em Film & Flow!' });
        });
    })

    // 2) method - select films (access: GET: http://localhost:8000/api/films)
    .get(function(req, res) {
        Film.find(function(error, films) {
            if(error)
                res.send('erro ao tentar selecionar todos os produtos ' + error);
            
            res.json(films);
        });
    });


// all the routes will be prefixed with '/api'
app.use('/api', router);

// Starting the app (server)
app.listen(port);
console.log('Iniciando Film & Flow na porta ' + port);