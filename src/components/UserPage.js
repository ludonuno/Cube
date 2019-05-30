import React, { Component } from 'react';
import { Container } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

import Navbar from './CustomNavbar'

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user'))[0]
        }
    }
    render() { 
        if(!this.state.user) {
            return (<Redirect to='/user/login' />)
        }
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