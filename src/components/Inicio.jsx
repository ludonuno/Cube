import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Jumbotron } from 'react-bootstrap'

import Navbar from './CustomNavbar'

class Inicio extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
                <Navbar/>
                <Jumbotron>
                    Inicio
                </Jumbotron>
            </React.Fragment>
        );
    }
}
 
export default Inicio;