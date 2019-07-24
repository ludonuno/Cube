import React, { Component } from 'react'
import { Jumbotron, Container } from 'react-bootstrap'

import Navbar from './CustomNavbar'

class NoMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined
        }
    }
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <Navbar props={this.props}/>
                <Container>
                    <Jumbotron>
                        <h2>Pedimos desculpa, mas a página que tentou aceder não existe ou não está disponível <span role="img" aria-label="Close">😟</span></h2>
                    </Jumbotron>
                </Container>
            </React.Fragment>
         );
    }
}
 
export default NoMatch;