import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'

import Navbar from './CustomNavbar'

class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user'))
        }
    }
    render() { 
        return ( 
            <React.Fragment>
                <Navbar />
                <Jumbotron>
                    Movie
                </Jumbotron>
            </React.Fragment>    
        );
    }
}
 
export default Movie;