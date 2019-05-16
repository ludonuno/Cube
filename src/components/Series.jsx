import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Jumbotron } from 'react-bootstrap'

import Navbar from './CustomNavbar'

class Series extends Component {
    state = {  }
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