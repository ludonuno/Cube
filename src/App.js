import React, { Component } from 'react';
import { Switch } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './components/Home'

import Movie from './components/Movie'
import CreateMovie from './components/Create/CreateMovie'

import Book from './components/Book'
import CreateBook from './components/Create/CreateBook'

import Series from './components/Series'
import CreateSeries from './components/Create/CreateSeries'

import Game from './components/Game'
import CreateGame from './components/Create/CreateGame'

import Celebrity from './components/Celebrity'
import CreateCelebrity from './components/Create/CreateCelebrity'

import User from './components/User'
import CreateUserForm from './components/Create/CreateUserForm'
import UserLogin from './components/UserLogin'
import UserPage from './components/UserPage'

import NoMatch from './components/NoMatch'

class App extends Component {
    constructor() {
        super()
        this.logIn = this.logIn.bind(this)
        this.logOut = this.logOut.bind(this)
        this.state = {
            user: undefined,
        }
    }

    logIn(user) {
        this.setState({ session: user })
    }

    logOut() {
        this.setState({ session: undefined })
    }

    render() { 
        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={ (props) => <Home {...props} /> } />

                    <Route path="/movie/create" render={ (props) => <CreateMovie {...props} /> } />
                    <Route path="/movie" render={ (props) => <Movie {...props} /> } />

                    <Route path="/book/create" render={ (props) => <CreateBook {...props} /> } />
                    <Route path="/book" render={ (props) => <Book {...props} /> } />

                    <Route path="/series/create" render={ (props) => <CreateSeries {...props} /> } />
                    <Route path="/series" render={ (props) => <Series {...props} /> } />

                    <Route path="/game/create" render={ (props) => <CreateGame {...props} /> } />
                    <Route path="/game" render={ (props) => <Game {...props} /> } />
                    
                    <Route path="/celebrity/create" render={ (props) => <CreateCelebrity {...props} /> } />
                    <Route path="/celebrity" render={ (props) => <Celebrity {...props} /> } />

                    <Route path="/user/create" render={ (props) => <CreateUserForm {...props} /> } />
                    <Route path="/user/login" render={ (props) => <UserLogin {...props} /> } />
                    <Route path="/user/:id" render={ (props) => <UserPage {...props} /> } />
                    <Route path="/user" render={ (props) => <User {...props} /> }/>

                    <Route render={NoMatch}/>
                </Switch>
            </Router>
        )
    }
}

export default App;