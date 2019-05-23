import React, { Component } from 'react';
import { Container } from 'react-bootstrap'

import Navbar from '../CustomNavbar'

class UserPage extends Component {
   
    render() { 
        return ( 
            <React.Fragment>
                <Navbar/>
                <Container>
                    UserPage
                </Container>
            </React.Fragment>
        );
    }
}
 

export default UserPage;