import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap'
import { Create } from '../../scripts/api'

import Navbar from '../CustomNavbar'

class UserPage extends Component {

    constructor(props) {
        super(props);
        this.CreateUser = this.CreateUser.bind(this)
    }
    
    CreateUser = (event) => {
        event.preventDefault()

        if(this.password.value === this.repeatPassword.value) {
            let insertData = [
                { table: 'User', fieldData: [ 
                    {field: 'name', data: this.name.value},
                    {field: 'email', data: this.email.value},
                    {field: 'password', data: this.password.value}
                ] }
            ]

            Create(insertData, (res) => {
                console.log(res)
            })
        }
    }

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