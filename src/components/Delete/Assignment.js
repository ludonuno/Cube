import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Delete } from '../../scripts/api'
import { ReplaceComa } from '../../scripts/utils'

import Alert from '../utils/Alert'
import ComboBox from '../utils/CB'

class Assignment extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' },
            selectedAssignment: undefined
        }
    }
    
    componentDidUpdate() {
        if(this.props.assignmentList[0]) this.SetAssignmentFieldValues(this.props.assignmentList[0])
        else this.SetAssignmentFieldValues({})
    }

    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })

    DeleteAssignment = (event) => {
        event.preventDefault()
        if(this.props.assignmentList[0]){
            let deleteData = [
                { table: 'Assignment', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'id', data: JSON.parse(this.cbDelete.value).id}
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao servidor...', 'info')
            Delete(deleteData, (res, rej) => {
                if(res) {
                    if(res.error) this.ChangeAlert(true, res.error, 'danger')
                    else {
                        this.formRef.reset()
                        this.props.onSubmit()
                        this.ChangeAlert(true, res.result.message, 'success')
                    }
                } else this.ChangeAlert(true, `${rej}`, 'danger')
            })
        } else this.ChangeAlert(true, `Não pode apagar registos se a lista estiver vazia, adiceone um registo no respectivo formulário.`, 'warning')
    }
    
    SetAssignmentFieldValues = (assignment) => {
        let assig = (assignment.assignment) ? ReplaceComa(assignment.assignment) : null
        let description = (assignment && assignment.description) ? ReplaceComa(assignment.description) : null
        this.assignment.value = assig
        this.description.value = description
    }

    LoadDataToFields = () => {
        this.SetAssignmentFieldValues(JSON.parse(this.cbDelete.value))
    }

    render() { 
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.DeleteAssignment} ref={(form) => this.formRef = form}>
                    <ComboBox header={'Função'} list={this.props.assignmentList} onChange={this.LoadDataToFields} ref={(input) => this.cbDelete = input} />
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Função</Form.Label>
                        <Col>
                            <Form.Control type="text" ref={(input) => {this.assignment = input}} disabled/> 
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Descrição</Form.Label>
                        <Col>
                            <Form.Control as="textarea" rows="4" className="noresize" ref={(input) => {this.description = input}} disabled/>
                        </Col>
                    </Form.Group>
                    <Row>
                        <Col>
                            <Button variant="danger" type="submit" block>Apagar</Button>
                        </Col>
                    </Row>
                </Form>
            </React.Fragment>
        )
    }
}
 
export default Assignment;