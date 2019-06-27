import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Delete } from '../../scripts/api'
import Alert from '../utils/Alert'
import ComboBox from '../utils/ComboBox'

class Assignment extends Component {
    constructor(props) {
        super(props);
        this.ChangeAlert = this.ChangeAlert.bind(this)
        this.AddAssignment = this.AddAssignment.bind(this)
        this.state = { 
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' },
            assignmentId: undefined
        }
    }
    
    ChangeAlert(visible, message, variant) {
        this.setState({ alert: { visible: visible, message: message, variant: variant} })
    }

    SetAssignment = (event) => {
        this.setState({ assignmentId: Number(event.target.value) })
    }

    DeleteAssignment = (event) => {
        event.preventDefault()
        if(this.props.assignmentList[0]) { 

        }  else {
            this.ChangeAlert(true, 'Por favor adicione os campos em falta', 'warning')
        }
        
        let deleteData = [
            { table: 'Assignment', fieldData: [ 
                {field: 'userEmail', data: this.state.user.email},
                {field: 'userPassword', data: this.state.user.password},
                {field: 'id', data: this.assignment.value}
            ] }
        ]
        this.ChangeAlert(true, 'A ligar ao servidor...', 'info')
        Delete(deleteData, (res, rej) => {
            if(res) {
                if(res.error) {
                    this.ChangeAlert(true, `${res.error}`, 'danger')
                } else {
                    this.ChangeAlert(true, `${res.result.message}`, 'success')
                    this.formRef.reset()
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
                <Form onSubmit={this.AddAssignment} ref={(form) => this.formRef = form}>
                    <ComboBox header={'Função'} list={this.props.assignmentList} onChange={this.SetAssignment} />
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
 
export default Assignment;