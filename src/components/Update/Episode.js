import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Update } from '../../scripts/api'
import { ReplaceComa } from '../../scripts/utils'

import Alert from '../utils/Alert'
import DropDown from '../utils/DPEpisode'

class Episode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' },
            seriesId: undefined,
            seasonId: undefined,
            selectedEpisode: undefined
        }
    }
    
    componentDidUpdate() {
        this.formRef.reset()
        if(this.props.episodeList[0]) this.SetEpisodeFieldValues(this.props.episodeList[0])
        else this.SetEpisodeFieldValues({})
    }

    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })

    UpdateEpisode = (event) => {
        event.preventDefault()
        if(this.props.episodeList[0]) {
            let updateData = [
                { table: 'Episode', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'id', data: JSON.parse(this.cbEpisode.value).id},
                    {field: 'title', data: this.title.value},
                    {field: 'releaseDate', data: this.releaseDate.value},
                    {field: 'synopsis', data: this.synopsis.value}
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
    
    
    SetEpisodeToEdit = () => {
        this.SetEpisodeFieldValues(JSON.parse(this.cbEpisode.value))
    }

    SetEpisodeFieldValues = (episode) => {
        if(episode) {
            let title = episode.title ? ReplaceComa(episode.title) : null
            let releaseDate = episode.releaseDate ? episode.releaseDate.substring(0,10) : null
            let synopsis = episode.synopsis ? ReplaceComa(episode.synopsis) : null
            this.title.value = title
            this.releaseDate.value = releaseDate
            this.synopsis.value = synopsis
        }
    }

    render() {
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.UpdateEpisode} ref={(form) => this.formRef = form}>
                    <DropDown header={'Episódio'} list={this.props.episodeList} ref={(input) => this.cbEpisode = input} onChange={this.SetEpisodeToEdit} />
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
 
export default Episode;