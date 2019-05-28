import React, { Component } from 'react';
import { Switch } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './components/Home'
import Movie from './components/Movie'
import Book from './components/Book'
import CreateBook from './components/CreateBook'
// import BookPage from './components/Book/BookPage'
import Series from './components/Series'
import Game from './components/Game'
import Celebrity from './components/Celebrity'
import User from './components/User'
import CreateUserForm from './components/CreateUserForm'
import UserLogin from './components/UserLogin'
import UserPage from './components/UserPage'

import NoMatch from './components/NoMatch'

class App extends Component {
    constructor() {
        super()
        this.logIn = this.logIn.bind(this)
        this.logOut = this.logOut.bind(this)
        this.state = {
            session: undefined,
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
                    <Route path="/movie" render={ (props) => <Movie {...props} /> } />
                    <Route path="/book/create" render={ (props) => <CreateBook {...props} /> } />
                    <Route path="/book" render={ (props) => <Book {...props} /> } />
                    {/* <Route path="/book/:id" component={ BookPage } /> */}

                    <Route path="/series" render={ (props) => <Series {...props} /> } />
                    <Route path="/game" render={ (props) => <Game {...props} /> } />
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