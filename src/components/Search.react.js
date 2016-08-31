// Search.react.js

var React = require('react')
//
var SearchActions = require('../actions/SearchActions')
var SearchStore = require('../stores/SearchStore')

// Bootstrap elements
import { Grid, Row, Col, Jumbotron, FormGroup, Button, Media, Label, Badge, Well } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

// Load States
function getSearchStoreData() {
    return {
        currentSearch: SearchStore.getCurrentSearch(),
        storedSearch: SearchStore.getStoredSearch()
    }
}

//
var PlaceList = React.createClass({
    //
    _handleRsvp: function() {
        var placeId = null          // TODO: If unauthrorize user clicks, gets logged in and place-rsvp done
        var searchText = this.props.searchText
        //
        if(this.props.user) {
            
        } else {
            // let the user log in and save searchText in session
            location.href = '/auth/twitter?placeId='+ placeId +'&searchText='+ searchText
        }
    },
    //
    render: function() {
        //
        var self = this
        //
        var list = this.props.list
        if(list && list.length !== 0) {
            var rows = []
            list.forEach(function(place) {
                //
                rows.push(
                    <Media key={place.id}>
                        <Media.Left>
                            <img width='100' height='100' src={place.icon} alt='Image' />
                        </Media.Left>
                        <Media.Body>
                            <Media.Heading>{place.name}</Media.Heading>
                            <p>Rating: <Badge>{place.rating}</Badge>&nbsp;
                                <Button bsStyle='success' ref='rsvpBtn' onClick={self._handleRsvp}>Going</Button>
                            </p>
                            <p>Address: {place.formatted_address}</p>
                            <p>
                                <Label bsStyle='info'>
                                    { (place.opening_hours && place.opening_hours.open_now) ? 'Open now' : 'Not sure..Call them if they are serving..' }
                                </Label>
                            </p>
                        </Media.Body>
                    </Media>
                )
            })
        } else {
            return null
        }
        //
        return (
            <Well>{rows}</Well>
        )
    }
})

//
var Search = React.createClass({
    //
    getInitialState: function() {
        return getSearchStoreData()
    },
    componentDidMount: function() {
        // OnEnter
        this.refs.locationStr.addEventListener('keyup', function(event) {
            // if Enter key pressed : 13
            if(event.keyCode === 13) {
                document.getElementById('searchBtn').click()
            }
        })
        //
        SearchStore.addChangeListener(this._onChange)
    },
    componentWillUnmount: function() {
        //
        this.refs.locationStr.removeEventListener('keyup')
        SearchStore.removeChangeListener(this._onChange)
    },
    //
    _onChange: function() {
        this.setState(getSearchStoreData())
    },
    //
    _search: function() {
        //
        var location = this.refs.locationStr.value
        //
        if(location !== '') {
            SearchActions.getLL(location)
            return true
        } else {
            return false
        }
    },
    //
    render: function() {
        // Get User info if logged in
        var user = this.props.user
        //
        return (
            <Grid>
                <Row>
                    <Col lg={12}>
                        <Jumbotron>
                            <form>
                                <FormGroup>
                                    <input id='searchField' type='text' ref='locationStr'  placeholder="Type location" />
                                    <Button id='searchBtn' ref='searchBtn' type='button' bsStyle='success' onClick={this._search} >Search</Button>
                                </FormGroup>
                            </form>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <PlaceList list={this.state.currentSearch} user={user} searchText={this.refs.locationStr ? this.refs.locationStr.value : null } />
                    </Col>
                </Row>
            </Grid>
        )
    }
})

//
module.exports = Search