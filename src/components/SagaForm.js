import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap'
import { Create } from '../scripts/api'
import Alert from './utils/Alert'

class SagaForm extends Component {
    constructor(props) {
        super(props);
        this.Add = this.Add.bind(this)
        this.state = {
            inserted: {
                hasInserted: false,
                message: '',
                variant: ''
            }
        }
    }
    
    Add = (event) => {
        event.preventDefault()
        //userEmail, userPassword, name, description
        let insertData = [
            { table: 'Saga', fieldData: [ 
                {field: 'userEmail', data: this.userEmail.value},
                {field: 'userPassword', data: this.userPassword.value},
                {field: 'name', data: this.name.value}
            ] }
        ]
        
        let inserted = {...this.inserted}
        inserted = {
            visible: true,
            message: 'A ligar ao servidor...',
            variant: 'info'
        }
        this.setState({ inserted })

        Create(insertData, (res) => {
            if(res.error) {
                let inserted = {...this.inserted}
                inserted = {
                    visible: true,
                    message: `${res.error}`,
                    variant: 'danger'
                }
                this.setState({ inserted })
            } else {
                let inserted = {...this.inserted}
                inserted = {
                    visible: true,
                    message: `${res.result.message}`,
                    variant: 'success'
                }
                this.setState({ inserted })
                this.props.GetSagaList()
            }
        })
    }

    render() { 
        return ( 
            <React.Fragment>
                <Container>
                    <h3>Create Saga</h3>
                    <Alert variant={this.state.inserted.variant} message={this.state.inserted.message} visible={this.state.inserted.visible} />
                    <Form onSubmit={this.Add}>
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
 

export default SagaForm;