// Index.react.js : Navigation bar [parent of all UI components]

var React = require('react')

import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

var AuthStore = require('../stores/AuthStore')

// changes
function getState() {
    return {
        loggedIn: AuthStore.getAuthData()
    }
}


// Navigation bar
var NavigationBar = React.createClass({
    //
    _onChange: function() {         // Controller-View : Listenes for data change and setState
        this.setState(getState())
    },
    //
    getInitialState: function() {
        return getState()
    },
    //
    componentDidMount: function() {
        AuthStore.addChangeListener(this._onChange)
    },
    //
    componentWillUnmount: function() {
        AuthStore.removeChangeListener(this._onChange)
    },
    // render
    render: function() {
        return (
            <div>
                <Navbar inverse>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Vote.app</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                        { this.state.loggedIn ?
                        <Nav pullRight>
                            <LinkContainer to='/polls'>
                                <NavItem eventKey={1}>Home</NavItem>
                            </LinkContainer>
                            <LinkContainer to='/mypolls'>
                                <NavItem eventKey={2}>My Polls</NavItem>
                            </LinkContainer>
                            <LinkContainer to='/newpoll'>
                                <NavItem eventKey={3}>New Poll</NavItem>
                            </LinkContainer>
                            <NavDropdown eventKey={4} title={this.state.loggedIn.displayName} id='basic-nav-dropdown'>
                                <MenuItem eventKey={4.1} href='/logout'>Logout</MenuItem>
                            </NavDropdown>
                        </Nav>
                        :
                        <Nav pullRight>
                            <LinkContainer to='/polls'>
                                <NavItem eventKey={1}>Home</NavItem>
                            </LinkContainer>
                            <NavItem eventKey={2} href="/auth/twitter">Sign in with Twitter</NavItem>
                        </Nav>
                        }
                </Navbar>
                {this.props.children}
            </div>
        )
    }
})


// module exports 
module.exports = NavigationBar

