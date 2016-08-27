// utils/AuthAPI.js
var request = require('superagent')
var AuthActions = require('../actions/AuthActions')

module.exports = {
    //
    isAuthenticated: function() {
        request.get('api/auth').end(function(err, res) {
            //
            if(err) throw err
            //
            AuthActions.isAuthenticated(res.body.data)
        })
    },
    isLoggedIn: function(done) {
        request.get('/api/auth').end(function(err, res) {
            if(err) throw err
            if(res.body.data) {
                done(true)
            } else {
                done(false)
            }
        })
    }
}