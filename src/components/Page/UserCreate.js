import React, { Component } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { Create } from '../../scripts/api'
import { Redirect } from 'react-router-dom'

import Alert from '../utils/Alert'
import Navbar from '../CustomNavbar'

class UserCreate extends Component {
    constructor(props) {
        super(props);
        this.ChangeAlert = this.ChangeAlert.bind(this)
        this.AddUser = this.AddUser.bind(this)
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' }
        }
    }
    
    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })

    AddUser = (event) => {
        event.preventDefault()
        if(this.password.value === this.repeatPassword.value) {
            let insertData = [
                { table: 'User', fieldData: [ 
                    {field: 'name', data: this.name.value},
                    {field: 'email', data: this.email.value},
                    {field: 'password', data: this.password.value},
                    {field: 'birthday', data: this.birthday.value}
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao servidor...', 'info')
            Create(insertData, (res) => {
                if(res.error) {
                    this.ChangeAlert(true, res.error, 'danger')
                } else {
                    this.props.history.push('/user/login')
                }
            })
        }
    }

    render() {
        if(this.state.user) {
            return (<Redirect to='/noMatch' />)
        }
        return ( 
            <React.Fragment>
                <Navbar props={this.props}/>
                <br/>
                <Container>
                    <h3>Registar</h3>
                    <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                    <Form onSubmit={this.AddUser}>
                        <Form.Group as={Row}> 
                            <Form.Label column lg={12} xl={2}>Nome</Form.Label>
                            <Col>
                                <Form.Control type="text" ref={(input) => {this.name = input}} required/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}> 
                            <Form.Label column lg={12} xl={2}>E-mail</Form.Label>
                            <Col>
                                <Form.Control type="email" ref={(input) => {this.email = input}} required/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}> 
                            <Form.Label column lg={12} xl={2}>Password</Form.Label>
                            <Col>
                                <Form.Control type="password" ref={(input) => {this.password = input}} required/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}> 
                            <Form.Label column lg={12} xl={2}>Repetir Password</Form.Label>
                            <Col>
                                <Form.Control type="password" ref={(input) => {this.repeatPassword = input}} required/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}> 
                            <Form.Label column lg={12} xl={2}>Aniversário</Form.Label>
                            <Col>
                                <Form.Control type="date" ref={(input) => {this.birthday = input}} />
                            </Col>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Button variant="primary" type="submit" block>Criar</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </React.Fragment>
        );
    }
}
 

export default UserCreate;