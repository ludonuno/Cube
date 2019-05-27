import React, { Component } from 'react';
import { Container, Form, Button, InputGroup, Row, Col } from 'react-bootstrap'
import { Create } from '../scripts/api'
import Alert from './utils/Alert'

class PublishingCompanyForm extends Component {
    constructor(props) {
        super(props);
        this.Add = this.Add.bind(this)
        this.state = {
            inserted: {
                hasInserted: false,
                message: '',
                variant: ''
            }
        }
    }
    
    Add = (event) => {
        event.preventDefault()
        //userEmail, userPassword, name
        let insertData = [
            { table: 'PublishingCompany', fieldData: [ 
                {field: 'userEmail', data: this.userEmail.value},
                {field: 'userPassword', data: this.userPassword.value},
                {field: 'name', data: this.name.value}
            ] }
        ]
        
        let inserted = {...this.inserted}
        inserted = {
            visible: true,
            message: 'A ligar ao servidor...',
            variant: 'info'
        }
        this.setState({ inserted })

        Create(insertData, (res) => {
            if(res.error) {
                let inserted = {...this.inserted}
                inserted = {
                    visible: true,
                    message: `${res.error}`,
                    variant: 'danger'
                }
                this.setState({ inserted })
            } else {
                let inserted = {...this.inserted}
                inserted = {
                    visible: true,
                    message: `${res.result.message}`,
                    variant: 'success'
                }
                this.setState({ inserted })
                this.props.GetPublisherList()
            }
        })
    }

    render() { 
        return ( 
            <React.Fragment>
                <Container>
                    <h3>Create Publishing Company</h3>
                    <Alert variant={this.state.inserted.variant} message={this.state.inserted.message} visible={this.state.inserted.visible} />
                    <Form onSubmit={this.Add}>
                        <Row>
                            <Col xs={12} lg={6}>
                                <Form.Group>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>E-mail</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="email" autoComplete="username" ref={(email) => {this.userEmail = email}} required/>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col xs={12} lg={6}>
                                <Form.Group>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Password</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="password" autoComplete="current-password" ref={(password) => {this.userPassword = password}} required/>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
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
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Container>
            </React.Fragment>
        );
    }
}
 

export default PublishingCompanyForm;