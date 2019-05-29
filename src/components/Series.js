import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'

import Navbar from './CustomNavbar'

class Series extends Component {
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
                    Series
                </Jumbotron>
            </React.Fragment>   
        );
    }
}
 
export default Series;