import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap'
import { Create } from '../../scripts/api'

import Navbar from '../CustomNavbar'
import PublishingCompany from './PublishingCompany/PublishingCompany'

class CreateBook extends Component {

    constructor(props) {
        super(props);
        this.Add = this.Add.bind(this)
    }
    
    Add = (event) => {
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
                <PublishingCompany />
                <Container>
                <Form onSubmit={this.Add}>
                    <h1>Create Book</h1>

                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" ref={(email) => {this.email = email}} required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={(password) => {this.password = password}} required/>
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Title" ref={(title) => {this.title = title}} required/>
                    </Form.Group>

                    {/* Get all Publisher Companies */}

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    </Form>
                </Container>
            </React.Fragment>
        );
    }
}
 

export default CreateBook;