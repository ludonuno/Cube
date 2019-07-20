import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Create } from '../../scripts/api'
import Alert from '../utils/Alert'

//TODO: ADD RESET FORM
class Celebrity extends Component {

    constructor(props) {
        super(props);
        this.ChangeAlert = this.ChangeAlert.bind(this)
        this.AddCelebrity = this.AddCelebrity.bind(this)
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' }
        }
    }
    
    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })

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
        Create(insertData, (res, rej) => {
            if(res) {
                if(res.error) {
                    this.ChangeAlert(true, res.error, 'danger')
                } else {
                    this.formRef.reset()
                    this.ChangeAlert(true, res.result.message, 'success')
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
                <Form onSubmit={this.AddCelebrity} ref={(form) => this.formRef = form}>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Nome</Form.Label>
                        <Col>
                            <Form.Control type="text" ref={(input) => {this.name = input}} required/> 
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Aniversário</Form.Label>
                        <Col>
                            <Form.Control type="date" ref={(input) => {this.birthday = input}} /> 
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Biografia</Form.Label>
                        <Col>
                            <Form.Control as="textarea" rows="4" className="noresize" ref={(input) => {this.biography = input}}/> 
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
 
export default Celebrity;