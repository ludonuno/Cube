import React, { Component } from 'react';
import { Switch } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import UserCreate from './UserCreate'
import UserPage from './UserPage'
import NoMatch from '../NoMatch'

class User extends Component {
    render() { 
        return ( 
            <Router>
                <Switch>
                    <Route path="/user/create" component={ UserCreate } />
                    <Route path="/user/:id" component={ UserPage } />
                    <Route component={NoMatch}/>
                </Switch>
            </Router>
        );
    }
}
 

export default User;