import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap'
import { Create } from '../scripts/api'

import Alert from './utils/Alert'
import Navbar from './CustomNavbar'

class CreateUserForm extends Component {
    constructor(props) {
        super(props);
        this.CreateUser = this.CreateUser.bind(this)
        this.state = {
            inserted: {
                hasInserted: false,
                message: '',
                variant: ''
            }
        }
    }
    
    CreateUser = (event) => {
        event.preventDefault()
        //name, password, email, birthday, description
        //Imagens só podem ser adicionadas no update
        if(this.password.value === this.repeatPassword.value) {
            let insertData = [
                { table: 'User', fieldData: [ 
                    {field: 'name', data: this.name.value},
                    {field: 'email', data: this.email.value},
                    {field: 'password', data: this.password.value}
                ] }
            ]
            
            let inserted = {...this.state.inserted}
            inserted = {
                visible: true,
                message: 'A ligar ao servidor...',
                variant: 'info'
            }
            this.setState({ inserted })

            Create(insertData, (res) => {
                if(res.error) {
                    let inserted = {...this.state.inserted}
                    inserted = {
                        visible: true,
                        message: 'Não foi possivel inserir o registo.',
                        variant: 'danger'
                    }
                    this.setState({ inserted })
                } else {
                    let inserted = {...this.state.inserted}
                    inserted = {
                        visible: true,
                        message: 'Registo inserido com sucesso',
                        variant: 'success'
                    }
                    this.setState({ inserted })
                }
            })
        }
    }


    render() { 
        return ( 
            <React.Fragment>
                <Navbar/>
                <Container>
                <h3>Create User</h3>
                <Alert variant={this.state.inserted.variant} message={this.state.inserted.message} visible={this.state.inserted.visible} />
                <Form onSubmit={this.CreateUser}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" ref={(input) => {this.name = input}} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" ref={(input) => {this.email = input}} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={(input) => {this.password = input}} required/>
                    </Form.Group>                    
                    <Form.Group>
                        <Form.Label>Repeat password</Form.Label>
                        <Form.Control type="password" placeholder="Repeat password" ref={(input) => {this.repeatPassword = input}} required/>
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
 

export default CreateUserForm;