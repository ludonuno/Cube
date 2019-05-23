import React, { Component } from 'react'
import { Switch } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// import GameCreate from './GameCreate'
// import GamePage from './GamePage'
import NoMatch from '../NoMatch'

class Game extends Component {
    render() { 
        return ( 
            <Router>
                <Switch>
                    {/* <Route path="/game/create" component={ GameCreate } />
                    <Route path="/game/:id" component={ GamePage } /> */}
                    <Route component={NoMatch}/>
                </Switch>
            </Router>    
        );
    }
}
 
export default Game;