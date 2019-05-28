import React, { Component } from 'react';
import { Container, Form, Button, InputGroup, Row, Col } from 'react-bootstrap'
import { Create, Get } from '../scripts/api'

import Alert from './utils/Alert'

import Navbar from './CustomNavbar'
import PublishingCompanyForm from './PublishingCompanyForm'
import PublishingCompanyComboBox from './PublishingCompanyComboBox'
import SagaForm from './SagaForm'
import SagaComboBox from './SagaComboBox'

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
            console.log(this.userEmail.value)
            console.log(this.userPassword.value)
            console.log(this.title.value)
            console.log(this.releaseDate.value)
            console.log(this.synopsis.value)
            console.log(this.state.sagaId)
            console.log(this.state.publishingCompanyId)
            let insertData = [
                { table: 'Book', fieldData: [ 
                    {field: 'userEmail', data: this.userEmail.value},       // estes dados devem vir da autenticação
                    {field: 'userPassword', data: this.userPassword.value}, // estes dados devem vir da autenticação
                    {field: 'title', data: this.title.value},
                    {field: 'releaseDate', data: this.releaseDate.value},
                    {field: 'synopsis', data: this.synopsis.value},
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

    SetPublishingCompanyValue = (event) => {
        let publishingCompanyId = {...this.state.publishingCompanyId}
        publishingCompanyId = Number(event.target.value)
        this.setState({ publishingCompanyId })
    }

    SetSagaValue = (event) => {
        let sagaId = {...this.state.sagaId}
        sagaId = Number(event.target.value)
        this.setState({ sagaId })
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
                                        <Form.Control type="email" autoComplete="username" ref={(input) => {this.userEmail = input}} required/>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col xs={12} lg={6}>
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Password</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="password" autoComplete="current-password" ref={(input) => {this.userPassword = input}} required/>
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
                                            <InputGroup.Text>Sinopse</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control as="textarea" rows="3" className="noresize" ref={(input) => {this.synopsis = input}}/>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <PublishingCompanyComboBox list={this.state.publishingCompanyList} SetPublishingCompanyValue={this.SetPublishingCompanyValue} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <SagaComboBox list={this.state.sagaList} SetSagaValue={this.SetSagaValue} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="primary" type="submit">Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
                <br />
            </React.Fragment>
        );
    }
}
 
export default CreateBook;