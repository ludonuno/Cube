import React, { Component } from 'react';
import { Container } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

import Navbar from './CustomNavbar'

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined
        }
    }
    render() { 
        if(!this.state.user) {
            return (<Redirect to='/user/login' />)
        }
        return ( 
            <React.Fragment>
                <Navbar props={this.props}/>
                <Container>
                    UserPage
                </Container>
            </React.Fragment>
        );
    }
}
 

export default UserPage;