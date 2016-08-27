// stores/SearchStore.js

var AppDispatcher = require('../dispatcher/AppDispatcher')
var SearchConstants = require('../constants/SearchConstants')

var EventEmitter = require('events').EventEmitter
var _ = require('underscore')

// Store Data
var _currentSearch = []
var _myEvents = []

// Load Current Search
function loadCurrentSearch(currentSearch) {
    _currentSearch = currentSearch
}

// Load My events
function loadMyEvents(myEvents) {
    _myEvents = []
}

//
var SearchStore = _.extend({}, EventEmitter.prototype, {
    //
    getCurrentSearch: function() {
        return _currentSearch
    },
    getMyEvents: function() {
        return _myEvents
    },
    emitChange: function() {
        this.emit('changeSearch')
    },
    addChangeListener: function(done) {
        this.addListener('changeSearch', done)
    },
    removeChangeListener: function(done) {
        this.removeListener('changeSearch', done)
    }
})

//
AppDispatcher.register(function(payload) {
    //
    var action = payload.action
    switch (action.actionType) {
        case SearchConstants.GET_PLACES_RESPONSE:
            loadCurrentSearch(action.data)
            SearchStore.emitChange()
            break;
        default:
            break;
    }
    return true
})

//
module.exports = SearchStore