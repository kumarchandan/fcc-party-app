// utils/AuthAPI.js
var request = require('superagent')
var AuthServerActions = require('../actions/AuthServerActions')

module.exports = {
    //
    isAuthenticated: function() {
        request.get('api/auth').end(function(err, res) {
            //
            if(err) throw err
            //
            AuthServerActions.isAuthenticated(res.body.data)
        })
    },
    isLoggedIn: function(done) {
        request.get('/api/auth').end(function(err, res) {
            if(err) throw err
            if(res.body.data) {
                done(res.body.data)
            } else {
                done(false)
            }
        })
    }
}