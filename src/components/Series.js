import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'

import Navbar from './CustomNavbar'

class Series extends Component {
    render() { 
        return ( 
            <React.Fragment>
                <Navbar/>
                <Jumbotron>
                    Series
                </Jumbotron>
            </React.Fragment>   
        );
    }
}
 
export default Series;