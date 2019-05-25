import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'

class NoMatch extends Component {
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