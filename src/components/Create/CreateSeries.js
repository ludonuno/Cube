import React, { Component } from 'react';
import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap'
import { Create } from '../../scripts/api'

import Alert from '../utils/Alert'
import ComboBox from '../utils/ComboBox'
//TODO: atualizar
class CreateSeries extends Component {
    constructor(props) {
        super(props);
        this.ChangeAlert = this.ChangeAlert.bind(this)
        this.AddSeries = this.AddSeries.bind(this)
        this.SetParentAdvisory = this.SetParentAdvisory.bind(this)
        this.SetSaga = this.SetSaga.bind(this)
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' },
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
        if(this.props.sagaList[0] && this.props.parentAdvisoryList[0]) {
            let insertData = [
                { table: 'Series', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'title', data: this.title.value},
                    {field: 'releaseDate', data: this.releaseDate.value},
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
                    this.formRef.reset()
                    this.ChangeAlert(true, res.result.message, 'success')
                }
            })
        } else {
            this.ChangeAlert(true, 'Por favor adicione os campos em falta', 'warning')
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

    render() {
        return ( 
            <React.Fragment>
                <h3>Create Series</h3>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.AddSeries} ref={(form) => this.formRef = form}>
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
                            <ComboBox header={'Parent Advisory'} list={this.props.parentAdvisoryList} onChange={this.SetParentAdvisory} />
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
 
export default CreateSeries;