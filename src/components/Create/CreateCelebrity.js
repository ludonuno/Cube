import React, { Component } from 'react';
import { Container, Form, Button, InputGroup, Row, Col } from 'react-bootstrap'
import { Create } from '../../scripts/api'
import { Redirect } from 'react-router-dom'
import Alert from '../utils/Alert'
import Navbar from '../CustomNavbar'

class CreateBook extends Component {

    constructor(props) {
        super(props);
        this.ChangeAlert = this.ChangeAlert.bind(this)
        this.AddCelebrity = this.AddCelebrity.bind(this)
        this.state = {
            user: JSON.parse(localStorage.getItem('user'))[0],
            alert: { visible: false, message: '', variant: '' }
        }
    }
    
    ChangeAlert(visible, message, variant) {
        let alert = {...this.state.alert}
        alert = { visible: visible, message: message, variant: variant}
        this.setState({ alert })
    }

    AddCelebrity = (event) => {
        event.preventDefault()
        if(this.userEmail && this.userPassword && this.name) {
            let insertData = [
                { table: 'Celebrity', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'name', data: this.name.value},
                    {field: 'birthday', data: this.birthday.value},
                    {field: 'biography', data: this.biography.value}
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Create(insertData, (res) => {
                if(res.error) {
                    this.ChangeAlert(true, res.error, 'danger')
                } else {
                    this.ChangeAlert(true, res.result.message, 'success')
                }
            })
        } else {
            this.ChangeAlert(true, 'Campos em falta', 'warning')
        }
    }

    render() {
        if(!this.state.user) {
            return (<Redirect to='/noMatch' />)
        }
        return ( 
            <React.Fragment>
                <Navbar/>
                <Container>
                    <h3>Create Celebrity</h3>
                    <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                    <Form onSubmit={this.AddCelebrity}>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Name</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="text" ref={(input) => {this.name = input}} />
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
                                            <InputGroup.Text>Biography</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control as="textarea" rows="3" className="noresize" ref={(input) => {this.biography = input}}/>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="primary" type="submit" block>Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
                <br />
            </React.Fragment>
        );
    }
}
 
export default CreateBook;