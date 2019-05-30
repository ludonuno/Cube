import React, { Component } from 'react';
import { Container, Form, Button, InputGroup, Row, Col } from 'react-bootstrap'
import { Create } from '../../scripts/api'
import { Redirect } from 'react-router-dom'
import Alert from '../utils/Alert'

class SagaForm extends Component {
    constructor(props) {
        super(props);
        this.ChangeAlert = this.ChangeAlert.bind(this)
        this.AddSaga = this.AddSaga.bind(this)
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

    AddSaga = (event) => {
        event.preventDefault()
        let insertData = [
            { table: 'Saga', fieldData: [ 
                {field: 'userEmail', data: this.state.user.email},
                {field: 'userPassword', data: this.state.user.password},
                {field: 'name', data: this.name.value},
                {field: 'description', data: this.description.value}
            ] }
        ]
        this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
        Create(insertData, (res) => {
            if(res.error) {
                this.ChangeAlert(true, res.error, 'danger')
            } else {
                this.ChangeAlert(true, res.result.message, 'success')
                this.props.onSubmit()
            }
        })
    }

    render() { 
        if(!this.state.user) {
            return (<Redirect to='/noMatch' />)
        }
        return ( 
            <React.Fragment>
                <Container>
                    <h3>Create Saga</h3>
                    <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                    <Form onSubmit={this.AddSaga}>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Name</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="text" ref={(name) => {this.name = name}} required/>
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
                                        <Form.Control as="textarea" rows="2" className="noresize" ref={(input) => {this.description = input}}/>
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
            </React.Fragment>
        );
    }
}
 

export default SagaForm;