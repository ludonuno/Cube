import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Update } from '../../scripts/api'
import { ReplaceComa } from '../../scripts/utils'

import Alert from '../utils/Alert'
import ComboBox from '../utils/ComboBox'

//FIXME: Bugs na alteração de episódio com temporada
//FIXME: Os registos permanecem mesmo quando a temproada não tem episódio


class Episode extends Component {
    constructor(props) {
        super(props);
        this.ChangeAlert = this.ChangeAlert.bind(this)
        this.AddEpisode = this.AddEpisode.bind(this)
        this.SetSeries = this.SetSeries.bind(this)
        this.SetSeason = this.SetSeason.bind(this)
        this.ResetForm = this.ResetForm.bind(this)
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' },
            seriesId: undefined,
            seasonId: undefined,
            selectedEpisode: undefined
        }
    }
    componentWillReceiveProps(){
        if(this.props.episodeList[0])
        this.SetEpisodeFieldValues(this.props.episodeList[0])
    }
    SetEpisodeFieldValues = (episode) => {
        this.setState({selectedEpisode: episode})
        let title = (episode.title) ? ReplaceComa(episode.title) : null
        let releaseDate = (episode && episode.releasedate) ? episode.releasedate.substring(0,10) : null
        let synopsis = (episode && episode.synopsis) ? ReplaceComa(episode.synopsis) : null
        let seasonId = (episode.seasonid) ? episode.seasonid : null
        this.title.value = title
        this.releaseDate.value = releaseDate
        this.synopsis.value = synopsis
        this.setState({seasonId: seasonId})
    }
    ChangeAlert(visible, message, variant) {
        this.setState({ alert: { visible: visible, message: message, variant: variant} })
    }

    AddEpisode = (event) => {
        event.preventDefault()
        if(this.props.seriesList[0] && this.props.seasonList[0]) {
            let updateData = [
                { table: 'Episode', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'id', data: this.state.selectedEpisode.id},
                    {field: 'title', data: this.title.value},
                    {field: 'releaseDate', data: this.releaseDate.value},
                    {field: 'synopsis', data: this.synopsis.value},
                    {field: 'seasonId', data: this.state.seasonId ? this.state.seasonId : this.props.seasonList[0].id}
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Update(updateData, (res, rej) => {
                if(res) {
                    if(res.error) {
                        this.ChangeAlert(true, res.error, 'danger')
                    } else {
                        this.ResetForm()
                        this.ChangeAlert(true, res.result.message, 'success')
                        this.props.onSubmit(this.state.seasonId)
                    }
                } else {
                    this.ChangeAlert(true, `${rej}`, 'danger')
                }
            })
        } else {
            this.ChangeAlert(true, 'Por favor adicione os campos em falta', 'warning')
        }
    }
    SetEpisodeToEdit = (event) => {
        this.props.episodeList.forEach(episode => {
            if(episode.id === Number(event.target.value)) {
                this.SetEpisodeFieldValues(episode)
            }
        })
    }
    SetSeries = (event) => {
        this.setState({ seriesId: Number(event.target.value) })
        this.props.GetSeasonList(Number(event.target.value))
    }
    SetSeason = (event) => {
        this.setState({ seasonId: Number(event.target.value) })
        this.props.onSubmit(Number(event.target.value))
    }    
    ResetForm = () => {
        this.formRef.reset()        
        this.setState({seriesId: (this.props.seriesList && this.props.seriesList[0]) ? this.props.seriesList[0].id : undefined})
        this.setState({seasonId: (this.props.seasonList && this.props.seasonList[0]) ? this.props.seasonList[0].id : undefined})
    }
    render() {
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.AddEpisode} ref={(form) => this.formRef = form}>
                    <ComboBox header={'Série'} list={this.props.seriesList} onChange={this.SetSeries} />
                    <ComboBox header={'Temporada'} list={this.props.seasonList} onChange={this.SetSeason} />
                    <ComboBox header={'Episódio'} list={this.props.episodeList} onChange={this.SetEpisodeToEdit} />
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
 
export default Episode;