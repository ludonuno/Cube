import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Delete } from '../../scripts/api'
import { ReplaceComa } from '../../scripts/utils'

import Alert from '../utils/Alert'
import ComboBox from '../utils/ComboBox'

class ParentAdvisory extends Component {
    constructor(props) {
        super(props);
        this.ChangeAlert = this.ChangeAlert.bind(this)
        this.DeleteParentAdvisory = this.DeleteParentAdvisory.bind(this)
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' },
            selectedParentAdvisory: undefined
        }
    }
    componentWillReceiveProps(){
        if(this.props.parentAdvisoryList[0])
        this.SetParentAdvisoryFieldValues(this.props.parentAdvisoryList[0])
    }
    SetParentAdvisoryFieldValues = (parentAdvisory) => {
        this.setState({selectedParentAdvisory: parentAdvisory})
        let rate = (parentAdvisory.rate) ? parentAdvisory.rate : null
        let description = (parentAdvisory && parentAdvisory.description) ? ReplaceComa(parentAdvisory.description) : null
        this.rate.value = rate
        this.description.value = description
    }
    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })

    DeleteParentAdvisory = (event) => {
        event.preventDefault()
        if(this.props.parentAdvisoryList[0]){
            let updateData = [
                { table: 'ParentAdvisory', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'id', data: this.state.selectedParentAdvisory.id}
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao servidor...', 'info')
            Delete(updateData, (res, rej) => {
                if(res) {
                    if(res.error) {
                        this.ChangeAlert(true, `${res.error}`, 'danger')
                    } else {
                        this.formRef.reset()
                        this.ChangeAlert(true, `${res.result.message}`, 'success')
                        this.props.onSubmit()
                        this.setState({selectedParentAdvisory: this.props.parentAdvisoryList[0]})
                    }
                } else {
                    this.ChangeAlert(true, `${rej}`, 'danger')
                }
            })
        }
    }
    SetParentAdvisoryToEdit = (event) => {
        this.props.parentAdvisoryList.forEach(parentAdvisory => {
            if(parentAdvisory.id === Number(event.target.value)) {
                this.SetParentAdvisoryFieldValues(parentAdvisory)
            }
        })
    }
    render() {
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.DeleteParentAdvisory} ref={(form) => this.formRef = form}>
                    <ComboBox header={'Acom. Parental'} list={this.props.parentAdvisoryList} onChange={this.SetParentAdvisoryToEdit} />
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Avaliação</Form.Label>
                        <Col>
                            <Form.Control type="text" ref={(input) => {this.rate = input}} disabled/>
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
        );
    }
}
export default ParentAdvisory;