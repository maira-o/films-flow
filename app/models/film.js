/**
 * 
 * File: film.js
 * Author: Maíra Oliveira
 * Description: File responsible to handle the model of class 'Film'
 * 
 */

 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;

 /**
  * 
  * Film:
  * - id: int
  * - name: String
  * - origin: String
  * - year: Number
  * - director: String
  * - genre: String
  * - language: String
  * - status: String
  * 
  */

  var FilmSchema = new Schema({
    name: String,
    origin: String,
    year: Number,
    director: String,
    genre: String,
    language: String,
    status: String
  });