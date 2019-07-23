import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Create } from '../../scripts/api'
import Alert from '../utils/Alert'
import ComboBox from '../utils/CB'
class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' }
        }
    }

    componentDidUpdate() {
        this.formRef.reset()
    }

    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })

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
                    {field: 'engineId', data: JSON.parse(this.cbEngineList.value).id},
                    {field: 'parentAdvisoryId', data: JSON.parse(this.cbParentAdvisoryList.value).id},
                    {field: 'publicadorId', data: JSON.parse(this.cbCompanyList.value).id}, //Tem nome diferente porque na base de dados este campo refere-se a quem publicou o jogo
                    {field: 'sagaId', data: JSON.parse(this.cbSagaList.value).id}
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Create(insertData, (res, rej) => {
                if(res) {
                    if(res.error) this.ChangeAlert(true, res.error, 'danger')
                    else {
                        this.formRef.reset()
                        this.props.onSubmit()
                        this.ChangeAlert(true, res.result.message, 'success')
                    }
                } else this.ChangeAlert(true, `${rej}`, 'danger')
            })
        } else this.ChangeAlert(true, 'Por favor adicione os campos em falta', 'warning')
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
                    <ComboBox list={this.props.engineList} header={'Engine'} ref={(input) => this.cbEngineList = input} />
                    <ComboBox list={this.props.parentAdvisoryList} header={'Acon. Parental'} ref={(input) => this.cbParentAdvisoryList = input} />
                    <ComboBox list={this.props.companyList} header={'Empresa'} ref={(input) => this.cbCompanyList = input} />
                    <ComboBox list={this.props.sagaList} header={'Saga'} ref={(input) => this.cbSagaList = input} />
                    <Row>
                        <Col>
                            <Button variant="success" type="submit" block>Adicionar</Button>
                        </Col>
                    </Row>
                </Form>
            </React.Fragment>
        );
    }
}
 
export default Game;