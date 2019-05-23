import React, { Component } from 'react'
import { Switch } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// import SeriesCreate from './SeriesCreate'
// import SeriesPage from './SeriesPage'
import NoMatch from '../NoMatch'

class Series extends Component {
    render() { 
        return ( 
            <Router>
                <Switch>
                    {/* <Route path="/series/create" component={ SeriesCreate } />
                    <Route path="/series/:id" component={ SeriesPage } /> */}
                    <Route component={NoMatch}/>
                </Switch>
            </Router>    
        );
    }
}
 
export default Series;