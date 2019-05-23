import React, { Component } from 'react'
import { Switch } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// import MovieCreate from './MovieCreate'
// import MoviePage from './MoviePage'
import NoMatch from '../NoMatch'

class Movie extends Component {
    render() { 
        return ( 
            <Router>
                <Switch>
                    {/* <Route path="/movie/create" component={ MovieCreate } />
                    <Route path="/movie/:id" component={ MoviePage } /> */}
                    <Route component={NoMatch}/>
                </Switch>
            </Router>    
        );
    }
}
 
export default Movie;