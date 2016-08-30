// index.js - UI

var React = require('react')
var ReactDOM = require('react-dom')

import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router'

var Index = require('./components/Index.react')
var Search = require('./components/Search.react')
var MyPlaces = require('./components/MyPlaces.react')

// Utilities
var AuthAPI = require('./utils/AuthAPI')

// Init
AuthAPI.isAuthenticated()   // Is user logged in

// onEnter callback
function requireAuth(nextState, replace, done) {
    //
    AuthAPI.isLoggedIn(function(result) {
        //
        if(!result) {
            replace({
                pathname: '/',
                state: { nextPathname: nextState.location.pathname }
            })
        }
        // wait till response comes, then redirect
        done()
    })
}

// Home Page
ReactDOM.render(
    (
        <Router history={hashHistory}>
            <Route path='/' component={Index}>
                <IndexRoute component={Search} />
                <Route path='/search' component={Search}></Route>
                <Route path='/myplaces' component={MyPlaces} onEnter={requireAuth}></Route>
            </Route>
        </Router>
    ), document.getElementById('content'))