import React, { Component } from 'react';
import { Row, Col, Form, Button, Accordion, Card } from 'react-bootstrap'
import { Create /*, Get */ } from '../../scripts/api'
import Alert from '../utils/Alert'
import DropDown from '../utils/DP'
import DropDownSeason from '../utils/DPSeason'
import DropDownEpisode from '../utils/DPEpisode'

class Video extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' }
        }
    }

    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })

    AddVideoBook = (event) => {
        event.preventDefault()
        if(this.props.bookList[0]) {
            let insertData = [
                { table: 'VideoBook', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'link', data: this.linkBook.value},
                    {field: 'bookId', data: JSON.parse(this.cbBook.value).id},
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Create(insertData, (res, rej) => {
                if(res) {
                    if(res.error) this.ChangeAlert(true, res.error, 'danger')
                    else {
                        this.formRefBook.reset()
                        this.ChangeAlert(true, res.result.message, 'success')
                    }
                } else this.ChangeAlert(true, `${rej}`, 'danger')
            })
        } else this.ChangeAlert(true, 'Por favor adicione os campos em falta', 'warning')
    }

    AddVideoGame = (event) => {
        event.preventDefault()
        if(this.props.gameList[0]) {
            let insertData = [
                { table: 'VideoGame', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'link', data: this.linkGame.value},
                    {field: 'gameId', data: JSON.parse(this.cbGame.value).id},
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Create(insertData, (res, rej) => {
                if(res) {
                    if(res.error) this.ChangeAlert(true, res.error, 'danger')
                    else {
                        this.formRefGame.reset()
                        this.ChangeAlert(true, res.result.message, 'success')
                    }
                } else this.ChangeAlert(true, `${rej}`, 'danger')
            })
        } else this.ChangeAlert(true, 'Por favor adicione os campos em falta', 'warning')
    }

    AddVideoMovie = (event) => {
        event.preventDefault()
        if(this.props.movieList[0]) {
            let insertData = [
                { table: 'VideoMovie', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'link', data: this.linkMovie.value},
                    {field: 'movieId', data: JSON.parse(this.cbMovie.value).id},
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Create(insertData, (res, rej) => {
                if(res) {
                    if(res.error) this.ChangeAlert(true, res.error, 'danger')
                    else {
                        this.formRefMovie.reset()
                        this.ChangeAlert(true, res.result.message, 'success')
                    }
                } else this.ChangeAlert(true, `${rej}`, 'danger')
            })
        } else this.ChangeAlert(true, 'Por favor adicione os campos em falta', 'warning')
    }

    AddVideoSeries = (event) => {
        event.preventDefault()
        if(this.props.seriesList[0]) {
            let insertData = [
                { table: 'VideoSeries', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'link', data: this.linkSeries.value},
                    {field: 'seriesId', data: JSON.parse(this.cbSeries.value).id},
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Create(insertData, (res, rej) => {
                if(res) {
                    if(res.error) this.ChangeAlert(true, res.error, 'danger')
                    else {
                        this.formRefSeries.reset()
                        this.ChangeAlert(true, res.result.message, 'success')
                    }
                } else this.ChangeAlert(true, `${rej}`, 'danger')
            })
        } else this.ChangeAlert(true, 'Por favor adicione os campos em falta', 'warning')
    }

    AddVideoSeason = (event) => {
        event.preventDefault()
        if(this.props.seasonList[0]) {
            let insertData = [
                { table: 'VideoSeason', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'link', data: this.linkSeason.value},
                    {field: 'seasonId', data: JSON.parse(this.cbSeason.value).id},
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Create(insertData, (res, rej) => {
                if(res) {
                    if(res.error) this.ChangeAlert(true, res.error, 'danger')
                    else {
                        this.formRefSeason.reset()
                        this.ChangeAlert(true, res.result.message, 'success')
                    }
                } else this.ChangeAlert(true, `${rej}`, 'danger')
            })
        } else this.ChangeAlert(true, 'Por favor adicione os campos em falta', 'warning')
    }

    AddVideoEpisode = (event) => {
        event.preventDefault()
        if(this.props.episodeList[0]) {
            let insertData = [
                { table: 'VideoEpisode', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'link', data: this.linkEpisode.value},
                    {field: 'episodeId', data: JSON.parse(this.cbEpisode.value).id},
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Create(insertData, (res, rej) => {
                if(res) {
                    if(res.error) this.ChangeAlert(true, res.error, 'danger')
                    else {
                        this.formRefEpisode.reset()
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
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0"  id="accordionBook" ref={(accordion) => this.accordionPage = accordion} onClick={this.ResetForm}>
                            Adicionar um vídeo a um Livro
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Form onSubmit={this.AddVideoBook} ref={(form) => this.formRefBook = form}>
                                    <Form.Group as={Row}> 
                                        <Form.Label column lg={12} xl={2}>Link do vídeo</Form.Label>
                                        <Col>
                                            <Form.Control type="text" ref={(input) => {this.linkBook = input}} required/>
                                        </Col>
                                    </Form.Group>
                                    <DropDown header={'Livro'} list={this.props.bookList} ref={(input) => this.cbBook= input} />
                                    <Row>
                                        <Col>
                                            <Button variant="success" type="submit" block>Adicionar</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1"  id="accordionGame" ref={(accordion) => this.accordionPage = accordion} onClick={this.ResetForm}>
                            Adicionar um vídeo a um Jogo
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <Form onSubmit={this.AddVideoGame} ref={(form) => this.formRefGame = form}>
                                    <Form.Group as={Row}> 
                                        <Form.Label column lg={12} xl={2}>Link do vídeo</Form.Label>
                                        <Col>
                                            <Form.Control type="text" ref={(input) => {this.linkGame = input}} required/>
                                        </Col>
                                    </Form.Group>
                                    <DropDown header={'Jogo'} list={this.props.gameList} ref={(input) => this.cbGame= input} />
                                    <Row>
                                        <Col>
                                            <Button variant="success" type="submit" block>Adicionar</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="2" id="accordionMovie" ref={(accordion) => this.accordionPage = accordion} onClick={this.ResetForm}>
                            Adicionar um vídeo a um Filme
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body>
                                <Form onSubmit={this.AddVideoMovie} ref={(form) => this.formRefMovie = form}>
                                    <Form.Group as={Row}> 
                                        <Form.Label column lg={12} xl={2}>Link do vídeo</Form.Label>
                                        <Col>
                                            <Form.Control type="text" ref={(input) => {this.linkMovie = input}} required/>
                                        </Col>
                                    </Form.Group>
                                    <DropDown header={'Filme'} list={this.props.movieList} ref={(input) => this.cbMovie= input} />
                                    <Row>
                                        <Col>
                                            <Button variant="success" type="submit" block>Adicionar</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="3" id="accordionSeries" ref={(accordion) => this.accordionPage = accordion} onClick={this.ResetForm}>
                            Adicionar um vídeo a uma Série
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="3">
                            <Card.Body>
                                <Form onSubmit={this.AddVideoSeries} ref={(form) => this.formRefSeries = form}>
                                    <Form.Group as={Row}> 
                                        <Form.Label column lg={12} xl={2}>Link do vídeo</Form.Label>
                                        <Col>
                                            <Form.Control type="text" ref={(input) => {this.linkSeries = input}} required/>
                                        </Col>
                                    </Form.Group>
                                    <DropDown header={'Séries'} list={this.props.seriesList} ref={(input) => this.cbSeries= input} />
                                    <Row>
                                        <Col>
                                            <Button variant="success" type="submit" block>Adicionar</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="4" id="accordionSeason" ref={(accordion) => this.accordionPage = accordion} onClick={this.ResetForm}>
                            Adicionar um vídeo a uma Temporada
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="4">
                            <Card.Body>
                                <Form onSubmit={this.AddVideoSeason} ref={(form) => this.formRefSeason = form}>
                                    <Form.Group as={Row}> 
                                        <Form.Label column lg={12} xl={2}>Link do vídeo</Form.Label>
                                        <Col>
                                            <Form.Control type="text" ref={(input) => {this.linkSeason = input}} required/>
                                        </Col>
                                    </Form.Group>
                                    <DropDownSeason header={'Temporada'} list={this.props.seasonList} ref={(input) => this.cbSeason= input}/>
                                    <Row>
                                        <Col>
                                            <Button variant="success" type="submit" block>Adicionar</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="5" id="accordionEpisode" ref={(accordion) => this.accordionPage = accordion} onClick={this.ResetForm}>
                            Adicionar um vídeo a um Episódio
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="5">
                            <Card.Body>
                                <Form onSubmit={this.AddVideoEpisode} ref={(form) => this.formRefEpisode = form}>
                                    <Form.Group as={Row}> 
                                        <Form.Label column lg={12} xl={2}>Link do vídeo</Form.Label>
                                        <Col>
                                            <Form.Control type="text" ref={(input) => {this.linkEpisode = input}} required/>
                                        </Col>
                                    </Form.Group>
                                    <DropDownEpisode header={'Episódio'} list={this.props.episodeList} ref={(input) => this.cbEpisode= input}/>
                                    <Row>
                                        <Col>
                                            <Button variant="success" type="submit" block>Adicionar</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </React.Fragment>
        )
    }
}

export default Video;