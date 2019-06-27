import React, { Component } from 'react';
import { Container, Row, Col, Form, Button} from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

import Navbar from '../CustomNavbar'
//TODO: fazer com que a página funcione
//TODO: fazer com que a página funcione
//TODO: fazer com que a página funcione
//TODO: fazer com que a página funcione
//TODO: fazer com que a página funcione
//TODO: fazer com que a página funcione
//TODO: fazer com que a página funcione
//TODO: fazer com que a página funcione
//TODO: fazer com que a página funcione
class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined
        }
    }
    render() { 
        if(!this.state.user) {
            return (<Redirect to='/user/login' />)
        }
        console.log(this.state.user)
        return ( 
            <React.Fragment>
                <Navbar props={this.props}/>
                <br/>
                <Container>
                    <Row><h3>Perfil de {this.state.user.name}</h3></Row>
                    <Row>Conta criada a {this.state.user.creationdate.substring(0,10)}</Row>
                    {this.state.user.birthday ? <Row>Aniversário {this.state.user.birthday}</Row> : <Row>Sem registo de aniversário</Row> }
                    <br/>
                    {this.state.user.description ? <React.Fragment><Row><h5>Descrição</h5></Row><Row>{this.state.user.description}</Row></React.Fragment> : <React.Fragment><Row><h5>Descrição</h5></Row><Row>Sem registo de descrição</Row></React.Fragment> }
                    <br/>
                    <Form onSubmit={this.UpdateUserEmail}>
                        <Form.Group as={Row}> 
                            <Form.Label column lg={12} xl={2} size="sm">Novo E-mail</Form.Label>
                            <Col>
                                <Form.Control type="email" ref={(input) => {this.email = input}} required size="sm"/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}> 
                            <Form.Label column lg={12} xl={2} size="sm">Password atual</Form.Label>
                            <Col>
                                <Form.Control type="password" ref={(input) => {this.currentPassword = input}} required size="sm"/>
                            </Col>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Button variant="primary" type="submit" block size="sm">Atualizar</Button>
                            </Col>
                        </Row>
                    </Form>
                    <br/>
                    <Form onSubmit={this.UpdateUserPassword}>
                        <Form.Group as={Row}> 
                            <Form.Label column lg={12} xl={2} size="sm">Nova password</Form.Label>
                            <Col>
                                <Form.Control type="password" ref={(input) => {this.password = input}} required size="sm"/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}> 
                            <Form.Label column lg={12} xl={2} size="sm">Repetir password</Form.Label>
                            <Col>
                                <Form.Control type="password" ref={(input) => {this.repeatPassword = input}} required size="sm"/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}> 
                            <Form.Label column lg={12} xl={2} size="sm">Password atual</Form.Label>
                            <Col>
                                <Form.Control type="password" ref={(input) => {this.currentPassword = input}} required size="sm"/>
                            </Col>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Button variant="primary" type="submit" block size="sm">Atualizar</Button>
                            </Col>
                        </Row>
                    </Form>
                    <br/>
                    <Form onSubmit={this.UpdateUserBirthday}>
                    <Form.Group as={Row}> 
                            <Form.Label column lg={12} xl={2} size="sm">Aniversário</Form.Label>
                            <Col>
                                <Form.Control type="date" ref={(input) => {this.birthday = input}}  size="sm"/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}> 
                            <Form.Label column lg={12} xl={2} size="sm">Password atual</Form.Label>
                            <Col>
                                <Form.Control type="password" ref={(input) => {this.repeatPassword = input}} required size="sm"/>
                            </Col>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Button variant="primary" type="submit" block size="sm">Atualizar</Button>
                            </Col>
                        </Row>
                    </Form>
                    <br/>
                    <Form onSubmit={this.UpdateUserDescription}>
                        <Form.Group as={Row}> 
                            <Form.Label column lg={12} xl={2} size="sm">Descrição</Form.Label>
                            <Col>
                            <Form.Control as="textarea" rows="4" className="noresize" ref={(input) => {this.description = input}} size="sm"/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}> 
                            <Form.Label column lg={12} xl={2} size="sm">Password atual</Form.Label>
                            <Col>
                                <Form.Control type="password" ref={(input) => {this.repeatPassword = input}} required size="sm"/>
                            </Col>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Button variant="primary" type="submit" block size="sm">Atualizar</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </React.Fragment>
        );
    }
}
 

export default UserPage;