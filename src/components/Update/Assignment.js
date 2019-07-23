import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Update } from '../../scripts/api'
import { ReplaceComa } from '../../scripts/utils'
import Alert from '../utils/Alert'
import ComboBox from '../utils/CB'

class Assignment extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' }
        }
    }

    componentDidUpdate() {
        this.formRef.reset()
        if(this.props.assignmentList[0]) this.SetAssignmentFieldValues(this.props.assignmentList[0])
        else this.SetAssignmentFieldValues({})
    }

    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })

    UpdateAssignment = (event) => {
        event.preventDefault()
        if(this.props.assignmentList[0]){
            let updateData = [
                { table: 'Assignment', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'id', data: JSON.parse(this.cbAssignment.value).id},
                    {field: 'assignment', data: this.assignment.value},
                    {field: 'description', data: this.description.value}
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao servidor...', 'info')
            Update(updateData, (res, rej) => {
                if(res) {
                    if(res.error) this.ChangeAlert(true, res.error, 'danger')
                    else {
                        this.formRef.reset()
                        this.props.onSubmit()
                        this.ChangeAlert(true, res.result.message, 'success')
                    }
                } else this.ChangeAlert(true, `${rej}`, 'danger')
            })
        } else this.ChangeAlert(true, 'Por favor adicione os campos em falta', 'warning')
    }

    SetAssignmentToEdit = () => {
        this.SetAssignmentFieldValues(JSON.parse(this.cbAssignment.value))
    }

    SetAssignmentFieldValues = (assignment) => {
        if(assignment) {
            let assig = assignment.assignment ? ReplaceComa(assignment.assignment) : null
            let description = assignment.description ? ReplaceComa(assignment.description) : null
            this.assignment.value = assig
            this.description.value = description
        }
    }
   
    render() { 
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.UpdateAssignment} ref={(form) => this.formRef = form}>
                    <ComboBox list={this.props.assignmentList} header={'Função'} ref={(input) => this.cbAssignment = input} onChange={this.SetAssignmentToEdit}/>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Função</Form.Label>
                        <Col>
                            <Form.Control type="text" ref={(input) => {this.assignment = input}} required/> 
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
        )
    }
}
 
export default Assignment;