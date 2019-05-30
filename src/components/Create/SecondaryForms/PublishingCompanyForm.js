import React, { Component } from 'react';
import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap'
import { Create } from '../../../scripts/api'
import Alert from '../../utils/Alert'

class PublishingCompanyForm extends Component {
    constructor(props) {
        super(props);
        this.ChangeAlert = this.ChangeAlert.bind(this)
        this.AddPublishingCompany = this.AddPublishingCompany.bind(this)
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

    AddPublishingCompany = (event) => {
        event.preventDefault()
        let insertData = [
            { table: 'PublishingCompany', fieldData: [ 
                {field: 'userEmail', data: this.state.user.email},
                {field: 'userPassword', data: this.state.user.password},
                {field: 'name', data: this.name.value}
            ] }
        ]
        this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
        Create(insertData, (res) => {
            if(res.error) {
                this.ChangeAlert(true, res.error, 'danger')
            } else {
                this.formRef.reset()
                this.ChangeAlert(true, res.result.message, 'success')
                this.props.onSubmit()
            }
        })
    }

    render() {
        return ( 
            <React.Fragment>
                <h3>Create Publishing Company</h3>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.AddPublishingCompany} ref={(form) => this.formRef = form}>
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
                    <Button variant="primary" type="submit" block>Submit</Button>
                </Form>
            </React.Fragment>
        );
    }
}
 

export default PublishingCompanyForm;