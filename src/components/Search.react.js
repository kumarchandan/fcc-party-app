// Search.react.js

var React = require('react')
var SearchActions = require('../actions/SearchActions')
var SearchStore = require('../stores/SearchStore')

// Bootstrap elements
import { Grid, Row, Col, Jumbotron, FormGroup, Button, Media, Label, Badge, Well } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

//
var PlaceList = React.createClass({
    //
    render: function() {
        var list = this.props.list
        if(list && list.length !== 0) {
            var rows = []
            list.forEach(function(place) {
                // Create Type Labels
                var types = []
                var len = place.types.length
                for(var i = 0; i < len; i++) {
                    types.push(<Label bsStyle='info' key={i}>{place.types[i]}</Label>)
                }
                //
                rows.push(
                    <Media key={place.id}>
                        <Media.Left>
                            <img width='64' height='64' src={place.icon} alt='Image' />
                        </Media.Left>
                        <Media.Body>
                            <Media.Heading>{place.name}</Media.Heading>
                            <p>Rating: <Badge>{place.rating}</Badge></p>
                            <p>Address: {place.formatted_address}</p>
                            <p>{types}</p>
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
function getSearchStoreData() {
    return {
        currentSearch: SearchStore.getCurrentSearch()
    }
}

//
var Search = React.createClass({
    //
    getInitialState: function() {
        return getSearchStoreData()
    },
    componentDidMount: function() {
        SearchStore.addChangeListener(this._onChange)
    },
    componentWillUnmount: function() {
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
        return (
            <Grid>
                <Row>
                    <Col lg={12}>
                        <Jumbotron>
                            <form>
                                <FormGroup>
                                    <input type='text' ref='locationStr'  placeholder="Type location" />
                                    <Button type='button' bsStyle='success' onClick={this._search} >Search</Button>
                                </FormGroup>
                            </form>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <PlaceList list={this.state.currentSearch} />
                    </Col>
                </Row>
            </Grid>
        )
    }
})

//
module.exports = Search