import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Update } from '../../scripts/api'
import { ReplaceComa } from '../../scripts/utils'

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
        if(this.props.gameList[0]) this.SetGameFieldValues(this.props.gameList[0])
        else this.SetGameFieldValues({})
    }
    
    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })

    UpdateGame = (event) => {
        event.preventDefault()
        if(this.props.gameList[0] && this.props.engineList[0] && this.props.parentAdvisoryList[0] && this.props.companyList[0] && this.props.sagaList[0]) {
            let updateData = [
                { table: 'Game', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'id', data: JSON.parse(this.cbGame.value).id},
                    {field: 'title', data: this.title.value},
                    {field: 'releaseDate', data: this.releaseDate.value},
                    {field: 'synopsis', data: this.synopsis.value},
                    {field: 'engineId', data: JSON.parse(this.cbEngineList.value).id},
                    {field: 'parentAdvisoryId', data: JSON.parse(this.cbParentAdvisoryList.value).id},
                    {field: 'publicadorId', data: JSON.parse(this.cbCompanyList.value).id},
                    {field: 'sagaId', data: JSON.parse(this.cbSagaList.value).id}
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Update(updateData, (res, rej) => {
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

    SetGameToEdit = () => {
        this.SetGameFieldValues(JSON.parse(this.cbGame.value))
    }

    SetGameFieldValues = (game) => {
        if(game && this.cbEngineList && this.cbParentAdvisoryList && this.cbCompanyList && this.cbSagaList) {
            let title = game.title ? ReplaceComa(game.title) : null
            let releaseDate = game.releasedate ? game.releasedate.substring(0,10) : null
            let synopsis = game.synopsis ? ReplaceComa(game.synopsis) : null
            let engineId = game.engineid ? game.engineid : null
            let parentAdvisoryId = game.parentadvisoryid ? game.parentadvisoryid : null
            let companyId = game.publicadorid ? game.publicadorid : null
            let sagaId = game.sagaid ? game.sagaid : null

            this.title.value = title
            this.releaseDate.value = releaseDate
            this.synopsis.value = synopsis
            this.cbEngineList.value = JSON.stringify(this.props.engineList.find((e) => { return e.id === engineId }))
            this.cbParentAdvisoryList.value = JSON.stringify(this.props.parentAdvisoryList.find((e) => { return e.id === parentAdvisoryId }))
            this.cbCompanyList.value = JSON.stringify(this.props.companyList.find((e) => { return e.id === companyId }))
            this.cbSagaList.value = JSON.stringify(this.props.sagaList.find((e) => { return e.id === sagaId }))
        }
    }

    render() {
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.UpdateGame} ref={(form) => this.formRef = form}>
                    <ComboBox list={this.props.gameList} header={'Jogos'} ref={(input) => this.cbGame = input} onChange={this.SetGameToEdit}/>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Título</Form.Label>
                        <Col>
                            <Form.Control type="text" ref={(input) => {this.title = input}} required/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Data</Form.Label>
                        <Col>
                            <Form.Control type="date" ref={(input) => {this.releaseDate = input}} required/>
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
                            <Button variant="primary" type="submit" block>Atualizar</Button>
                        </Col>
                    </Row>
                </Form>
            </React.Fragment>
        );
    }
}
 
export default Game;