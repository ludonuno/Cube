import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'

class NoMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user'))
        }
    }
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <Jumbotron>
                    No Match
                </Jumbotron>
            </React.Fragment>
         );
    }
}
 
export default NoMatch;