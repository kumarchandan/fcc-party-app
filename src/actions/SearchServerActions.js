// SearchServerActions.js

var SearchConstants = require('../constants/SearchConstants')
var AppDispatcher = require('../dispatcher/AppDispatcher')

var SearchServerActions = {
    //
    getPlaces: function(data) {
        AppDispatcher.handleServerAction({
            actionType: SearchConstants.GET_PLACES_RESPONSE,
            data: data
        })
    },
    //
    getStoredSearch: function(data) {
        AppDispatcher.handleServerAction({
            actionType: SearchConstants.GET_STORED_SEARCH_RESPONSE,
            data: data
        })
    }
}

module.exports = SearchServerActions