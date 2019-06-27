import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { Get } from '../../scripts/api'
import Alert from '../utils/Alert'

import Navbar from '../CustomNavbar'

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
        this.setState({ alert: { visible: visible, message: message, variant: variant} })
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
        if(this.state.user) {
            return (<Redirect to='/noMatch' />)
        }
        return ( 
            <React.Fragment>
                <Navbar props={this.props}/>
                <br/>
                <Container>
                    <h3>Login</h3>
                    <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                    <Form onSubmit={this.LoginUser}>
                        <Form.Group as={Row}> 
                            <Form.Label column lg={12} xl={2}>E-mail</Form.Label>
                            <Col>
                                <Form.Control type="email" autoComplete="username" ref={(input) => {this.userEmail = input}} required/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}> 
                            <Form.Label column lg={12} xl={2}>Password</Form.Label>
                            <Col>
                                <Form.Control type="password" autoComplete="current-password" ref={(input) => {this.userPassword = input}} required/>
                            </Col>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Button variant="primary" type="submit" block>Entrar</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </React.Fragment>
        );
    }
}
 

export default withRouter(UserLogin);