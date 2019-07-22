import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Delete } from '../../scripts/api'
import { ReplaceComa } from '../../scripts/utils'

import Alert from '../utils/Alert'
import ComboBox from '../utils/CB'

class Episode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' }
        }
    }

    componentDidUpdate() {
        if(this.props.seriesList[0]) {
            if(this.props.seasonList[0]) {
                if(this.props.episodeList[0]) this.SetEpisodeFieldValues(this.props.episodeList[0])
                else this.SetEpisodeFieldValues({}) 
            } else this.SetEpisodeFieldValues({})
        } else this.SetEpisodeFieldValues({})
    }

    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })

    DeleteEpisode = (event) => {
        event.preventDefault()
        if(this.props.episodeList[0]) {
            let deleteData = [
                { table: 'Episode', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'id', data: JSON.parse(this.cbDeleteEpisode.value).id}
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Delete(deleteData, (res, rej) => {
                if(res) {
                    if(res.error) this.ChangeAlert(true, res.error, 'danger')
                    else {
                        this.formRef.reset()
                        this.props.onSubmit()
                        this.ChangeAlert(true, res.result.message, 'success')
                    }
                } else this.ChangeAlert(true, `${rej}`, 'danger')
            })
        } else this.ChangeAlert(true, `Não pode apagar registos se a lista estiver vazia, adiceone um registo no respectivo formulário.`, 'warning')
    }
    
    SetEpisodeFieldValues = (episode) => {
        let title = (episode.title) ? ReplaceComa(episode.title) : null
        let releaseDate = (episode && episode.releasedate) ? episode.releasedate.substring(0,10) : null
        let synopsis = (episode && episode.synopsis) ? ReplaceComa(episode.synopsis) : null
        this.title.value = title
        this.releaseDate.value = releaseDate
        this.synopsis.value = synopsis
    }

    LoadSeasonData = () => {
        this.props.GetSeasonList(JSON.parse(this.cbDeleteSeries.value).id)
    }
    LoadEpisodeData = () => {
        this.props.GetEpisodeList(JSON.parse(this.cbDeleteSeason.value).id)
    }

    LoadDataToFields = () => {
        this.SetEpisodeFieldValues(JSON.parse(this.cbDeleteEpisode.value))
    }

    render() {
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.DeleteEpisode} ref={(form) => this.formRef = form}>
                    <ComboBox header={'Série'} list={this.props.seriesList} onChange={this.LoadSeasonData} ref={(input) => this.cbDeleteSeries = input} />
                    <ComboBox header={'Temporada'} list={this.props.seasonList} onChange={this.LoadEpisodeData} ref={(input) => this.cbDeleteSeason = input} />
                    <ComboBox header={'Episódio'} list={this.props.episodeList} onChange={this.LoadDataToFields} ref={(input) => this.cbDeleteEpisode = input} />
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
 
export default Episode;