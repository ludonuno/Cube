import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Update } from '../../scripts/api'
import { ReplaceComa } from '../../scripts/utils'

import Alert from '../utils/Alert'
import ComboBox from '../utils/ComboBox'
class Company extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' },
            selectedCompany: undefined
        }
    }
    componentWillReceiveProps(){
        if(this.props.companyList[0])
        this.SetCompanyFieldValues(this.props.companyList[0])
    }
    SetCompanyFieldValues = (company) => {
        this.setState({selectedCompany: company})
        let name = (company.name) ? ReplaceComa(company.name) : null
        this.name.value = name
    }

    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })

    UpdateCompany = (event) => {
        event.preventDefault()
        if(this.props.companyList[0]){
            let updateData = [
                { table: 'Company', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'id', data: this.state.selectedCompany.id},
                    {field: 'name', data: this.name.value}
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao servidor...', 'info')
            Update(updateData, (res, rej) => {
                if(res) {
                    if(res.error) {
                        this.ChangeAlert(true, `${res.error}`, 'danger')
                    } else {
                        this.formRef.reset()
                        this.ChangeAlert(true, `${res.result.message}`, 'success')
                        this.props.onSubmit()
                        this.setState({selectedCompany: this.props.companyList[0]})
                    }
                } else {
                    this.ChangeAlert(true, `${rej}`, 'danger')
                }
            })
        }
    }
    SetCompanyToEdit = (event) => {
        this.props.companyList.forEach(company => {
            if(company.id === Number(event.target.value)) {
                this.SetCompanyFieldValues(company)
            }
        })
    }
    render() {
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.UpdateCompany} ref={(form) => this.formRef = form}>
                    <ComboBox header={'Empresa'} list={this.props.companyList} onChange={this.SetCompanyToEdit} />
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Nome</Form.Label>
                        <Col>
                            <Form.Control type="text" ref={(input) => {this.name = input}} required/> 
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
export default Company;