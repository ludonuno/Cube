import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

//import Navbar from './components/CustomNavbar'
import Inicio from './components/Inicio'
import Filmes from './components/Filmes'
import Livros from './components/Livros'
import Series from './components/Series'
import Jogos from './components/Jogos'
import Pessoas from './components/Pessoas'

class App extends Component {
  state = {  }
  render() { 
    return ( 
      <Router>
        <div>
          <Route exact path="/" component={ Inicio } />
          <Route path="/filmes" component={ Filmes } />
          <Route path="/livros" component={ Livros } />
          <Route path="/series" component={ Series } />
          <Route path="/jogos" component={ Jogos } />
          <Route path="/pessoas" component={ Pessoas } />
        </div>
      </Router>
     );
  }
}
 
export default App;