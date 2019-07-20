import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Create } from '../../scripts/api'
import Alert from '../utils/Alert'

class ParentAdvisory extends Component {
    constructor(props) {
        super(props);
        this.ChangeAlert = this.ChangeAlert.bind(this)
        this.AddParentAdvisory = this.AddParentAdvisory.bind(this)
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' }
        }
    }
    
    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })

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
        Create(insertData, (res, rej) => {
            if(res) {
                if(res.error) {
                    this.ChangeAlert(true, `${res.error}`, 'danger')
                } else {
                    this.formRef.reset()
                    this.ChangeAlert(true, `${res.result.message}`, 'success')
                    this.props.onSubmit()
                }
            } else {
                this.ChangeAlert(true, `${rej}`, 'danger')
            }
        })
    }

    render() {
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.AddParentAdvisory} ref={(form) => this.formRef = form}>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Avaliação</Form.Label>
                        <Col>
                            <Form.Control type="text" ref={(input) => {this.rate = input}} required/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Descrição</Form.Label>
                        <Col>
                            <Form.Control as="textarea" rows="4" className="noresize" ref={(input) => {this.description = input}}/>
                        </Col>
                    </Form.Group>
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
export default ParentAdvisory;