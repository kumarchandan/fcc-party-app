// SearchActions.js

var SearchConstants = require('../constants/SearchConstants')
var AppDispatcher = require('../dispatcher/AppDispatcher')
var SearchAPI = require('../utils/SearchAPI')

var SearchActions = {
    //
    getLL: function(location) {
        //
        AppDispatcher.handleAction({
            actionType: SearchConstants.GET_LL
        })
        //
        SearchAPI.getLL(location)
    },
    //
    nextPlaces: function(nextpagetoken) {
        //
        AppDispatcher.handleAction({
            actionType: SearchConstants.NEXT_PLACES
        })
        //
        SearchAPI.nextPlaces(nextpagetoken)
    },
    doRSVP: function(username, placeId) {
        //
        AppDispatcher.handleAction({
            actionType: SearchConstants.DO_RSVP
        })
        //
        SearchAPI.doRSVP(username, placeId)
    }
}

//
module.exports = SearchActions