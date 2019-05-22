import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'

import Navbar from './CustomNavbar'

class Celebrities extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <Navbar/>
                <Jumbotron>
                    Pessoas
                </Jumbotron>
            </React.Fragment>    
        );
    }
}
 
export default Celebrities;