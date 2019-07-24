import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Update } from '../../scripts/api'
import { ReplaceComa } from '../../scripts/utils'
import Alert from '../utils/Alert'
import DropDown from '../utils/DP'

class Saga extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' }
        }
    }

    componentDidUpdate() {
        this.formRef.reset()
        if(this.props.sagaList[0]) this.SetSagaFieldValues(this.props.sagaList[0])
        else this.SetSagaFieldValues({})
    }

    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })

    UpdateSaga = (event) => {
        event.preventDefault()
        if(this.props.sagaList[0]){
            let updateData = [
                { table: 'Saga', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'id', data: JSON.parse(this.cbSaga.value).id},
                    {field: 'name', data: this.name.value},
                    {field: 'description', data: this.description.value}
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
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
    
    SetSagaToEdit = () => {
        this.SetSagaFieldValues(JSON.parse(this.cbSaga.value))
    }
    SetSagaFieldValues = (saga) => {
        if(saga) {
            let name = saga.name ? ReplaceComa(saga.name) : null
            let description = saga.description ? ReplaceComa(saga.description) : null
            this.name.value = name
            this.description.value = description
        }
    }

    render() {
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.UpdateSaga} ref={(form) => this.formRef = form}>
                    <DropDown list={this.props.sagaList} header={'Saga'} ref={(input) => this.cbSaga = input} onChange={this.SetSagaToEdit}/>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Nome</Form.Label>
                        <Col>
                            <Form.Control type="text" ref={(input) => {this.name = input}} required/>
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
 

export default Saga;