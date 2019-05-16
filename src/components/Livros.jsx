import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Jumbotron } from 'react-bootstrap'

import Navbar from './CustomNavbar'

class Livros extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <Navbar/>
                <Jumbotron>
                    Livros
                </Jumbotron>
            </React.Fragment>    
        );
    }
}
 
export default Livros;