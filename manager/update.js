// manager/update.js

var UserModel = require('../models/user')
var PlaceModel = require('../models/place')

var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

//
function doRSVP(req, res, next) {
    //
    var username = req.body.username
    var placeId = req.body.placeId
    // Check if Client and Server user are same
    if(username === req.user.username) {
        // Check if User RSVPed already
        UserModel.findOne({ username: username, rsvpPlaces: placeId })
            .then(function(doc) {
                if(doc && doc.length !== 0) {
                    res.status(200).json({
                        data: {
                            placeId: placeId,
                            count: null,
                            msg: 'You already RSVPed pal! :)'
                        }
                    })
                } else { // RSVP now
                    // Update User : rsvpPlaces
                    UserModel.update({ username: username }, { $push: { rsvpPlaces: placeId } })
                        .then(function(doc) {
                            if(doc) {
                                // If Place was RSVPed before
                                PlaceModel.findOne({ place_id: placeId })
                                    .then(function(doc) {
                                        if(doc && doc.length !== 0) { // place exists in db, update just rsvpUsers
                                            //
                                            PlaceModel.update({ place_id: placeId }, { $push: { rsvpUsers: username } })
                                                .then(function(doc) {
                                                    //
                                                    if(doc) {
                                                        // Respond with Count of RSVPed users
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
                                                            res.status(200).json({
                                                                data: {
                                                                    placeId: placeId,
                                                                    count: num[0].count,
                                                                    msg: 'You RSVPed Successfully!'
                                                                }
                                                            })
                                                        })
                                                    } 
                                                })
                                        } else {    // new Place, Save place_id and rsvpUsers
                                            var newPlace = new PlaceModel()
                                            newPlace.place_id = placeId
                                            newPlace.rsvpUsers.push(username)
                                            // Save
                                            newPlace.save(function(err, newplace) {
                                                if(err) throw err
                                                //
                                                res.status(200).json({
                                                    data: {
                                                        placeId: placeId,
                                                        count: 1,
                                                        msg: 'You RSVPed Successfully!'
                                                    }
                                                })
                                            })
                                        }
                                    })
                            }
                        })
                }
            })
            .catch(function(err) {
                throw err
            })
    } else {
        res.status(200).json({
            data: null,
            msg: 'User mismatch!'
        })
    }
}

//
module.exports = {
    doRSVP: doRSVP
}