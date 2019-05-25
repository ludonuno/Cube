import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap'
import { getBase64, getImage } from '../../scripts/utils'
import { Create } from '../../scripts/api'

import Navbar from '../CustomNavbar'

class UserCreate extends Component {

    constructor(props) {
        super(props);
        this.CreateUser = this.CreateUser.bind(this)
    }
    
    CreateUser = (event) => {
        event.preventDefault()

        //Imagens só podem ser adicionadas no update
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
                <Form onSubmit={this.CreateUser}>
                    <h1>Create User</h1>

                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" ref={(name) => {this.name = name}} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" ref={(email) => {this.email = email}} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={(password) => {this.password = password}} required/>
                    </Form.Group>                    
                    <Form.Group>
                        <Form.Label>Repeat password</Form.Label>
                        <Form.Control type="password" placeholder="Repeat password" ref={(repeatPassword) => {this.repeatPassword = repeatPassword}} required/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>

                    </Form>
                </Container>
            </React.Fragment>
        );
    }
}
 

export default UserCreate;