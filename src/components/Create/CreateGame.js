import React, { Component } from 'react';
import { Container, Form, Button, InputGroup, Row, Col } from 'react-bootstrap'
import { Create, Get } from '../../scripts/api'

import Alert from '../utils/Alert'
import ComboBox from '../utils/ComboBox'
import Navbar from '../CustomNavbar'

import EngineForm from './EngineForm'
import ParentAdvisoryForm from './ParentAdvisoryForm'
import CompanyForm from './CompanyForm'
import SagaForm from './SagaForm'

//TODO: atualizar
class CreateGame extends Component {
    constructor(props) {
        super(props);
        this.ChangeAlert = this.ChangeAlert.bind(this)
        this.AddGame = this.AddGame.bind(this)
        
        this.SetEngine = this.SetEngine.bind(this)
        this.SetParentAdvisory = this.SetParentAdvisory.bind(this)
        this.SetCompany = this.SetCompany.bind(this)
        this.SetSaga = this.SetSaga.bind(this)

        this.GetEngineList = this.GetEngineList.bind(this)        
        this.GetParentAdvisoryList = this.GetParentAdvisoryList.bind(this)        
        this.GetCompanyList = this.GetCompanyList.bind(this)        
        this.GetSagaList = this.GetSagaList.bind(this)
        this.state = {
            user: JSON.parse(localStorage.getItem('user')),
            alert: { visible: false, message: '', variant: '' },
            engineList: [],
            parentAdvisoryList: [],
            companyList: [],
            sagaList: [],
            engineId: undefined,
            parentAdvisoryId: undefined,
            companyId: undefined,
            sagaId: undefined
        }
    }

    ChangeAlert(visible, message, variant) {
        let alert = {...this.state.alert}
        alert = { visible: visible, message: message, variant: variant}
        this.setState({ alert })
    }

    AddGame = (event) => {
        event.preventDefault()
        if(this.state.engineList[0] && this.state.parentAdvisoryList[0] && this.state.companyList[0] && this.state.sagaList[0]) {
            let insertData = [
                { table: 'Game', fieldData: [ 
                    {field: 'userEmail', data: this.userEmail.value},
                    {field: 'userPassword', data: this.userPassword.value},
                    {field: 'title', data: this.title.value},
                    {field: 'releaseDate', data: this.releaseDate.value},
                    {field: 'synopsis', data: this.synopsis.value},
                    {field: 'engineId', data: this.state.engineId ? this.state.engineId : 1},
                    {field: 'parentAdvisoryId', data: this.state.parentAdvisoryId ? this.state.parentAdvisoryId : 1},
                    {field: 'publicadorId', data: this.state.companyId ? this.state.companyId : 1}, //Tem nome diferente porque na base de dados este campo refere-se a quem publicou o jogo
                    {field: 'sagaId', data: this.state.sagaId ? this.state.sagaId : 1}
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

    SetEngine = (event) => {
        let engineId = {...this.state.engineId}
        engineId = Number(event.target.value)
        this.setState({ engineId })
    }

    SetParentAdvisory = (event) => {
        let parentAdvisoryId = {...this.state.parentAdvisoryId}
        parentAdvisoryId = Number(event.target.value)
        this.setState({ parentAdvisoryId })
    }

    SetCompany = (event) => {
        let companyId = {...this.state.companyId}
        companyId = Number(event.target.value)
        this.setState({ companyId })
    }

    SetSaga = (event) => {
        let sagaId = {...this.state.sagaId}
        sagaId = Number(event.target.value)
        this.setState({ sagaId })
    }

    GetEngineList = () => {
        let searchData = [ { table: 'Engine', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res.result) {
                let engineList = [...this.state.engineList]
                engineList = res.result
                this.setState({ engineList })
            }  
        })
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

    GetCompanyList = () => {
        let searchData = [ { table: 'Company', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res.result) {
                let companyList = [...this.state.companyList]
                companyList = res.result
                this.setState({ companyList })
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
        this.GetEngineList()
        this.GetParentAdvisoryList()
        this.GetCompanyList()
        this.GetSagaList()
    }

    render() {
        return ( 
            <React.Fragment>
                <Navbar />
                <EngineForm onSubmit={this.GetEngineList} />
                <hr/>
                <ParentAdvisoryForm onSubmit={this.GetParentAdvisoryList} />
                <hr/>
                <CompanyForm onSubmit={this.GetCompanyList} />
                <hr/>
                <SagaForm onSubmit={this.GetSagaList} />
                <hr/>
                <Container>
                    <h3>Create Series</h3>
                    <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                    <Form onSubmit={this.AddGame}>
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
                                <ComboBox header={'Engine'} list={this.state.engineList} onChange={this.SetEngine} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ComboBox header={'Parent Advisory'} list={this.state.parentAdvisoryList} onChange={this.SetParentAdvisory} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ComboBox header={'Company'} list={this.state.companyList} onChange={this.SetCompany} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ComboBox header={'Saga'} list={this.state.sagaList} onChange={this.SetSaga} />
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
 
export default CreateGame;