// Search.react.js

var React = require('react')
var SearchActions = require('../actions/SearchActions')

// Bootstrap elements
import { Grid, Row, Col, Jumbotron, FormGroup, FormControl, Button } from 'react-bootstrap'

//
var Search = React.createClass({
    //
    search: function() {
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
                                    <Button type='button' bsStyle='success' onClick={this.search} >Search</Button>
                                </FormGroup>
                            </form>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <Jumbotron>
                            
                        </Jumbotron>
                    </Col>
                </Row>
            </Grid>
        )
    }
})

//
module.exports = Search