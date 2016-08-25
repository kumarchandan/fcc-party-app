// AuthActions.js

var AppDispatcher = require('../dispatcher/AppDispatcher')
var AuthConstants = require('../constants/AuthConstants')

// Flux Story :)
// Action gets the payload(data) and hand it over to Dispatcher
// Then Dispatcher takes the payload and dispatches to all the callbacks which are registered in Stores across application
// And then Store emits the event about the data changes, so finally the React Views re-renders the data

var AuthActions = {
    //
    isAuthenticated: function(data) {
        AppDispatcher.handleAction({
            actionType: AuthConstants.IS_AUTHENTICATED,
            data: data
        })
    }
}

module.exports = AuthActions