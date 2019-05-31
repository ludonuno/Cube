import React, { Component } from 'react';
import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap'
import { Create } from '../../../scripts/api'
import Alert from '../../utils/Alert'

class CreateParentAdvisory extends Component {
    constructor(props) {
        super(props);
        this.ChangeAlert = this.ChangeAlert.bind(this)
        this.AddParentAdvisory = this.AddParentAdvisory.bind(this)
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

    AddParentAdvisory = (event) => {
        event.preventDefault()
        let insertData = [
            { table: 'ParentAdvisory', fieldData: [ 
                {field: 'userEmail', data: this.state.user.email},
                {field: 'userPassword', data: this.state.user.password},
                {field: 'rate', data: this.rate.value},
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
                <h3>Create Parent Dvisory</h3>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.AddParentAdvisory} ref={(form) => this.formRef = form}>
                    <Row>
                        <Col>
                            <Form.Group>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Rate</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control type="text" ref={(name) => {this.rate = name}} required/>
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
            </React.Fragment>
        );
    }
}
export default CreateParentAdvisory;