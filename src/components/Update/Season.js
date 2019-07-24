import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Update } from '../../scripts/api'
import { ReplaceComa } from '../../scripts/utils'

import Alert from '../utils/Alert'
import DropDown from '../utils/DPSeason'
class Season extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' },
        }
    }

    componentDidUpdate() {
        this.formRef.reset()
        if(this.props.seasonList[0]) this.SetSeasonFieldValues(this.props.seasonList[0])
        else this.SetSeasonFieldValues({})
    }
    
    ChangeAlert(visible, message, variant) { this.setState({ alert: { visible: visible, message: message, variant: variant} }) }

    UpdateSeason = (event) => {
        event.preventDefault()
        if(this.props.seasonList[0]) {
            let insertData = [
                { table: 'Season', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'id', data: JSON.parse(this.cbSeason.value).id},
                    {field: 'title', data: this.title.value},
                    {field: 'releaseDate', data: this.releaseDate.value},
                    {field: 'synopsis', data: this.synopsis.value}
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Update(insertData, (res, rej) => {
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
    
    SetSeasonFieldValues = (season) => {
        if(season) {
            let title = season.title ? ReplaceComa(season.title) : null
            let releaseDate = season.releaseDate ? season.releaseDate.substring(0,10) : null
            let synopsis = season.synopsis ? ReplaceComa(season.synopsis) : null
            this.title.value = title
            this.releaseDate.value = releaseDate
            this.synopsis.value = synopsis
        }
    }
    SetSeasonToEdit = () => {
        this.SetSeasonFieldValues(JSON.parse(this.cbSeason.value))
    }

    render() {
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.UpdateSeason} ref={(form) => this.formRef = form}>
                    <DropDown header={'Temporada'} list={this.props.seasonList} onChange={this.SetSeasonToEdit} ref={(input) => this.cbSeason = input}/>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Título</Form.Label>
                        <Col>
                            <Form.Control type="text" ref={(input) => {this.title = input}} required/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Data</Form.Label>
                        <Col>
                            <Form.Control type="date" ref={(input) => {this.releaseDate = input}} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Sinópse</Form.Label>
                        <Col>
                            <Form.Control as="textarea" rows="4" className="noresize" ref={(input) => {this.synopsis = input}}/>
                        </Col>
                    </Form.Group>
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
 
export default Season;