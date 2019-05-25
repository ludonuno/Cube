import React, { Component } from 'react'
import { Switch } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import BookCreate from './BookCreate'
// import BookPage from './BookPage'
import NoMatch from '../NoMatch'

class Book extends Component {
    render() { 
        return ( 
            <Router>
                <Switch>
                    <Route path="/book/create" component={ BookCreate } />
                    {/* <Route path="/book/:id" component={ BookPage } /> */}
                    <Route component={NoMatch}/>
                </Switch>
            </Router>    
        );
    }
}
 
export default Book;