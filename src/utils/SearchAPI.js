// utils/SearchAPI.js

var request = require('superagent')

module.exports = {
    // Get Longitude and Latitude of Location
    getLL: function(location) {
        var self = this
        request.get('/api/ll?location='+location).end(function(err, res) {
            //
            if(err) throw err
            //
            console.log(res.body.data)
            var ll = res.body.data[0].geometry.location     // Lat and Lon Object
            ll = JSON.stringify(ll)
            //
            self.findPlaces(ll)
        })
    },
    // Lookup places using latitude and longitude
    findPlaces: function(latlon) {
        request.get('/api/places?latlon='+latlon).end(function(err, res) {
            //
            if(err) throw err
            //
            debugger
            console.log(res.body.data)
        })
    },
    // Lookup Places using nextpagetoken
    nextPlaces: function(nextpagetoken) {
        request.get('/api/nextplaces?nextpagetoken='+nextpagetoken).end(function(err, res) {
            //
            if(err) throw err
            //
            console.log(res.body.data)
        })
    }
}