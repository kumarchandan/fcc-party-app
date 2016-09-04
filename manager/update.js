// manager/update.js


var PlaceModel = require('../models/place')
var UserModel = require('../models/user')
var utility = require('./utility')      // getRSVPCount

var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

//
function doRSVP(req, res, next) {
    //
    var username = req.body.username
    var placeId = req.body.placeId
    // Check if User RSVPed already
    UserModel.findOne({ username: username, rsvpPlaces: placeId })
        .then(function(doc) {
            if(doc && doc.length !== 0) {
                // RSVPed already, so Remove placeId from rsvpPlaces of Users
                UserModel.update(
                    {
                        username: username 
                    },
                    {
                        $pull: {
                            rsvpPlaces: placeId
                        }
                    })
                    .then(function(doc) {
                    if(doc) {
                        // Now Remove username from rsvpUsers of Places
                        PlaceModel.update(
                            {
                                place_id: placeId
                            },
                            {
                                $pull: {
                                    rsvpUsers: username
                                }
                            })
                            .then(function(doc) {
                            if(doc) {
                                utility.getRSVPCount(placeId, function(count) {
                                    res.status(200).json({
                                        data: {
                                            placeId: placeId,
                                            count: count,
                                            msg: 'You are removed Successfully!'
                                        }
                                    })
                                })
                            }
                        })
                    }
                })
            } else { // RSVP now
                // Update User : rsvpPlaces
                UserModel.update(
                    { 
                        username: username 
                    }, 
                    { 
                        $push: { 
                            rsvpPlaces: placeId 
                        } 
                    })
                    .then(function(doc) {
                        if(doc) {
                            // If Place was RSVPed before
                            PlaceModel.findOne({ place_id: placeId })
                                .then(function(doc) {
                                    if(doc && doc.length !== 0) { // place exists in db, update just rsvpUsers
                                        //
                                        PlaceModel.update(
                                            { 
                                                place_id: placeId 
                                            }, 
                                            { 
                                                $push: { 
                                                    rsvpUsers: username 
                                                } 
                                            })
                                            .then(function(doc) {
                                                //
                                                if(doc) {
                                                    // Respond with Count of RSVPed users
                                                    utility.getRSVPCount(placeId, function(count) {
                                                        res.status(200).json({
                                                            data: {
                                                                placeId: placeId,
                                                                count: count,
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
}

//
module.exports = {
    doRSVP: doRSVP
}