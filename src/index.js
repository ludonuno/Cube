import React from 'react';
import { render } from 'react-dom'
import { Switch } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './index.css';

import Home from './components/Home'
import Movie from './components/Movie/Movie'
import Book from './components/Book/Book'
import Series from './components/Series/Series'
import Game from './components/Game/Game'
import Celebrity from './components/Celebrity/Celebrity'
import User from './components/User/User'
import NoMatch from './components/NoMatch'

import * as serviceWorker from './serviceWorker';

const Root = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={ Home } />
                <Route path="/movie" component={ Movie } />
                <Route path="/book" component={ Book } />
                <Route path="/series" component={ Series } />
                <Route path="/game" component={ Game } />
                <Route path="/celebrity" component={ Celebrity } />
                <Route path="/user" component={ User } />
                <Route component={NoMatch}/>
            </Switch>
        </Router>
    )
}

render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
