import React, { Component } from 'react';
import { Container } from 'react-bootstrap'

import Navbar from './CustomNavbar'

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user'))
        }
    }
    render() {            
        localStorage.removeItem('user')
        return ( 
            <React.Fragment>
                <Navbar />
                <Container>
                    UserPage
                </Container>
            </React.Fragment>
        );
    }
}
 

export default UserPage;