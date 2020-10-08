var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const UserSchema = new Schema({
    user: String,
    password: String,
    email: String
}, {
    versionKey:false
});

module.exports = mongoose.model("User", UserSchema);