import React, { Component } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { Create } from '../scripts/api'

import Navbar from './CustomNavbar'

class User extends Component {

    constructor(props) {
        super(props);
        this.CreateUser = this.CreateUser.bind(this)
    }
    
    CreateUser = (event) => {
        event.preventDefault()

        console.log(typeof this.photo.value)

        // if(this.password.value === this.repeatPassword.value) {
        //     let insertData = [
        //         { table: 'Users', fieldData: [ 
        //             {field: 'title', data: this.dataToSearch.value},
        //             {field: 'title', data: this.dataToSearch.value},
        //             {field: 'title', data: this.dataToSearch.value},
        //             {field: 'title', data: this.dataToSearch.value},
        //         ] }
        //     ]
        // }
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
                        <Form.Control type="text" placeholder="Name" ref={(FormControl) => {this.name = FormControl}}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" ref={(FormControl) => {this.email = FormControl}}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={(FormControl) => {this.password = FormControl}}/>
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Repeat password</Form.Label>
                        <Form.Control type="password" placeholder="Repeat password" ref={(FormControl) => {this.repeatPassword = FormControl}}/>
                    </Form.Group>

                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="validatedCustomFile" ref={(input) => {this.photo = input}} />
                        <label class="custom-file-label" for="validatedCustomFile">Choose file...</label>
                        <div class="invalid-feedback">Example invalid custom file feedback</div>
                    </div>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    </Form>
                </Container>
            </React.Fragment>
        );
    }
}
 

export default User;