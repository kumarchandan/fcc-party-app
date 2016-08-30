// Index.react.js : Navigation bar [parent of all UI components]

var React = require('react')

import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

var AuthStore = require('../stores/AuthStore')

// changes
function getState() {
    return {
        loggedIn: AuthStore.getUser()
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
                            <a href="#">Nite.life</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                        { this.state.loggedIn ?
                        <Nav pullRight>
                            <LinkContainer to='/search'>
                                <NavItem eventKey={1}>Home</NavItem>
                            </LinkContainer>
                            <LinkContainer to='/myplaces'>
                                <NavItem eventKey={2}>My Places</NavItem>
                            </LinkContainer>
                            <NavDropdown eventKey={4} title={this.state.loggedIn.displayName} id='basic-nav-dropdown'>
                                <MenuItem eventKey={4.1} href='/logout'>Logout</MenuItem>
                            </NavDropdown>
                        </Nav>
                        :
                        <Nav pullRight>
                            <LinkContainer to='/search'>
                                <NavItem eventKey={1}>Home</NavItem>
                            </LinkContainer>
                            <NavItem eventKey={2} href="/auth/twitter">Sign in with Twitter</NavItem>
                        </Nav>
                        }
                </Navbar>
                {React.cloneElement(this.props.children, { user: this.state.loggedIn })}
            </div>
        )
    }
})


// module exports 
module.exports = NavigationBar

