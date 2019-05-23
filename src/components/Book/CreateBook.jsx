import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap'
import { Create } from '../../scripts/api'

import Navbar from '../CustomNavbar'

class BookCreate extends Component {

    constructor(props) {
        super(props);
        this.CreateBook = this.CreateBook.bind(this)
    }
    
    CreateBook = (event) => {
        event.preventDefault()

        if(this.password.value === this.repeatPassword.value) {
            let insertData = [
                { table: 'Book', fieldData: [ 
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
                <Form onSubmit={this.CreateBook}>
                    <h1>Create Book</h1>

                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" ref={(FormControl) => {this.name = FormControl}} required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" ref={(FormControl) => {this.email = FormControl}} required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={(FormControl) => {this.password = FormControl}} required/>
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Repeat password</Form.Label>
                        <Form.Control type="password" placeholder="Repeat password" ref={(FormControl) => {this.repeatPassword = FormControl}} required/>
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
 

export default BookCreate;