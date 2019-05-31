import React, { Component } from 'react';
import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap'
import { Create } from '../../scripts/api'

import Alert from '../utils/Alert'
import ComboBox from '../utils/ComboBox'

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
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' },
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
        if(this.props.engineList[0] && this.props.parentAdvisoryList[0] && this.props.companyList[0] && this.props.sagaList[0]) {
            let insertData = [
                { table: 'Game', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
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
                    this.formRef.reset()
                    this.ChangeAlert(true, res.result.message, 'success')
                }
            })
        } else {
            this.ChangeAlert(true, 'Por favor adicione os campos em falta', 'warning')
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

    render() {
        return ( 
            <React.Fragment>
                <h3>Create Series</h3>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.AddGame} ref={(form) => this.formRef = form}>
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
                            <ComboBox header={'Engine'} list={this.props.engineList} onChange={this.SetEngine} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ComboBox header={'Parent Advisory'} list={this.props.parentAdvisoryList} onChange={this.SetParentAdvisory} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ComboBox header={'Company'} list={this.props.companyList} onChange={this.SetCompany} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ComboBox header={'Saga'} list={this.props.sagaList} onChange={this.SetSaga} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="primary" type="submit" block>Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </React.Fragment>
        );
    }
}
 
export default CreateGame;