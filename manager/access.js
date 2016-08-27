// manager/access.js : External APIs call

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

// Look for places
function findPlaces(req, res, next) {
    //
    var latlon = JSON.parse(req.query.latlon)
    debugger
    //
    if(latlon) {
        var locArr = []
        locArr.push(latlon.lat)
        locArr.push(latlon.lng)
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
            var pagetoken = data.next_page_token
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
            var pagetoken = data.next_page_token
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
    findPlaces: findPlaces,
    nextPlaces: nextPlaces
}

