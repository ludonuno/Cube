import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Update } from '../../scripts/api'
import { ReplaceComa } from '../../scripts/utils'

import Alert from '../utils/Alert'
import ComboBox from '../utils/ComboBox'
class Season extends Component {
    constructor(props) {
        super(props);
        this.ChangeAlert = this.ChangeAlert.bind(this)
        this.UpdateSeason = this.UpdateSeason.bind(this)
        this.ResetForm = this.ResetForm.bind(this)
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' },
            seriesId: undefined,
            selectedSeason: undefined
        }
    }
    componentWillReceiveProps(){
        if(this.props.seasonList[0]) {
            this.SetSeasonFieldValues(this.props.seasonList[0])
            this.setState({seriesId: this.props.seriesList[0].id})
        }
    }
    SetSeasonFieldValues = (season) => {
        this.setState({selectedSeason: season})
        let title = (season.title) ? ReplaceComa(season.title) : null
        let releaseDate = (season && season.releasedate) ? season.releasedate.substring(0,10) : null
        let synopsis = (season && season.synopsis) ? ReplaceComa(season.synopsis) : null
        let seriesId = (season.seriesid) ? season.seriesid : null
        this.title.value = title
        this.releaseDate.value = releaseDate
        this.synopsis.value = synopsis
        this.setState({seriesId: seriesId})
    }
    ChangeAlert(visible, message, variant) {
        this.setState({ alert: { visible: visible, message: message, variant: variant} })
    }

    UpdateSeason = (event) => {
        event.preventDefault()
        if(this.props.seasonList[0] && this.props.seriesList[0]) {
            let insertData = [
                { table: 'Season', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'id', data: this.state.selectedSeason.id},
                    {field: 'title', data: this.title.value},
                    {field: 'releaseDate', data: this.releaseDate.value},
                    {field: 'synopsis', data: this.synopsis.value},
                    {field: 'seriesId', data: this.state.seriesId ? this.state.seriesId : this.props.seriesList[0].id}
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Update(insertData, (res, rej) => {
                if(res) {
                    if(res.error) {
                        this.ChangeAlert(true, res.error, 'danger')
                    } else {
                        this.ResetForm()
                        this.ChangeAlert(true, res.result.message, 'success')
                        this.props.onSubmit(this.state.seriesId)
                        this.setState({selectedSeason: this.props.seasonList[0]})
                    }
                } else {
                    this.ChangeAlert(true, `${rej}`, 'danger')
                }
            })
        } else {
            this.ChangeAlert(true, 'Por favor adicione os campos em falta', 'warning')
        }
    }
    SetSeasonToEdit = (event) => {
        this.props.seasonList.forEach(season => {
            if(season.id === Number(event.target.value)) {
                this.SetSeasonFieldValues(season)
            }
        })
    }
    SetSeries = (event) => {
        this.setState({ seriesId: Number(event.target.value) })
        this.props.onSubmit(Number(event.target.value))
    }
    
    ResetForm = () => {
        this.formRef.reset()        
        this.setState({seriesId: (this.props.seriesList && this.props.seriesList[0]) ? this.props.seriesList[0].id : undefined})
    }
    
    render() {
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.UpdateSeason} ref={(form) => this.formRef = form}>
                    <ComboBox header={'Série'} list={this.props.seriesList} onChange={this.SetSeries} />
                    <ComboBox header={'Temporada'} list={this.props.seasonList} onChange={this.SetSeasonToEdit} />
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
                            <Button variant="primary" type="submit" block>Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </React.Fragment>
        );
    }
}
 
export default Season;