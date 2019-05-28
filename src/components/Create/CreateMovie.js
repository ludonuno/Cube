import React, { Component } from 'react';
import { Container, Form, Button, InputGroup, Row, Col } from 'react-bootstrap'
import { Create, Get } from '../../scripts/api'
import Alert from '../utils/Alert'
import Navbar from '../CustomNavbar'
import ParentAdvisoryForm from './ParentAdvisoryForm'
import ParentAdvisoryComboBox from './ParentAdvisoryComboBox'
import SagaForm from './SagaForm'
import SagaComboBox from './SagaComboBox'

class CreateMovie extends Component {
    constructor(props) {
        super(props);
        this.ChangeAlert = this.ChangeAlert.bind(this)
        this.AddMovie = this.AddMovie.bind(this)
        this.SetParentAdvisory = this.SetParentAdvisory.bind(this)
        this.SetSaga = this.SetSaga.bind(this)
        this.GetParentAdvisoryList = this.GetParentAdvisoryList.bind(this)
        this.GetSagaList = this.GetSagaList.bind(this)
        this.state = {
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

    AddMovie = (event) => {
        event.preventDefault()
        if(this.state.sagaList[0] && this.state.publishingCompanyList[0]) {
            let insertData = [
                { table: 'Movie', fieldData: [ 
                    {field: 'userEmail', data: this.userEmail.value},
                    {field: 'userPassword', data: this.userPassword.value},
                    {field: 'title', data: this.title.value},
                    {field: 'releaseDate', data: this.releaseDate.value},
                    {field: 'duration', data: this.duration.value},
                    {field: 'synopsis', data: this.synopsis.value},
                    {field: 'sagaId', data: this.state.sagaId ? this.state.sagaId : 1},
                    {field: 'parentAdvisoryId', data: this.state.parentAdvisoryId ? this.state.parentAdvisoryId : 1}
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
        return ( 
            <React.Fragment>
                <Navbar/>
                <ParentAdvisoryForm onSubmit={this.GetParentAdvisoryList} />
                <hr/>
                <SagaForm onSubmit={this.GetSagaList} />
                <hr/>
                <Container>
                    <h3>Create Movie</h3>
                    <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                    <Form onSubmit={this.AddMovie}>
                        <Row>
                            <Col xs={12} lg={6}>
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>E-mail</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="email" ref={(input) => {this.userEmail = input}} required/>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col xs={12} lg={6}>
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Password</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="password" ref={(input) => {this.userPassword = input}} required/>
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
                            <Col xs={12} lg={6}>
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Release date</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="date" ref={(input) => {this.releaseDate = input}} required/>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col xs={12} lg={6}>
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Duration</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="number" defaultValue="0" min="0" max="400" ref={(input) => {this.duration = input}} required/>
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
                                <ParentAdvisoryComboBox list={this.state.parentAdvisoryList} onChange={this.SetParentAdvisoryValue} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <SagaComboBox list={this.state.sagaList} onChange={this.SetSagaValue} />
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
 
export default CreateMovie;