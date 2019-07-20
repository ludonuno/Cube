import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Delete } from '../../scripts/api'
import { ReplaceComa } from '../../scripts/utils'

import Alert from '../utils/Alert'
import ComboBox from '../utils/ComboBox'

class Game extends Component {
    constructor(props) {
        super(props);
        this.ChangeAlert = this.ChangeAlert.bind(this)
        this.DeleteGame = this.DeleteGame.bind(this)
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
            sagaId: undefined,
            selectedGame: undefined
        }
    }
    componentWillReceiveProps(){
        if(this.props.gameList[0])
        this.SetGameFieldValues(this.props.gameList[0])
    }
    SetGameFieldValues = (game) => {
        this.setState({selectedGame: game})
        let title = (game.title) ? ReplaceComa(game.title) : null
        let releaseDate = (game && game.releasedate) ? game.releasedate.substring(0,10) : null
        let synopsis = (game && game.synopsis) ? ReplaceComa(game.synopsis) : null
        let engineId = (game.engineid) ? game.engineid : null
        let parentAdvisoryId = (game.parentadvisoryid) ? game.parentadvisoryid : null
        let publicadorId = (game.publicadorid) ? game.publicadorid : null
        let sagaId = (game.sagaid) ? game.sagaid : null
        
        this.title.value = title
        this.releaseDate.value = releaseDate
        this.synopsis.value = synopsis
        this.props.engineList.forEach(engine => {if(engine.id === engineId) this.engine.value = ReplaceComa(engine.name)})
        this.props.parentAdvisoryList.forEach(parentAdvisory => {if(parentAdvisory.id === parentAdvisoryId) this.parentAdvisory.value = ReplaceComa(parentAdvisory.rate)})
        this.props.companyList.forEach(company => {if(company.id === publicadorId) this.publicador.value = ReplaceComa(company.name)})
        this.props.sagaList.forEach(saga => {if(saga.id === sagaId) this.saga.value = ReplaceComa(saga.name)})
    }
    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })

    DeleteGame = (event) => {
        event.preventDefault()
        if(this.props.gameList[0]) {
            let updateData = [
                { table: 'Game', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'id', data: this.state.selectedGame.id},
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Delete(updateData, (res, rej) => {
                if(res) {
                    if(res.error) {
                        this.ChangeAlert(true, res.error, 'danger')
                    } else {
                        this.ResetForm()
                        this.ChangeAlert(true, res.result.message, 'success')
                        this.props.onSubmit()
                        this.setState({selectedGame: this.props.gameList[0]})
                    }
                } else {
                    this.ChangeAlert(true, `${rej}`, 'danger')
                }
            })
        } else {
            this.ChangeAlert(true, 'Por favor adicione os campos em falta', 'warning')
        }
    }

    SetGameToEdit = (event) => {
        this.props.gameList.forEach(game => {
            if(game.id === Number(event.target.value)) {
                this.SetGameFieldValues(game)
            }
        })
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
                <Form onSubmit={this.DeleteGame} ref={(form) => this.formRef = form}>
                    <ComboBox header={'Jogos'} list={this.props.gameList} onChange={this.SetGameToEdit} />
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Título</Form.Label>
                        <Col>
                            <Form.Control type="text" ref={(input) => {this.title = input}} disabled/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Data</Form.Label>
                        <Col>
                            <Form.Control type="date" ref={(input) => {this.releaseDate = input}} disabled/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Sinópse</Form.Label>
                        <Col>
                            <Form.Control as="textarea" rows="4" className="noresize" ref={(input) => {this.synopsis = input}} disabled/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Engine</Form.Label>
                        <Col>
                            <Form.Control type="text" ref={(input) => {this.engine = input}} disabled/> 
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Acon. Parental</Form.Label>
                        <Col>
                            <Form.Control type="text" ref={(input) => {this.parentAdvisory = input}} disabled/> 
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Empresa</Form.Label>
                        <Col>
                            <Form.Control type="text" ref={(input) => {this.publicador = input}} disabled/> 
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Saga</Form.Label>
                        <Col>
                            <Form.Control type="text" ref={(input) => {this.saga = input}} disabled/> 
                        </Col>
                    </Form.Group>
                    <Row>
                        <Col>
                            <Button variant="danger" type="submit" block>Apagar</Button>
                        </Col>
                    </Row>
                </Form>
            </React.Fragment>
        );
    }
}
 
export default Game;