import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Tab, Tabs } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { Update } from '../../scripts/api'

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
        this.FormName = this.FormName.bind(this)
        this.FormEmail = this.FormEmail.bind(this)
        this.FormPassword = this.FormPassword.bind(this)
        this.FormAniversario = this.FormAniversario.bind(this)
        this.FormDescricao = this.FormDescricao.bind(this)
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined
        }
    }

    FormName = () => {
        return (
            <Form onSubmit={this.UpdateUserName}>
                <Form.Group as={Row}> 
                    <Form.Label column lg={12} xl={2} size="sm">Novo nome</Form.Label>
                    <Col>
                        <Form.Control type="text" ref={(input) => {this.name = input}} required size="sm"/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}> 
                    <Form.Label column lg={12} xl={2} size="sm">Password atual</Form.Label>
                    <Col>
                        <Form.Control type="password" autoComplete="current-password" ref={(input) => {this.currentPasswordName = input}} required size="sm"/>
                    </Col>
                </Form.Group>
                <Row>
                    <Col>
                        <Button variant="primary" type="submit" block size="sm">Atualizar</Button>
                    </Col>
                </Row>
            </Form>
        )
    }
    FormEmail = () => {
        return (
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
                        <Form.Control type="password" ref={(input) => {this.currentPasswordEmail = input}} required size="sm"/>
                    </Col>
                </Form.Group>
                <Row>
                    <Col>
                        <Button variant="primary" type="submit" block size="sm">Atualizar</Button>
                    </Col>
                </Row>
            </Form>
        )
    }
    FormPassword = () => {
        return (
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
                        <Form.Control type="password" ref={(input) => {this.currentPasswordPassword = input}} required size="sm"/>
                    </Col>
                </Form.Group>
                <Row>
                    <Col>
                        <Button variant="primary" type="submit" block size="sm">Atualizar</Button>
                    </Col>
                </Row>
            </Form>
        )
    }
    FormAniversario = () => {
        return (
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
                        <Form.Control type="password" ref={(input) => {this.currentPasswordBirthday = input}} required size="sm"/>
                    </Col>
                </Form.Group>
                <Row>
                    <Col>
                        <Button variant="primary" type="submit" block size="sm">Atualizar</Button>
                    </Col>
                </Row>
            </Form>
        )
    }
    FormDescricao = () => {
        return (
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
                        <Form.Control type="password" ref={(input) => {this.currentPasswordDescription = input}} required size="sm"/>
                    </Col>
                </Form.Group>
                <Row>
                    <Col>
                        <Button variant="primary" type="submit" block size="sm">Atualizar</Button>
                    </Col>
                </Row>
            </Form>
        )
    }

    //TODO: Por estas 4 funções a funcionar
    UpdateUserName = (event) => {
        event.preventDefault()
        console.log( 0, this.currentPasswordName.value)
        console.log( 1, this.name.value)
        let updateData = [ { table: 'User', fieldData: [
            {field: 'userEmail', data: this.state.user.email},
            {field: 'userPassword', data: this.currentPasswordName.value},
            {field: 'id', data: this.state.user.id},
            {field: 'name', data: this.name.value}
        ] } ]
        Update(updateData,(res) => {
            console.log(res)
            // if(res.result) {
            //     this.GetRating(this.state.movie.id)
            // } 
            // else this.setState({ rating: undefined })
        })
    }
    UpdateUserEmail = (event) => {
        event.preventDefault()
        let updateData = [ { table: 'User', fieldData: [
            {field: 'userEmail', data: this.state.user.email},
            {field: 'userPassword', data: this.currentPasswordEmail.value},
            {field: 'id', data: this.state.user.id},
            {field: 'email', data: this.email}
        ] } ]
        Update(updateData,(res) => {
            if(res.result) {
                this.GetRating(this.state.movie.id)
            } 
            else this.setState({ rating: undefined })
        })
    }
    UpdateUserPassword = (event) => {
        event.preventDefault()
        let updateData = [ { table: 'User', fieldData: [
            {field: 'userEmail', data: this.state.user.email},
            {field: 'userPassword', data: this.currentPasswordPassword.value},
            {field: 'id', data: this.state.user.id},
            {field: 'password', data: this.password}
        ] } ]
        Update(updateData,(res) => {
            if(res.result) {
                this.GetRating(this.state.movie.id)
            } 
            else this.setState({ rating: undefined })
        })
    }
    UpdateUserBirthday = (event) => {
        event.preventDefault()
        let updateData = [ { table: 'User', fieldData: [
            {field: 'userEmail', data: this.state.user.email},
            {field: 'userPassword', data: this.currentPasswordBirthday.value},
            {field: 'id', data: this.state.user.id},
            {field: 'birthday', data: this.birthday}
        ] } ]
        Update(updateData,(res) => {
            if(res.result) {
                this.GetRating(this.state.movie.id)
            } 
            else this.setState({ rating: undefined })
        })
    }
    UpdateUserDescription = (event) => {
        event.preventDefault()
        let updateData = [ { table: 'User', fieldData: [
            {field: 'userEmail', data: this.state.user.email},
            {field: 'userPassword', data: this.currentPasswordDescription.value},
            {field: 'id', data: this.state.user.id},
            {field: 'description', data: this.description}
        ] } ]
        Update(updateData,(res) => {
            if(res.result) {
                this.GetRating(this.state.movie.id)
            } 
            else this.setState({ rating: undefined })
        })
    }


    render() { 
        if(!this.state.user) {
            return (<Redirect to='/user/login'/>)
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
                    <Tabs defaultActiveKey="nome" id="uncontrolled-tab-example">
                        <Tab eventKey="nome" title="Atualizar nome">
                            <br/>
                            <this.FormName/>
                        </Tab>
                        <Tab eventKey="email" title="Atualizar email">
                            <br/>
                            <this.FormEmail/>
                        </Tab>
                        <Tab eventKey="password" title="Atualizar password">
                            <br/>
                            <this.FormPassword/>
                        </Tab>
                        <Tab eventKey="birthday" title="Atualizar aniversário">
                            <br/>
                            <this.FormAniversario/>
                        </Tab>
                        <Tab eventKey="description" title="Atualizar descrição">
                            <br/>
                            <this.FormDescricao/>
                        </Tab>
                    </Tabs>
                </Container>
            </React.Fragment>
        );
    }
}
 

export default UserPage;