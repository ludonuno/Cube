import React, { Component } from 'react';
import { Switch } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './components/Page/Home'

import Movie from './components/Page/Movie'

import Book from './components/Page/Book'

import Series from './components/Page/Series'
import Season from './components/Page/Season'
import Episode from './components/Page/Episode'

import Game from './components/Page/Game'
import Celebrity from './components/Page/Celebrity'
import UserCreate from './components/Page/UserCreate'
import UserLogin from './components/Page/UserLogin'
import UserPage from './components/Page/UserPage'

import Create from './components/Create'
import Update from './components/Update'
import Delete from './components/Delete'

import NoMatch from './components/NoMatch'


class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={(props) => <Home {...props}/>}/>
                    <Route path="/movie/:id" render={(props) => <Movie {...props}/>}/>
                    <Route path="/book/:id" render={(props) => <Book {...props}/>}/>
                    <Route path="/series/:id" render={(props) => <Series {...props}/>}/>
                    <Route path="/season/:id" render={(props) => <Season {...props}/>}/>
                    <Route path="/episode/:id" render={(props) => <Episode {...props}/>}/>
                    <Route path="/game/:id" render={(props) => <Game {...props}/>}/>     
                    <Route path="/celebrity/:id" render={(props) => <Celebrity {...props}/>}/>
                    <Route path="/user/create" render={(props) => <UserCreate {...props}/>}/>
                    <Route path="/user/login" render={(props) => <UserLogin {...props}/>}/>
                    <Route path="/user/page" render={(props) => <UserPage {...props}/>}/>
                    <Route path="/create" render={(props) => <Create {...props}/>}/>
                    <Route path="/update" render={(props) => <Update {...props}/>}/>
                    <Route path="/delete" render={(props) => <Delete {...props}/>}/>
                    <Route path="/noMatch" render={(props) => <NoMatch {...props}/>}/>
                    <Route path="/:noMatch" render={(props) => <NoMatch {...props}/>}/>
                </Switch>
            </Router>
        )
    }
}

export default App;