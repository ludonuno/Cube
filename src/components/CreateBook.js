import React, { Component } from 'react';
import { Container, Form, Button, InputGroup, Row, Col } from 'react-bootstrap'
import { Create, Get } from '../scripts/api'

import Alert from './utils/Alert'

import Navbar from './CustomNavbar'
import PublishingCompanyForm from './PublishingCompanyForm'
import PublishingCompanyComboBox from './PublishingCompanyComboBox'
import SagaForm from './SagaForm'
import SagaComboBox from './SagaComboBox'
import DatePicker from './DatePicker'

class CreateBook extends Component {

    constructor(props) {
        super(props);
        this.AddBook = this.AddBook.bind(this)
        this.GetPublisherList = this.GetPublisherList.bind(this)
        this.GetSagaList = this.GetSagaList.bind(this)
        this.state = {
            inserted: { hasInserted: false, message: '', variant: '' },
            publishingCompanyList: [],
            sagaList: [],
            publishingCompanyId: undefined,
            sagaId: undefined
        }
    }
    
    AddBook = (event) => {
        event.preventDefault()
        //userEmail, userPassword, title, releaseDate, synopsis, publishingCompanyId, sagaId,
        if(this.userEmail && this.userPassword && this.state.sagaList[0] && this.state.publishingCompanyList[0]) {
            let insertData = [
                { table: 'Book', fieldData: [ 
                    {field: 'userEmail', data: this.userEmail.value},       // estes dados devem vir da autenticação
                    {field: 'userPassword', data: this.userPassword.value}, // estes dados devem vir da autenticação
                    {field: 'title', data: this.title.value},
                    {field: 'sagaId', data: this.state.sagaId ? this.state.sagaId : 1},
                    {field: 'publishingCompanyId', data: this.state.publishingCompanyId ? this.state.publishingCompanyId : 1}
                ] }
            ]
    
            let inserted = {...this.state.inserted}
            inserted = { visible: true, message: 'A ligar ao servidor...', variant: 'info'}
            this.setState({ inserted })
    
            Create(insertData, (res) => {
                if(res.error) {
                    let inserted = {...this.state.inserted}
                    inserted = { visible: true, message: `${res.error}`, variant: 'danger' }
                    this.setState({ inserted })
                } else {
                    let inserted = {...this.state.inserted}
                    inserted = { visible: true, message: `${res.result.message}`, variant: 'success' }
                    this.setState({ inserted })
                }
            })
        } else {
            let inserted = {...this.state.inserted}
            inserted = { visible: true, message: 'Campos em falta', variant: 'danger'}
            this.setState({ inserted })
            console.log(this.state.sagaList[0], this.state.publishingCompanyList[0])
        }
    }
    
    SetPublisherValue = (value) => {
        let publishingCompanyId = {...this.state.publishingCompanyId}
        publishingCompanyId = value
        this.setState({ publishingCompanyId })
    }

    SetSagaValue = (value) => {
        let sagaId = {...this.state.sagaId}
        sagaId = value
        this.setState({ sagaId })
    }
    
    ChangePublishingCompanyValue = (event) => {
        this.SetPublisherValue(Number(event.target.value))
    }

    ChangeSagaValue = (event) => {
        this.SetSagaValue(Number(event.target.value))
    }
    
    GetPublisherList = () => {
        let searchData = [ { table: 'PublishingCompany', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res.result) {
                let publishingCompanyList = [...this.state.publishingCompanyList]
                publishingCompanyList = res.result
                this.setState({ publishingCompanyList })
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
        this.GetPublisherList()
        this.GetSagaList()
    }

    render() {
        console.log(0)
        return ( 
            <React.Fragment>
                <Navbar/>
                <PublishingCompanyForm GetPublisherList={this.GetPublisherList} />
                <hr/>
                <SagaForm GetSagaList={this.GetSagaList} />
                <hr/>
                <Container>
                    <h3>Create Book</h3>
                    <Alert variant={this.state.inserted.variant} message={this.state.inserted.message} visible={this.state.inserted.visible} />
                    <Form onSubmit={this.AddBook}>
                        <Row>
                            <Col xs={12} lg={6}>
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>E-mail</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="email" autoComplete="username" ref={(email) => {this.userEmail = email}} required/>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col xs={12} lg={6}>
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Password</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="password" autoComplete="current-password" ref={(password) => {this.userPassword = password}} required/>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Title</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="text" ref={(name) => {this.name = name}} required/>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <DatePicker />
                        <PublishingCompanyComboBox list={this.state.publishingCompanyList} ChangePublishingCompanyValue={this.ChangePublishingCompanyValue} />
                        <SagaComboBox list={this.state.sagaList} ChangeSagaValue={this.ChangeSagaValue} />
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Container>
                <br />
            </React.Fragment>
        );
    }
}
 
export default CreateBook;