import React, { Component } from 'react';
import { Row, Col, Form, Button, InputGroup } from 'react-bootstrap'

import Alert from '../utils/Alert'
import AssignmentForm from './SecondaryForms/AssignmentForm'

class CreateAssignment extends Component {
    constructor(props) {
        super(props);
        this.ChangeAlert = this.ChangeAlert.bind(this)
        this.state = { 
            alert: { visible: false, message: '', variant: '' }
        }
    }

    ChangeAlert(visible, message, variant) {
        let alert = {...this.state.alert}
        alert = { visible: visible, message: message, variant: variant}
        this.setState({ alert })
    }

    AddAssignment = () => {

    }

    render() { 
        return ( 
            <React.Fragment>
                <br/>
                <AssignmentForm />
                <h3>Create Celebrity</h3>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.AddAssignment} ref={(form) => this.formRef = form}>
                    <Row>
                        <Col xs={4} lg={2}>
                            <Form.Group>
                                <InputGroup.Text>Name</InputGroup.Text>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control type="text" ref={(input) => {this.name = input}} required/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4} lg={2}>
                            <Form.Group>
                                <InputGroup.Text>Birthday</InputGroup.Text>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control type="date" ref={(input) => {this.birthday = input}} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4} lg={2}>
                            <Form.Group>
                                <InputGroup.Text>Biography</InputGroup.Text>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control as="textarea" rows="3" className="noresize" ref={(input) => {this.biography = input}}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="primary" type="submit" block>Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </React.Fragment>
        )
    }
}
 
export default CreateAssignment;