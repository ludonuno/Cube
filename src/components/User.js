import React, { Component } from 'react';
import { Container } from 'react-bootstrap'

import Navbar from './CustomNavbar'

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user'))
        }
    }
    render() {
        return ( 
            <React.Fragment>
                <Navbar />
                <Container>
                    User
                </Container>
            </React.Fragment>
        );
    }
}
 

export default User;