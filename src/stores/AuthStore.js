// AuthStore.js

var AuthAPI = require('../utils/AuthAPI')
var AppDispatcher = require('../dispatcher/AppDispatcher')
var AuthConstants = require('../constants/AuthConstants')
var EventEmitter = require('events').EventEmitter
var _ = require('underscore')

// private data
var _profile = null

// helper functions
function loadProfile(data) {
    _profile = data
}

// events - underscore
var AuthStore = _.extend({}, EventEmitter.prototype, {
    //
    getAuthData: function() {
        return _profile
    },
    //
    emitChange: function() {
        this.emit('dataChanges')
    },
    //
    addChangeListener: function(done) {
        this.addListener('dataChanges', done)
    },
    //
    removeChangeListener: function(done) {
        this.removeListener('dataChanges', done)
    }
})

// Register AuthStore's Callback to Dispatcher : To receive payload
AppDispatcher.register(function(payload) {
    var action = payload.action
    //
    switch (action.actionType) {
        case AuthConstants.IS_AUTHENTICATED:
            loadProfile(action.data)
            AuthStore.emitChange()
            break
        default:
            return true
    }
    return true
})

module.exports = AuthStore