import React, { Component } from 'react';
import { Container, Form, Button, InputGroup, Row, Col } from 'react-bootstrap'
import { Create } from '../../scripts/api'

import Alert from '../utils/Alert'
import Navbar from '../CustomNavbar'

class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.ChangeAlert = this.ChangeAlert.bind(this)
        this.AddUser = this.AddUser.bind(this)
        this.state = {
            user: JSON.parse(localStorage.getItem('user')),
            alert: { visible: false, message: '', variant: '' }
        }
    }
    
    ChangeAlert(visible, message, variant) {
        let alert = {...this.state.alert}
        alert = { visible: visible, message: message, variant: variant}
        this.setState({ alert })
    }

    AddUser = (event) => {
        event.preventDefault()
        if(this.password.value === this.repeatPassword.value) {
            let insertData = [
                { table: 'User', fieldData: [ 
                    {field: 'name', data: this.name.value},
                    {field: 'email', data: this.email.value},
                    {field: 'password', data: this.password.value},
                    {field: 'birthday', data: this.birthday.value},
                    {field: 'description', data: this.description.value}
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao servidor...', 'info')
            Create(insertData, (res) => {
                if(res.error) {
                    this.ChangeAlert(true, res.error, 'danger')
                } else {
                    this.ChangeAlert(true, res.result.message, 'success')
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
                    <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                    <Form onSubmit={this.AddUser}>
                        <Row>
                            <Col xs={12} lg={6}>
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Name</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="text" ref={(input) => {this.name = input}} required/>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col xs={12} lg={6}>
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>E-mail</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="email" ref={(input) => {this.email = input}} required/>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} lg={6}>
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Password</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="password" ref={(input) => {this.password = input}} required/>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col xs={12} lg={6}>
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Repetir Password</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="password" ref={(input) => {this.repeatPassword = input}} required/>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Birthday</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="date" ref={(input) => {this.birthday = input}} />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Description</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control as="textarea" rows="3" className="noresize" ref={(input) => {this.description = input}}/>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="primary" type="submit">Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </React.Fragment>
        );
    }
}
 

export default CreateUser;