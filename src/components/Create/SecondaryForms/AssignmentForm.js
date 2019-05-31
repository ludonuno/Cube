import React, { Component } from 'react';
import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap'
import { Create } from '../../../scripts/api'
import Alert from '../../utils/Alert'

class AssignmentForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' }
        }
    }
    
    AddAssignment = (event) => {
        event.preventDefault()
        let insertData = [
            { table: 'Assignment', fieldData: [ 
                {field: 'userEmail', data: this.state.user.email},
                {field: 'userPassword', data: this.state.user.password},
                {field: 'assignment', data: this.assignment.value},
                {field: 'description', data: this.description.value}
            ] }
        ]
        this.ChangeAlert(true, 'A ligar ao servidor...', 'info')
        Create(insertData, (res) => {
            if(res.error) {
                this.ChangeAlert(true, `${res.error}`, 'danger')
            } else {
                this.formRef.reset()
                this.ChangeAlert(true, `${res.result.message}`, 'success')
                this.props.onSubmit()
            }
        })
    }

    render() { 
        return ( 
            <React.Fragment>
                <h3>Create Assignment</h3>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.AddAssignment} ref={(form) => this.formRef = form}>
                <Row>
                        <Col xs={4} lg={2}>
                            <Form.Group>
                                <InputGroup.Text>Assignment</InputGroup.Text>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control type="text" ref={(input) => {this.assignment = input}} required/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4} lg={2}>
                            <Form.Group>
                                <InputGroup.Text>Description</InputGroup.Text>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control as="textarea" rows="3" className="noresize" ref={(input) => {this.description = input}}/>
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
 
export default AssignmentForm;