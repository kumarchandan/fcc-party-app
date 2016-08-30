// models/user.js

var mongoose = require('mongoose')
var Schema = mongoose.Schema

// define schema for our user model
var userSchema = new Schema({
    username: String,
    displayName: String,
    email: String,
    password: String,
    rsvpPlaces: []      // place_ids
})

// create the model for user and expose
module.exports = mongoose.model('User', userSchema)     // 3rd argument's for collection name =>  http://stackoverflow.com/questions/5794834/how-to-access-a-preexisting-collection-with-mongoose