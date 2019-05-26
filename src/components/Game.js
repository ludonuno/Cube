import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'

import Navbar from './CustomNavbar'

class Game extends Component {
    render() { 
        return ( 
            <React.Fragment>
                <Navbar/>
                <Jumbotron>
                    Game
                </Jumbotron>
            </React.Fragment>      
        );
    }
}
 
export default Game;