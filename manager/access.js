// manager/access.js : External APIs call

var googleKey = require('../config/auth').googleData.mapAPIKey
var googleMapClient = require('@google/maps').createClient({
    key: googleKey
})

var utility = require('./utility')

// Get GeoCode [ Lat, Lon, PlaceId ]
function getLL(req, res, next) {
    //
    var location = req.query.location
    //
    if(location) {
        // Update Session as well
        req.session.searchText = location
        //
        googleMapClient.geocode({
            address: location
        }, function(err, response) {
            //
            if(err) throw err
            //
            res.status(200).json({
                data: response.json.results
            })
        })
    } else {
        res.status(200).json({
            data: null,
            msg: 'Empty location'
        })
    }
}

// Get Places by LatLng
function getPlaces(req, res, next) {
    //
    var latlng = JSON.parse(req.query.latlng)
    //
    if(latlng) {
        var locArr = []
        locArr.push(latlng.lat)
        locArr.push(latlng.lng)
        //
        googleMapClient.places({
            language: 'en',
            location: locArr,
            radius: 5000,       // meter
            types: ['bar', 'night_club']
        }, function(err, results) {
            //
            if(err) throw err
            //
            var data = results.json.results
            var pagetoken = results.json.next_page_token
            //
            if(data && data.length !== 0) {
                //
                data.forEach(function(place, index, dataArray) {
                    // Get RSVP count for each place from DB (if exists)
                    utility.getRSVPCount(place.place_id, function(count) {
                        dataArray[index].count = count
                        //
                        if(index === data.length - 1) {
                            res.status(200).json({
                                data: data,
                                pagetoken: pagetoken
                            })
                        }
                    })
                })
            }
        })
    } else {
        res.status(200).json({
            data: null,
            msg: 'No data for you!'
        })
    }
}

// Next Places
function nextPlaces(req, res, next) {
    //
    var pagetoken = req.query.pagetoken
    //
    if(pagetoken) {
        googleMapClient.places({
            pagetoken: pagetoken
        }, function(err, results) {
            //
            if(err) throw err
            //
            var data = results.json.results
            var pagetoken = results.json.next_page_token
            //
            res.status(200).json({
                data: data,
                pagetoken: pagetoken
            })
        })
    } else {
        res.status(200).json({
            data: null,
            msg: 'No data for you!'
        })
    }
}

//
module.exports = {
    getLL: getLL,
    getPlaces: getPlaces,
    nextPlaces: nextPlaces
}

