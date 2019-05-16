import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Jumbotron } from 'react-bootstrap'

import Navbar from './CustomNavbar'

class Filmes extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <Navbar/>
                <Jumbotron>
                    Filmes
                </Jumbotron>
            </React.Fragment>    
        );
    }
}
 
export default Filmes;