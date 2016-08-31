// manager/access.js : External APIs call

var utility = require('./utility')

//
var googleMapClient = require('@google/maps').createClient({
    key: 'AIzaSyACJE0m7CZa8mQLlVRbVTTwKZlMfa6myPM'
})

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
            // Prepare Photos
            if(data && data.length !== 0) {
                //
                res.status(200).json({
                    data: data,
                    pagetoken: pagetoken
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

// Get temporary stored data from session
function getStoredSearch(req, res, next) {
    //
    var placeId = req.session.placeId
    var searchText = req.session.searchText
    //
    res.status(200).json({
        data: {
            placeId: placeId || null,
            searchText: searchText || null
        }
    })
}


//
module.exports = {
    getLL: getLL,
    getPlaces: getPlaces,
    nextPlaces: nextPlaces,
    getStoredSearch: getStoredSearch
}

