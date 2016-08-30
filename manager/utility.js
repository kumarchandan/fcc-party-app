// manager/utility.js

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
    }
}