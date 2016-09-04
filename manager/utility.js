// manager/utility.js

var PlaceModel = require('../models/place')

module.exports = {
    //
    getPhotos: function(client, places, done) {
        //
        var count = 0;
        places.forEach(function(place, index, arrPlaces) {
            if(place.photos) {
                var photo_ref = place.photos[0].photo_reference
                count++
                //
                client.placesPhoto({
                    photoreference: photo_ref,
                    maxwidth: 100,
                    maxheight: 100
                }, function(err, response) {
                    count--
                    if(err) throw err
                    //
                    arrPlaces[index].pics = response
                    if(count === 0) {
                        done(arrPlaces)
                    }
                })
            }
        })
    },
    // Insert count
    getRSVPCount: function(placeId, done) {
        PlaceModel.aggregate([
            {
                $match: {
                    place_id: placeId
                }
            },
            {
                $project: {
                    count: { $size: '$rsvpUsers' }
                }
            }
        ], function(err, num) {
            if(err) throw err
            //
            if(num && num.length !== 0) {
                done(num[0].count)
            } else {
                done(0)
            }
        })
    }

}