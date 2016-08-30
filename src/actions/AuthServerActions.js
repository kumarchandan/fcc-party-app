// actions/AuthServerActions.js

var AppDispatcher = require('../dispatcher/AppDispatcher')
var AuthConstants = require('../constants/AuthConstants')

var AuthServerActions = {
    //
    isAuthenticated: function(data) {
        AppDispatcher.handleServerAction({
            actionType: AuthConstants.IS_AUTHENTICATED_RESPONSE,
            data: data
        })
    }
}

module.exports = AuthServerActions