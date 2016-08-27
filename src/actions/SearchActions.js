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
    }
}

//
module.exports = SearchActions