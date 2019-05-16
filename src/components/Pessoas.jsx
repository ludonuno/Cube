import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Jumbotron } from 'react-bootstrap'

import Navbar from './CustomNavbar'

class Pessoas extends Component {
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
 
export default Pessoas;