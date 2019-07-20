import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Create } from '../../scripts/api'

import Alert from '../utils/Alert'
import ComboBox from '../utils/ComboBox'

class Game extends Component {
    constructor(props) {
        super(props);
        this.ChangeAlert = this.ChangeAlert.bind(this)
        this.AddGame = this.AddGame.bind(this)
        this.SetEngine = this.SetEngine.bind(this)
        this.SetParentAdvisory = this.SetParentAdvisory.bind(this)
        this.SetCompany = this.SetCompany.bind(this)
        this.SetSaga = this.SetSaga.bind(this)
        this.ResetForm = this.ResetForm.bind(this)

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
        this.setState({ alert: { visible: visible, message: message, variant: variant} })
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
                    {field: 'engineId', data: this.state.engineId ? this.state.engineId : this.props.engineList[0].id},
                    {field: 'parentAdvisoryId', data: this.state.parentAdvisoryId ? this.state.parentAdvisoryId : this.props.parentAdvisoryList[0].id},
                    {field: 'publicadorId', data: this.state.companyId ? this.state.companyId : this.props.companyList[0].id}, //Tem nome diferente porque na base de dados este campo refere-se a quem publicou o jogo
                    {field: 'sagaId', data: this.state.sagaId ? this.state.sagaId : this.props.sagaList[0].id}
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Create(insertData, (res, rej) => {
                if(res) {    
                    if(res.error) {
                        this.ChangeAlert(true, res.error, 'danger')
                    } else {
                        this.ResetForm()
                        this.ChangeAlert(true, res.result.message, 'success')
                        this.props.onSubmit()
                    }
                } else {
                    this.ChangeAlert(true, `${rej}`, 'danger')
                }
            })
        } else {
            this.ChangeAlert(true, 'Por favor adicione os campos em falta', 'warning')
        }
    }

    SetEngine = (event) => {
        this.setState({ engineId: Number(event.target.value) })
    }
    SetParentAdvisory = (event) => {
        this.setState({ parentAdvisoryId: Number(event.target.value) })
    }
    SetCompany = (event) => {
        this.setState({ companyId: Number(event.target.value) })
    }
    SetSaga = (event) => {
        this.setState({ sagaId: Number(event.target.value) })
    }

    ResetForm = () => {
        this.formRef.reset()        
        this.setState({engineId: this.props.engineList[0] ? this.props.engineList[0].id : undefined})
        this.setState({parentAdvisoryId: this.props.parentAdvisoryList[0] ? this.props.parentAdvisoryList[0].id : undefined})
        this.setState({companyId: this.props.companyList[0] ? this.props.companyList[0].id : undefined})
        this.setState({sagaId: this.props.sagaList[0] ? this.props.sagaList[0].id : undefined})
    }

    render() {
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.AddGame} ref={(form) => this.formRef = form}>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Título</Form.Label>
                        <Col>
                            <Form.Control type="text" ref={(input) => {this.title = input}} required/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Data</Form.Label>
                        <Col>
                            <Form.Control type="date" ref={(input) => {this.releaseDate = input}}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Sinópse</Form.Label>
                        <Col>
                            <Form.Control as="textarea" rows="4" className="noresize" ref={(input) => {this.synopsis = input}}/>
                        </Col>
                    </Form.Group>
                    <ComboBox header={'Engine'} list={this.props.engineList} onChange={this.SetEngine} />
                    <ComboBox header={'Acon. Parental'} list={this.props.parentAdvisoryList} onChange={this.SetParentAdvisory} />
                    <ComboBox header={'Empresa'} list={this.props.companyList} onChange={this.SetCompany} />
                    <ComboBox header={'Saga'} list={this.props.sagaList} onChange={this.SetSaga} />
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
 
export default Game;