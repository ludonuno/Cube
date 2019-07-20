import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Delete } from '../../scripts/api'
import { ReplaceComa } from '../../scripts/utils'

import Alert from '../utils/Alert'
import ComboBox from '../utils/ComboBox'

class PublishingCompany extends Component {
    constructor(props) {
        super(props);
        this.ChangeAlert = this.ChangeAlert.bind(this)
        this.AddPublishingCompany = this.AddPublishingCompany.bind(this)
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' },
            selectedPublishingCompany: undefined
        }
    }

    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })
    componentWillReceiveProps(){
        if(this.props.publishingCompanyList[0])
        this.SetPublishingCompanyFieldValues(this.props.publishingCompanyList[0])
    }
    SetPublishingCompanyFieldValues = (publishingCompany) => {
        this.setState({selectedPublishingCompany: publishingCompany})
        let name = (publishingCompany.name) ? ReplaceComa(publishingCompany.name) : null
        this.name.value = name
    }
    AddPublishingCompany = (event) => {
        event.preventDefault()
        let updateData = [
            { table: 'PublishingCompany', fieldData: [ 
                {field: 'userEmail', data: this.state.user.email},
                {field: 'userPassword', data: this.state.user.password},
                {field: 'id', data: this.state.selectedPublishingCompany.id}
            ] }
        ]
        this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
        Delete(updateData, (res, rej) => {
            if(res) {
                if(res.error) {
                    this.ChangeAlert(true, res.error, 'danger')
                } else {
                    this.formRef.reset()
                    this.ChangeAlert(true, res.result.message, 'success')
                    this.props.onSubmit()
                    this.setState({selectedPublishingCompany: this.props.publishingCompanyList[0]})
                }
            } else {
                this.ChangeAlert(true, `${rej}`, 'danger')
            }
        })
    }
    SetPublishingCompanyToEdit = (event) => {
        this.props.publishingCompanyList.forEach(publishingCompany => {
            if(publishingCompany.id === Number(event.target.value)) {
                this.SetPublishingCompanyFieldValues(publishingCompany)
            }
        })
    }
    render() {
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.AddPublishingCompany} ref={(form) => this.formRef = form}>
                    <ComboBox header={'Livros'} list={this.props.publishingCompanyList} onChange={this.SetPublishingCompanyToEdit} />
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Nome</Form.Label>
                        <Col>
                            <Form.Control type="text" ref={(input) => {this.name = input}} disabled/>
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
 

export default PublishingCompany;