// models/place.js

var mongoose = require('mongoose')
var Schema = mongoose.Schema

// Schema : Places
var placeSchema = new Schema({
    id: String,
    place_id: String,
    name: String,
    icon: String,
    rating: Number,
    formatted_address: String,
    open_now: Boolean,
    rsvpUsers: []           // Twitter usernames
})

module.exports = mongoose.model('Place', placeSchema)