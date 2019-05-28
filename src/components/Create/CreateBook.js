import React, { Component } from 'react';
import { Container, Form, Button, InputGroup, Row, Col } from 'react-bootstrap'
import { Create, Get } from '../../scripts/api'
import Alert from '../utils/Alert'
import Navbar from '../CustomNavbar'
import PublishingCompanyForm from './PublishingCompanyForm'
import PublishingCompanyComboBox from './PublishingCompanyComboBox'
import SagaForm from './SagaForm'
import SagaComboBox from './SagaComboBox'

class CreateBook extends Component {
    constructor(props) {
        super(props);
        this.ChangeAlert = this.ChangeAlert.bind(this)
        this.AddBook = this.AddBook.bind(this)
        this.SetPublishingCompany = this.SetPublishingCompany.bind(this)
        this.SetSaga = this.SetSaga.bind(this)
        this.GetPublisherList = this.GetPublisherList.bind(this)
        this.GetSagaList = this.GetSagaList.bind(this)
        this.state = {
            alert: { visible: false, message: '', variant: '' },
            publishingCompanyList: [],
            sagaList: [],
            publishingCompanyId: undefined,
            sagaId: undefined
        }
    }

    ChangeAlert(visible, message, variant) {
        let alert = {...this.state.alert}
        alert = { visible: visible, message: message, variant: variant}
        this.setState({ alert })
    }

    AddBook = (event) => {
        event.preventDefault()
        if(this.state.sagaList[0] && this.state.publishingCompanyList[0]) {
            let insertData = [
                { table: 'Book', fieldData: [ 
                    {field: 'userEmail', data: this.userEmail.value},
                    {field: 'userPassword', data: this.userPassword.value},
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

    SetPublishingCompany = (event) => {
        let publishingCompanyId = {...this.state.publishingCompanyId}
        publishingCompanyId = Number(event.target.value)
        this.setState({ publishingCompanyId })
    }

    SetSaga = (event) => {
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
                <PublishingCompanyForm onSubmit={this.GetPublisherList} />
                <hr/>
                <SagaForm onSubmit={this.GetSagaList} />
                <hr/>
                <Container>
                    <h3>Create Book</h3>
                    <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
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
                                            <InputGroup.Text>Synopsis</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control as="textarea" rows="2" className="noresize" ref={(input) => {this.synopsis = input}}/>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <PublishingCompanyComboBox list={this.state.publishingCompanyList} onChange={this.SetPublishingCompany} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <SagaComboBox list={this.state.sagaList} onChange={this.SetSaga} />
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