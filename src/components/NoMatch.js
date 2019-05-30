import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'

import Navbar from './CustomNavbar'

class NoMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user'))[0],
        }
    }
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <Navbar />
                <Jumbotron>
                    No Match
                </Jumbotron>
            </React.Fragment>
         );
    }
}
 
export default NoMatch;