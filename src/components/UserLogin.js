import React, { Component } from 'react';
import { Container } from 'react-bootstrap'

import Navbar from './CustomNavbar'

class UserLogin extends Component {
    render() { 
        return ( 
            <React.Fragment>
                <Navbar/>
                <Container>
                    UserLogin
                </Container>
            </React.Fragment>
        );
    }
}
 

export default UserLogin;