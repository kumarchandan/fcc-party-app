// AppDispatcher.js

var Dispatcher = require('flux').Dispatcher

// Dispatcher instance
var AppDispatcher = new Dispatcher()

// Handle dispatched requests
AppDispatcher.handleAction = function(action) {
	var payload = {
		source: 'VIEW_ACTION',
		action: action			// actionType, data
	};
	//
	this.dispatch(payload)
}
//
AppDispatcher.handleServerAction = function(action) {
	var payload = {
		source: 'SERVER_ACTION',
		action: action			// actionType, data
	}
	//
	this.dispatch(payload)
}

module.exports = AppDispatcher;