import React, { Component } from 'react';
import { Row, Col, Form, Button, InputGroup } from 'react-bootstrap'

import Alert from '../utils/Alert'
import CreateAssignment from './SecondaryForms/CreateAssignment'

class CreateCelebrityAssignment extends Component {
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

    AddAssignmentGame = () => {
        // event.preventDefault()
        // if(this.props.celebrityList[0] && this.props.AssignmentList[0] && this.props.gameList[0]) {
        //     let insertData = [
        //         { table: 'Series', fieldData: [ 
        //             {field: 'userEmail', data: this.state.user.email},
        //             {field: 'userPassword', data: this.state.user.password},
        //             {field: 'title', data: this.title.value},
        //             {field: 'releaseDate', data: this.releaseDate.value},
        //             {field: 'synopsis', data: this.synopsis.value},
        //             {field: 'sagaId', data: this.state.sagaId ? this.state.sagaId : 1},
        //             {field: 'parentAdvisoryId', data: this.state.parentAdvisoryId ? this.state.parentAdvisoryId : 1}
        //         ] }
        //     ]
        //     this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
        //     Create(insertData, (res) => {
        //         if(res.error) {
        //             this.ChangeAlert(true, res.error, 'danger')
        //         } else {
        //             this.formRef.reset()
        //             this.ChangeAlert(true, res.result.message, 'success')
        //         }
        //     })
        // } else {
        //     this.ChangeAlert(true, 'Por favor adicione os campos em falta', 'warning')
        // }
    }

    render() { 
        return ( 
            <React.Fragment>
                <br/>
                <CreateAssignment />
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
 
export default CreateCelebrityAssignment;