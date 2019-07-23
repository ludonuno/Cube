import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Update } from '../../scripts/api'
import { ReplaceComa } from '../../scripts/utils'
import Alert from '../utils/Alert'
import ComboBox from '../utils/CB'

class PublishingCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' }
        }
    }

    componentDidUpdate() {
        this.formRef.reset()
        if(this.props.publishingCompanyList[0]) this.SetPublishingCompanyFieldValues(this.props.publishingCompanyList[0])
        else this.SetPublishingCompanyFieldValues({})
    }

    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })
    
    UpdatePublishingCompany = (event) => {
        event.preventDefault()
        if(this.props.publishingCompanyList[0]) {
            let updateData = [
                { table: 'PublishingCompany', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'id', data: JSON.parse(this.cbPublishingCompany.value).id},
                    {field: 'name', data: this.name.value}
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
    
    SetPublishingCompanyToEdit = () => {
        this.SetPublishingCompanyFieldValues(JSON.parse(this.cbPublishingCompany.value))
    }
    
    SetPublishingCompanyFieldValues = (publishingCompany) => {
        if(publishingCompany) {
            let name = publishingCompany.name ? ReplaceComa(publishingCompany.name) : null
            this.name.value = name
        }
    }

    render() {
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.UpdatePublishingCompany} ref={(form) => this.formRef = form}>
                    <ComboBox list={this.props.publishingCompanyList} header={'Editoras'} ref={(input) => this.cbPublishingCompany = input} onChange={this.SetPublishingCompanyToEdit}/>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Nome</Form.Label>
                        <Col>
                            <Form.Control type="text" ref={(input) => {this.name = input}} required/>
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
 

export default PublishingCompany;