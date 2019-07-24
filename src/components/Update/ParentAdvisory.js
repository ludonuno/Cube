import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Update } from '../../scripts/api'
import { ReplaceComa } from '../../scripts/utils'
import Alert from '../utils/Alert'
import DropDown from '../utils/DP'

class ParentAdvisory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' }
        }
    }

    componentDidUpdate() {
        this.formRef.reset()
        if(this.props.parentAdvisoryList[0]) this.SetParentAdvisoryFieldValues(this.props.parentAdvisoryList[0])
        else this.SetParentAdvisoryFieldValues({})
    }
    
    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })

    UpdateParentAdvisory = (event) => {
        event.preventDefault()
        if(this.props.parentAdvisoryList[0]){
            let updateData = [
                { table: 'ParentAdvisory', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'id', data: JSON.parse(this.cbParentAdvisory.value).id},
                    {field: 'rate', data: this.rate.value},
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
    
    SetParentAdvisoryToEdit = () => {
        this.SetParentAdvisoryFieldValues(JSON.parse(this.cbParentAdvisory.value))
    }

    SetParentAdvisoryFieldValues = (parentAdvisory) => {
        if(parentAdvisory) {
            let rate = parentAdvisory.rate ? parentAdvisory.rate : null
            let description = parentAdvisory.description ? ReplaceComa(parentAdvisory.description) : null
            this.rate.value = rate
            this.description.value = description
        }
    }

    render() {
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.UpdateParentAdvisory} ref={(form) => this.formRef = form}>
                    <DropDown list={this.props.parentAdvisoryList} header={'Acom. Parental'} ref={(input) => this.cbParentAdvisory = input} onChange={this.SetParentAdvisoryToEdit}/>
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
                            <Button variant="primary" type="submit" block>Atualizar</Button>
                        </Col>
                    </Row>
                </Form>
            </React.Fragment>
        );
    }
}
export default ParentAdvisory;