import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Jumbotron } from 'react-bootstrap'

import Navbar from './CustomNavbar'

class Jogos extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <Navbar/>
                <Jumbotron>
                    Jogos
                </Jumbotron>
            </React.Fragment>
         );
    }
}
 
export default Jogos;