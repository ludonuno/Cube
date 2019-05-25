import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap'
import { Create } from '../../../scripts/api'
import Alert from '../../utils/Alert'

class publishingCompany extends Component {
    state = {
    }
    constructor(props) {
        super(props);
        this.publishingCompany = this.publishingCompany.bind(this)
    }
    
    publishingCompany = (event) => {
        event.preventDefault()
        let insertData = [
            { table: 'PublishingCompany', fieldData: [ 
                {field: 'userEmail', data: this.userEmail.value},
                {field: 'userPassword', data: this.userPassword.value},
                {field: 'name', data: this.name.value}
            ] }
        ]
        Create(insertData, (res) => {
            console.log(res)
        })
    }
    
    render() { 
        return ( 
            <React.Fragment>
                <Container>
                    <Form onSubmit={this.publishingCompany}>
                        <h1>Create Publishing Company</h1>
                        <Alert variant="warning" message="Registo inserido com sucesso" />

                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" ref={(email) => {this.userEmail = email}} required/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" ref={(password) => {this.userPassword = password}} required/>
                        </Form.Group>
                        
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" ref={(name) => {this.name = name}} required/>
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
 

export default publishingCompany;