import React, { Component } from 'react';
import { Container, Form, Button, InputGroup, Row, Col } from 'react-bootstrap'
import { Create, Get } from '../../scripts/api'
import { Redirect } from 'react-router-dom'

import Alert from '../utils/Alert'
import ComboBox from '../utils/ComboBox'

import Navbar from '../CustomNavbar'

import ParentAdvisoryForm from './ParentAdvisoryForm'
import SagaForm from './SagaForm'
//TODO: atualizar
class CreateSeries extends Component {
    constructor(props) {
        super(props);
        this.ChangeAlert = this.ChangeAlert.bind(this)
        this.AddSeries = this.AddSeries.bind(this)
        
        this.SetPublishingCompany = this.SetPublishingCompany.bind(this)
        this.SetSaga = this.SetSaga.bind(this)
        
        this.GetPublisherList = this.GetPublisherList.bind(this)
        this.GetSagaList = this.GetSagaList.bind(this)
        this.state = {
            user: JSON.parse(localStorage.getItem('user'))[0],
            alert: { visible: false, message: '', variant: '' },
            parentAdvisoryList: [],
            sagaList: [],
            parentAdvisoryId: undefined,
            sagaId: undefined
        }
    }

    ChangeAlert(visible, message, variant) {
        let alert = {...this.state.alert}
        alert = { visible: visible, message: message, variant: variant}
        this.setState({ alert })
    }

    AddSeries = (event) => {
        event.preventDefault()
        if(this.state.sagaList[0] && this.state.publishingCompanyList[0]) {
            let insertData = [
                { table: 'Book', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'title', data: this.title.value},
                    {field: 'releaseDate', data: this.releaseDate.value},
                    {field: 'synopsis', data: this.synopsis.value},
                    {field: 'sagaId', data: this.state.sagaId ? this.state.sagaId : 1},
                    {field: 'publishingCompanyId', data: this.state.publishingCompanyId ? this.state.publishingCompanyId : 1}
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Create(insertData, (res) => {
                if(res.error) {
                    this.ChangeAlert(true, res.error, 'danger')
                } else {
                    this.ChangeAlert(true, res.result.message, 'success')
                }
            })
        } else {
            this.ChangeAlert(true, 'Campos em falta', 'warning')
        }
    }

    SetParentAdvisory = (event) => {
        let parentAdvisoryId = {...this.state.parentAdvisoryId}
        parentAdvisoryId = Number(event.target.value)
        this.setState({ parentAdvisoryId })
    }

    SetSaga = (event) => {
        let sagaId = {...this.state.sagaId}
        sagaId = Number(event.target.value)
        this.setState({ sagaId })
    }
    
    GetParentAdvisoryList = () => {
        let searchData = [ { table: 'ParentAdvisory', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res.result) {
                let parentAdvisoryList = [...this.state.parentAdvisoryList]
                parentAdvisoryList = res.result
                this.setState({ parentAdvisoryList })
            }  
        })
    }

    GetSagaList = () => {
        let searchData = [ { table: 'Saga', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res.result) {
                let sagaList = [...this.state.sagaList]
                sagaList = res.result
                this.setState({ sagaList })
            }  
        })
    }

    componentDidMount() {
        this.GetParentAdvisoryList()
        this.GetSagaList()
    }

    render() {
        if(!this.state.user) {
            return (<Redirect to='/noMatch' />)
        }
        return ( 
            <React.Fragment>
                <Navbar/>
                <ParentAdvisoryForm onSubmit={this.GetParentAdvisoryList} />
                <hr/>
                <SagaForm onSubmit={this.GetSagaList} />
                <hr/>
                <Container>
                    <h3>Create Series</h3>
                    <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                    <Form onSubmit={this.AddSeries}>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Title</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="text" ref={(input) => {this.title = input}} required/>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Release date</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="date" ref={(input) => {this.releaseDate = input}} required/>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Synopsis</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control as="textarea" rows="3" className="noresize" ref={(input) => {this.synopsis = input}}/>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ComboBox header={'Parent Advisory'} list={this.state.parentAdvisoryList} onChange={this.SetParentAdvisory} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ComboBox header={'Saga'} list={this.state.sagaList} onChange={this.SetSaga} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="primary" type="submit" block>Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
                <br />
            </React.Fragment>
        );
    }
}
 
export default CreateSeries;