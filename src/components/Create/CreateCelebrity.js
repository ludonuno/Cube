import React, { Component } from 'react';
import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap'
import { Create } from '../../scripts/api'
import Alert from '../utils/Alert'

class CreateBook extends Component {

    constructor(props) {
        super(props);
        this.ChangeAlert = this.ChangeAlert.bind(this)
        this.AddCelebrity = this.AddCelebrity.bind(this)
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

    AddCelebrity = (event) => {
        event.preventDefault()
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
                this.formRef.reset()
                this.ChangeAlert(true, res.result.message, 'success')
            }
        })
    }

    render() {
        return ( 
            <React.Fragment>
                <h3>Create Celebrity</h3>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.AddCelebrity} ref={(form) => this.formRef = form}>
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
        );
    }
}
 
export default CreateBook;