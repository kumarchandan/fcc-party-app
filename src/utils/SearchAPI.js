// utils/SearchAPI.js

var SearchServerActions = require('../actions/SearchServerActions')
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
            if(ll) {
                self.getPlaces(ll)
            }
        })
    },
    // Lookup places using latitude and longitude
    getPlaces: function(latlng) {
        request.get('/api/places?latlng='+latlng).end(function(err, res) {
            //
            if(err) throw err
            //
            console.log(res.body.data)
            SearchServerActions.getPlaces(res.body.data)
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
    },
    // Get Stored Search
    getStoredSearch: function() {
        var self = this
        request.get('/api/storedsearch').end(function(err, res) {
            //
            if(err) throw err
            //
            var data = res.body.data
            if(data.searchText) {
                self.getLL(data.searchText)
            } else {
                return false
            }
        })
    }
}