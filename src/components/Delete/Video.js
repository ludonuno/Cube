import React, { Component } from 'react';
import { Row, Col, Form, Button, Accordion, Card, Jumbotron } from 'react-bootstrap'
import { Delete } from '../../scripts/api'
import Alert from '../utils/Alert'
import ComboBox from '../utils/CBVideo'
import InfoVideo from '../utils/InfoVideo'
import { GetVideoId } from '../../scripts/utils'

class Video extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' }
        }
    }
    componentDidUpdate() {
        if(this.props.videoBookList[0]) this.LoadVideoBookDataToFields(this.props.videoBookList[0])
        else this.LoadVideoBookDataToFields({})
        if(this.props.videoGameList[0]) this.LoadVideoGameDataToFields(this.props.videoGameList[0])
        else this.LoadVideoGameDataToFields({}) 
        if(this.props.videoMovieList[0]) this.LoadVideoMovieDataToFields(this.props.videoMovieList[0])
        else this.LoadVideoMovieDataToFields({}) 
        if(this.props.videoSeriesList[0]) this.LoadVideoSeriesDataToFields(this.props.videoSeriesList[0])
        else this.LoadVideoSeriesDataToFields({}) 
        if(this.props.videoSeasonList[0]) this.LoadVideoSeasonDataToFields(this.props.videoSeasonList[0])
        else this.LoadVideoSeasonDataToFields({}) 
        if(this.props.videoEpisodeList[0]) this.LoadVideoEpisodeDataToFields(this.props.videoEpisodeList[0])
        else this.LoadVideoEpisodeDataToFields({}) 
    }

    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })

    DeleteVideoBook = (event) => {
        event.preventDefault()
        if(this.props.videoBookList[0]) {
            let deleteData = [
                { table: 'VideoBook', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'id', data: JSON.parse(this.cbDeleteVideoBook.value).id}
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Delete(deleteData, (res, rej) => {
                if(res) {
                    if(res.error) this.ChangeAlert(true, res.error, 'danger')
                    else {
                        this.props.onSubmit()
                        this.ChangeAlert(true, res.result.message, 'success')
                    }
                } else this.ChangeAlert(true, `${rej}`, 'danger')
            })
        } else this.ChangeAlert(true, `Não pode apagar registos se a lista estiver vazia, adiceone um registo no respectivo formulário.`, 'warning')
    }

    DeleteVideoGame = (event) => {
        event.preventDefault()
        if(this.props.videoGameList[0]) {
            let deleteData = [
                { table: 'VideoGame', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'id', data: JSON.parse(this.cbDeleteVideoGame.value).id}
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Delete(deleteData, (res, rej) => {
                if(res) {
                    if(res.error) this.ChangeAlert(true, res.error, 'danger')
                    else {
                        this.props.onSubmit()
                        this.ChangeAlert(true, res.result.message, 'success')
                    }
                } else this.ChangeAlert(true, `${rej}`, 'danger')
            })
        } else this.ChangeAlert(true, `Não pode apagar registos se a lista estiver vazia, adiceone um registo no respectivo formulário.`, 'warning')
    }

    DeleteVideoMovie = (event) => {
        event.preventDefault()
        if(this.props.videoMovieList[0]) {
            let deleteData = [
                { table: 'VideoMovie', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'id', data: JSON.parse(this.cbDeleteVideoMovie.value).id}
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Delete(deleteData, (res, rej) => {
                if(res) {
                    if(res.error) this.ChangeAlert(true, res.error, 'danger')
                    else {
                        this.props.onSubmit()
                        this.ChangeAlert(true, res.result.message, 'success')
                    }
                } else this.ChangeAlert(true, `${rej}`, 'danger')
            })
        } else this.ChangeAlert(true, `Não pode apagar registos se a lista estiver vazia, adiceone um registo no respectivo formulário.`, 'warning')
    }

    DeleteVideoSeries = (event) => {
        event.preventDefault()
        if(this.props.videoSeriesList[0]) {
            let deleteData = [
                { table: 'VideoSeries', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'id', data: JSON.parse(this.cbDeleteVideoSeries.value).id}
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Delete(deleteData, (res, rej) => {
                if(res) {
                    if(res.error) this.ChangeAlert(true, res.error, 'danger')
                    else {
                        this.props.onSubmit()
                        this.ChangeAlert(true, res.result.message, 'success')
                    }
                } else this.ChangeAlert(true, `${rej}`, 'danger')
            })
        } else this.ChangeAlert(true, `Não pode apagar registos se a lista estiver vazia, adiceone um registo no respectivo formulário.`, 'warning')
    }

    DeleteVideoSeason = (event) => {
        event.preventDefault()
        if(this.props.videoSeasonList[0]) {
            let deleteData = [
                { table: 'VideoSeason', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'id', data: JSON.parse(this.cbDeleteVideoSeason.value).id}
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Delete(deleteData, (res, rej) => {
                if(res) {
                    if(res.error) this.ChangeAlert(true, res.error, 'danger')
                    else {
                        this.props.onSubmit()
                        this.ChangeAlert(true, res.result.message, 'success')
                    }
                } else this.ChangeAlert(true, `${rej}`, 'danger')
            })
        } else this.ChangeAlert(true, `Não pode apagar registos se a lista estiver vazia, adiceone um registo no respectivo formulário.`, 'warning')
    }

    DeleteVideoEpisode = (event) => {
    event.preventDefault()
    if(this.props.videoEpisodeList[0]) {
        let deleteData = [
            { table: 'VideoEpisode', fieldData: [ 
                {field: 'userEmail', data: this.state.user.email},
                {field: 'userPassword', data: this.state.user.password},
                {field: 'id', data: JSON.parse(this.cbDeleteVideoEpisode.value).id}
            ] }
        ]
        this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
        Delete(deleteData, (res, rej) => {
            if(res) {
                if(res.error) this.ChangeAlert(true, res.error, 'danger')
                else {
                    this.props.onSubmit()
                    this.ChangeAlert(true, res.result.message, 'success')
                }
            } else this.ChangeAlert(true, `${rej}`, 'danger')
        })
    } else this.ChangeAlert(true, `Não pode apagar registos se a lista estiver vazia, adiceone um registo no respectivo formulário.`, 'warning')
}

    LoadVideoMovieDataToFields = (videoMovie) =>{
        if(this.iframeVideoMovie) {
            let link = videoMovie.link ? GetVideoId(videoMovie.link) : null
            let id = videoMovie.id
            this.iframeVideoMovie.src = `https://www.youtube.com/embed/${link}`
            this.iframeVideoMovie.title = id
        }
    }
    LoadVideoBookDataToFields = (videoBook) =>{
        if(this.iframeVideoBook) {
            let link = videoBook.link ? GetVideoId(videoBook.link) : null
            let id = videoBook.id
            this.iframeVideoBook.src = `https://www.youtube.com/embed/${link}`
            this.iframeVideoBook.title = id
        }
    }
    LoadVideoGameDataToFields = (videoGame) =>{
        if(this.iframeVideoGame) {
            let link = videoGame.link ? GetVideoId(videoGame.link) : null
            let id = videoGame.id
            this.iframeVideoGame.src = `https://www.youtube.com/embed/${link}`
            this.iframeVideoGame.title = id
        }
    }
    LoadVideoSeriesDataToFields = (videoSeries) =>{
        if(this.iframeVideoSeries) {
            let link = videoSeries.link ? GetVideoId(videoSeries.link) : null
            let id = videoSeries.id
            this.iframeVideoSeries.src = `https://www.youtube.com/embed/${link}`
            this.iframeVideoSeries.title = id
        }
    }
    LoadVideoSeasonDataToFields = (videoSeason) =>{
        if(this.iframeVideoSeason) {
            let link = videoSeason.link ? GetVideoId(videoSeason.link) : null
            let id = videoSeason.id
            this.iframeVideoSeason.src = `https://www.youtube.com/embed/${link}`
            this.iframeVideoSeason.title = id
        }
    }
    LoadVideoEpisodeDataToFields = (videoEpisode) =>{
        if(this.iframeVideoEpisode) {
            let link = videoEpisode.link ? GetVideoId(videoEpisode.link) : null
            let id = videoEpisode.id
            this.iframeVideoEpisode.src = `https://www.youtube.com/embed/${link}`
            this.iframeVideoEpisode.title = id
        }
    }

    SetVideoMovie = () => { this.LoadVideoMovieDataToFields(JSON.parse(this.cbDeleteVideoMovie.value)) }
    SetVideoBook = () => { this.LoadVideoBookDataToFields(JSON.parse(this.cbDeleteVideoBook.value)) }
    SetVideoGame = () => { this.LoadVideoGameDataToFields(JSON.parse(this.cbDeleteVideoGame.value)) }
    SetVideoSeries = () => { this.LoadVideoSeriesDataToFields(JSON.parse(this.cbDeleteVideoSeries.value)) }
    SetVideoSeason = () => { this.LoadVideoSeasonDataToFields(JSON.parse(this.cbDeleteVideoSeason.value)) }
    SetVideoEpisode = () => { this.LoadVideoEpisodeDataToFields(JSON.parse(this.cbDeleteVideoEpisode.value)) }

    render() { 
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0"  id="accordionBook" ref={(accordion) => this.accordionPage = accordion} onClick={this.ResetForm}>
                            Eliminar um vídeo a um Livro
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Form onSubmit={this.DeleteVideoBook} ref={(form) => this.formRefBook = form}>
                                    <ComboBox header={'Videos livros'} list={this.props.videoBookList} onChange={this.SetVideoBook} ref={(input) => this.cbDeleteVideoBook = input} />
                                    <Row>
                                        <Col>
                                            <Button variant="danger" type="submit" block>Apagar</Button>
                                        </Col>
                                    </Row>
                                    <InfoVideo list={this.props.videoBookList} ref={(iframe) => this.iframeVideoBook = iframe} />
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1"  id="accordionGame" ref={(accordion) => this.accordionPage = accordion} onClick={this.ResetForm}>
                            Eliminar um vídeo a um Jogo
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <Form onSubmit={this.DeleteVideoGame} ref={(form) => this.formRefGame = form}>
                                    <ComboBox header={'Videos jogos'} list={this.props.videoGameList} onChange={this.SetVideoGame} ref={(input) => this.cbDeleteVideoGame = input} />
                                    <Row>
                                        <Col>
                                            <Button variant="danger" type="submit" block>Apagar</Button>
                                        </Col>
                                    </Row>
                                    <InfoVideo list={this.props.videoGameList} ref={(iframe) => this.iframeVideoGame = iframe} />
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="2" id="accordionMovie" ref={(accordion) => this.accordionPage = accordion} onClick={this.ResetForm}>
                            Eliminar um vídeo a um Filme
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body>
                                <Form onSubmit={this.DeleteVideoMovie} ref={(form) => this.formRefMovie = form}>
                                    <ComboBox header={'Videos filmes'} list={this.props.videoMovieList} onChange={this.SetVideoMovie} ref={(input) => this.cbDeleteVideoMovie = input} />
                                    <Row>
                                        <Col>
                                            <Button variant="danger" type="submit" block>Apagar</Button>
                                        </Col>
                                    </Row>
                                    <InfoVideo list={this.props.videoMovieList} ref={(iframe) => this.iframeVideoMovie = iframe} />
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="3" id="accordionSeries" ref={(accordion) => this.accordionPage = accordion} onClick={this.ResetForm}>
                            Eliminar um vídeo a uma Série
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="3">
                            <Card.Body>
                                <Form onSubmit={this.DeleteVideoSeries} ref={(form) => this.formRefSeries = form}>
                                    <ComboBox header={'Videos séries'} list={this.props.videoSeriesList} onChange={this.SetVideoSeries} ref={(input) => this.cbDeleteVideoSeries = input} />
                                    <Row>
                                        <Col>
                                            <Button variant="danger" type="submit" block>Apagar</Button>
                                        </Col>
                                    </Row>
                                    <InfoVideo list={this.props.videoSeriesList} ref={(iframe) => this.iframeVideoSeries = iframe} />
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="4" id="accordionSeason" ref={(accordion) => this.accordionPage = accordion} onClick={this.ResetForm}>
                            Eliminar um vídeo a uma Temporada
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="4">
                            <Card.Body>
                                <Form onSubmit={this.DeleteVideoSeason} ref={(form) => this.formRefSeason = form}>
                                    <ComboBox header={'Videos temporada'} list={this.props.videoSeasonList} onChange={this.SetVideoSeason} ref={(input) => this.cbDeleteVideoSeason = input} />
                                    <Row>
                                        <Col>
                                            <Button variant="danger" type="submit" block>Apagar</Button>
                                        </Col>
                                    </Row>
                                    <InfoVideo list={this.props.videoSeasonList} ref={(iframe) => this.iframeVideoSeason = iframe} />
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="5" id="accordionEpisode" ref={(accordion) => this.accordionPage = accordion} onClick={this.ResetForm}>
                            Eliminar um vídeo a um Episódio
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="5">
                            <Card.Body>
                                <Form onSubmit={this.DeleteVideoEpisode} ref={(form) => this.formRefEpisode = form}>
                                    <ComboBox header={'Videos episódios'} list={this.props.videoEpisodeList} onChange={this.SetVideoEpisode} ref={(input) => this.cbDeleteVideoEpisode = input} />
                                    <Row>
                                        <Col>
                                            <Button variant="danger" type="submit" block>Apagar</Button>
                                        </Col>
                                    </Row>
                                    <InfoVideo list={this.props.videoEpisodeList} ref={(iframe) => this.iframeVideoEpisode = iframe} />
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