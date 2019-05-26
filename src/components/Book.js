import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'

import Navbar from './CustomNavbar'

class Book extends Component {
    render() { 
        return ( 
            <React.Fragment>
                <Navbar/>
                <Jumbotron>
                    Book
                </Jumbotron>
            </React.Fragment>    
        );
    }
}
 
export default Book;