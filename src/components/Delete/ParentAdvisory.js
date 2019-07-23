import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Delete } from '../../scripts/api'
import { ReplaceComa } from '../../scripts/utils'
import Alert from '../utils/Alert'
import ComboBox from '../utils/CB'

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

    DeleteParentAdvisory = (event) => {
        event.preventDefault()
        if(this.props.parentAdvisoryList[0]){
            let deleteData = [
                { table: 'ParentAdvisory', fieldData: [ 
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
    
    SetParentAdvisoryFieldValues = (parentAdvisory) => {
        if(parentAdvisory) {
            let rate = parentAdvisory.rate ? parentAdvisory.rate : null
            let description = parentAdvisory.description ? ReplaceComa(parentAdvisory.description) : null
            this.rate.value = rate
            this.description.value = description
        }
    }

    LoadDataToFields = () => {
        this.SetParentAdvisoryFieldValues(JSON.parse(this.cbDelete.value))
    }

    render() {
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.DeleteParentAdvisory} ref={(form) => this.formRef = form}>
                    <ComboBox header={'Acom. Parental'} list={this.props.parentAdvisoryList} onChange={this.LoadDataToFields} ref={(input) => this.cbDelete = input} />
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