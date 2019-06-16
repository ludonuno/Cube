import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'

import Navbar from '../CustomNavbar'

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined
        }
    }
    
    render() { 
        return ( 
            <React.Fragment>
                <Navbar props={this.props}/>
                <Jumbotron>
                    Book
                </Jumbotron>
            </React.Fragment>    
        );
    }
}
 
export default Book;