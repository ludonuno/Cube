import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'

import Navbar from './CustomNavbar'

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user'))[0],
        }
    }
    render() { 
        return ( 
            <React.Fragment>
                <Navbar />
                <Jumbotron>
                    Game
                </Jumbotron>
            </React.Fragment>      
        );
    }
}
 
export default Game;