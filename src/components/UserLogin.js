import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Container, Form, Button, InputGroup, Row, Col } from 'react-bootstrap'
import { Get } from '../scripts/api'
import Alert from './utils/Alert'

import Navbar from './CustomNavbar'

class UserLogin extends Component {
    constructor(props) {
        super(props)
        this.ChangeAlert = this.ChangeAlert.bind(this)
        this.LoginUser = this.LoginUser.bind(this)
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' }
        }
    }

    ChangeAlert(visible, message, variant) {
        let alert = {...this.state.alert}
        alert = { visible: visible, message: message, variant: variant}
        this.setState({ alert })
    }

    LoginUser = (event) => {
        event.preventDefault()
        let userInfo = [
            { table: 'UserAutentication', fieldData: [ 
                {field: 'userEmail', data: this.userEmail.value},
                {field: 'userPassword', data: this.userPassword.value}
            ] }
        ]
        this.ChangeAlert(true, 'A ligar ao servidor...', 'info')
        Get(userInfo,(res) => {
            if(res.error) {
                this.ChangeAlert(true, res.error, 'danger')
            } else {
                localStorage.setItem('user', JSON.stringify(res.result))
                this.props.history.push('/')
            }
        })
    }
      
    render() {
        return ( 
            <React.Fragment>
                <Navbar props={this.props}/>
                <Container>
                    <h3>UserLogin</h3>
                    <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                    <Form onSubmit={this.LoginUser}>
                        <Row>
                            <Col xs={12} lg={6}>
                                <Form.Group>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>E-mail</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="email" autoComplete="username" ref={(input) => {this.userEmail = input}} required/>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col xs={12} lg={6}>
                                <Form.Group>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Password</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="password" autoComplete="current-password" ref={(input) => {this.userPassword = input}} required/>
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
 

export default withRouter(UserLogin);