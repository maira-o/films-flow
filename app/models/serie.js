/**
 * 
 * Serie: serie.js
 * Author: Maíra Oliveira
 * Description: File responsible to handle the model of class 'Film'
 * 
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * 
 * Serie:
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

 var SerieSchema = new Schema({
   name: String,
   origin: String,
   year: Number,
   creator: String,
   genre: String,
   language: String,
   status: String
 });

 module.exports = mongoose.model('Serie', SerieSchema);