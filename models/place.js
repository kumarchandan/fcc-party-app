// models/place.js

var mongoose = require('mongoose')
var Schema = mongoose.Schema

// Schema : Places
var placeSchema = new Schema({
    place_id: String,
    rsvpUsers: []           // Twitter usernames
})

module.exports = mongoose.model('Place', placeSchema)