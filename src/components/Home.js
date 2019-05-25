import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'

import Navbar from './CustomNavbar'

class Home extends Component {
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
 
export default Home;