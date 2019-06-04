import React, { Component } from 'react';
import { Row, Col, Form, Button, Accordion, Card } from 'react-bootstrap'
import { Create /*, Get */ } from '../../scripts/api'
import Alert from '../utils/Alert'
import ComboBox from '../utils/ComboBox'

//TODO: change api to return a more meaningfull message when the data is already in the database
class CreateCelebrityAssignment extends Component {
    constructor(props) {
        super(props);
        this.ChangeAlert = this.ChangeAlert.bind(this)
        this.AddVideoBook = this.AddVideoBook.bind(this)
        this.AddVideoGame = this.AddVideoGame.bind(this)
        this.AddVideoMovie = this.AddVideoMovie.bind(this)
        this.AddVideoSeries = this.AddVideoSeries.bind(this)
        this.SetBook = this.SetBook.bind(this)
        this.SetGame = this.SetGame.bind(this)
        this.SetMovie = this.SetMovie.bind(this)
        this.SetSeries = this.SetSeries.bind(this)
        this.ClickEvent = this.ClickEvent.bind(this)
        this.ResetForm = this.ResetForm.bind(this)
        this.state = { 
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' },
            seasonList: [],
            episodeList: [],
            bookId: undefined,
            gameId: undefined,
            movieId: undefined,
            seriesId: undefined,
            seasonId: undefined,
            episodeId: undefined
        }
    }

    ChangeAlert(visible, message, variant) {
        this.setState({ alert: { visible: visible, message: message, variant: variant} })
    }

    AddVideoBook = (event) => {
        event.preventDefault()
        if(this.props.bookList[0]) {
            let insertData = [
                { table: 'VideoBook', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'link', data: this.linkBook.value},
                    {field: 'bookId', data: this.state.bookId ? this.state.bookId : this.props.bookList[0].id},
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Create(insertData, (res, rej) => {
                if(res) {  
                    if(res.error) {
                        this.ChangeAlert(true, res.error, 'danger')
                    } else {
                        this.formRefBook.reset()
                        this.ChangeAlert(true, res.result.message, 'success')
                    }
                } else {
                    this.ChangeAlert(true, `${rej}`, 'danger')
                }
            })
        } else {
            this.ChangeAlert(true, 'Por favor adicione os campos em falta', 'warning')
        }
    }

    AddVideoGame = (event) => {
        event.preventDefault()
        if(this.props.gameList[0]) {
            let insertData = [
                { table: 'VideoGame', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'link', data: this.linkGame.value},
                    {field: 'gameId', data: this.state.gameId ? this.state.gameId : this.props.gameList[0].id},
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Create(insertData, (res, rej) => {
                if(res) {  
                    if(res.error) {
                        this.ChangeAlert(true, res.error, 'danger')
                    } else {
                        this.formRefGame.reset()
                        this.ChangeAlert(true, res.result.message, 'success')
                    }
                } else {
                    this.ChangeAlert(true, `${rej}`, 'danger')
                }
            })
        } else {
            this.ChangeAlert(true, 'Por favor adicione os campos em falta', 'warning')
        }
    }

    AddVideoMovie = (event) => {
        event.preventDefault()
        if(this.props.movieList[0]) {
            let insertData = [
                { table: 'VideoMovie', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'link', data: this.linkMovie.value},
                    {field: 'movieId', data: this.state.movieId ? this.state.movieId : this.props.movieList[0].id},
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Create(insertData, (res, rej) => {
                if(res) {  
                    if(res.error) {
                        this.ChangeAlert(true, res.error, 'danger')
                    } else {
                        this.formRefMovie.reset()
                        this.ChangeAlert(true, res.result.message, 'success')
                    }
                } else {
                    this.ChangeAlert(true, `${rej}`, 'danger')
                }
            })
        } else {
            this.ChangeAlert(true, 'Por favor adicione os campos em falta', 'warning')
        }
    }

    AddVideoSeries = (event) => {
        event.preventDefault()
        if(this.props.seriesList[0]) {
            let insertData = [
                { table: 'VideoSeries', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'link', data: this.linkSeries.value},
                    {field: 'seriesId', data: this.state.seriesId ? this.state.seriesId : this.props.seriesList[0].id},
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Create(insertData, (res, rej) => {
                if(res) {  
                    if(res.error) {
                        this.ChangeAlert(true, res.error, 'danger')
                    } else {
                        this.formRefSeries.reset()
                        this.ChangeAlert(true, res.result.message, 'success')
                    }
                } else {
                    this.ChangeAlert(true, `${rej}`, 'danger')
                }
            })
        } else {
            this.ChangeAlert(true, 'Por favor adicione os campos em falta', 'warning')
        }
    }
    AddVideoSeason = (event) => {
        event.preventDefault()
        if(this.props.seriesList[0] && this.props.seasonList[0]) {
            let insertData = [
                { table: 'VideoSeasons', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'link', data: this.linkSeries.value},
                    {field: 'seriesId', data: this.state.seriesId ? this.state.seriesId : this.props.seriesList[0].id},
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Create(insertData, (res, rej) => {
                if(res) {  
                    if(res.error) {
                        this.ChangeAlert(true, res.error, 'danger')
                    } else {
                        this.formRefSeries.reset()
                        this.ChangeAlert(true, res.result.message, 'success')
                    }
                } else {
                    this.ChangeAlert(true, `${rej}`, 'danger')
                }
            })
        } else {
            this.ChangeAlert(true, 'Por favor adicione os campos em falta', 'warning')
        }
    }

    SetBook = (event) => {
        this.setState({ bookId: Number(event.target.value) })
    }
    SetGame = (event) => {
        this.setState({ gameId: Number(event.target.value) })
    }
    SetMovie = (event) => {
        this.setState({ movieId: Number(event.target.value) })
    }
    SetSeries = (event) => {
        this.setState({ seriesId: Number(event.target.value) })
        this.props.GetSeasonList(Number(event.target.value))
    }
    SetSeason = (event) => {
        this.setState({ seasonId: Number(event.target.value) })
        this.props.GetEpisodeList(Number(event.target.value))
    }
    SetEpisode = (event) => {
        this.setState({ episodeId: Number(event.target.value) })
    }

    ClickEvent = () => {
        if(this.accordionPage.id === 'accordionBook')
            this.ResetForm(false, true, true, true, true, true)
        if(this.accordionPage.id === 'accordionGame')
            this.ResetForm(true, false, true, true, true, true)
        if(this.accordionPage.id === 'accordionMovie')
            this.ResetForm(true, true, false, true, true, true)
        if(this.accordionPage.id === 'accordionSeries')
            this.ResetForm(true, true, true, false, true, true)
        if(this.accordionPage.id === 'accordionSeason') {
            this.ResetForm(true, true, true, true, false, true)
            this.props.GetSeasonList(this.props.seriesList[0].id)
        }
        if(this.accordionPage.id === 'accordionEpisode') {
            this.ResetForm(true, true, true, true, true, false)
            this.props.GetSeasonList(this.props.seriesList[0].id)
        }
    }

    ResetForm = (book, game, movie, series, season, episode) => {
        if (book) this.formRefBook.reset()
        if (game) this.formRefGame.reset()
        if (movie) this.formRefMovie.reset()
        if (series) this.formRefSeries.reset()
        if (season) this.formRefSeason.reset()
        if (episode) this.formRefEpisode.reset()

        this.setState({bookId: this.props.bookList[0] ? this.props.bookList[0].id : undefined})
        this.setState({gameId: this.props.gameList[0] ? this.props.gameList[0].id : undefined})
        this.setState({movieId: this.props.movieList[0] ? this.props.movieList[0].id : undefined})
        this.setState({seriesId: this.props.seriesList[0] ? this.props.seriesList[0].id : undefined})
        this.setState({seasonId: this.props.seasonList[0] ? this.props.seasonList[0].id : undefined})
        this.setState({episodeId: this.props.episodeList[0] ? this.props.episodeList[0].id : undefined})
    }

    HasSeasons = () => {
        if(this.props.seasonList[0])
            return (<ComboBox header={'Temporada'} list={this.props.seasonList} onChange={this.SetSeason} />)
        else
            return (
                <Form.Group as={Row}> 
                    <Form.Label column lg={12} xl={2}>Temporada</Form.Label>
                    <Col>
                        <Alert variant={'danger'} message={'A série selecionada não tem temporadas'} visible={true} />
                    </Col>
                </Form.Group>
            )
    }

    HasEpisodes = () => {
        if(this.props.episodeList[0])
            return (<ComboBox header={'Episódio'} list={this.props.episodeList} onChange={this.SetEpisode} />)
        else
            return (
                <Form.Group as={Row}> 
                    <Form.Label column lg={12} xl={2}>Temporada</Form.Label>
                    <Col>
                        <Alert variant={'danger'} message={'A temporada selecionada não tem episódios'} visible={true} />
                    </Col>
                </Form.Group>
            )
    }

    render() { 
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0"  id="accordionBook" ref={(accordion) => this.accordionPage = accordion} onClick={this.ClickEvent}>
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
                                    <ComboBox header={'Livro'} list={this.props.bookList} onChange={this.SetBook} />
                                    <Row>
                                        <Col>
                                            <Button variant="primary" type="submit" block>Submit</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1"  id="accordionGame" ref={(accordion) => this.accordionPage = accordion} onClick={this.ClickEvent}>
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
                                    <ComboBox header={'Jogo'} list={this.props.gameList} onChange={this.SetGame} />
                                    <Row>
                                        <Col>
                                            <Button variant="primary" type="submit" block>Submit</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="2" id="accordionMovie" ref={(accordion) => this.accordionPage = accordion} onClick={this.ClickEvent}>
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
                                    <ComboBox header={'Filme'} list={this.props.movieList} onChange={this.SetMovie} />
                                    <Row>
                                        <Col>
                                            <Button variant="primary" type="submit" block>Submit</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="3" id="accordionSeries" ref={(accordion) => this.accordionPage = accordion} onClick={this.ClickEvent}>
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
                                    <ComboBox header={'Séries'} list={this.props.seriesList} onChange={this.SetSeries} />
                                    <Row>
                                        <Col>
                                            <Button variant="primary" type="submit" block>Submit</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="4" id="accordionSeason" ref={(accordion) => this.accordionPage = accordion} onClick={this.ClickEvent}>
                            Adicionar um vídeo a uma Temporada
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="4">
                            <Card.Body>
                                <Form onSubmit={this.AddVideoSeason} ref={(form) => this.formRefSeason = form}>
                                    <Form.Group as={Row}> 
                                        <Form.Label column lg={12} xl={2}>Link do vídeo</Form.Label>
                                        <Col>
                                            <Form.Control type="text" ref={(input) => {this.link = input}} required/>
                                        </Col>
                                    </Form.Group>
                                    <ComboBox header={'Séries'} list={this.props.seriesList} onChange={this.SetSeries} />
                                    <this.HasSeasons />
                                    <Row>
                                        <Col>
                                            <Button variant="primary" type="submit" block>Submit</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="5" id="accordionEpisode" ref={(accordion) => this.accordionPage = accordion} onClick={this.ClickEvent}>
                            Adicionar um vídeo a um Episódio
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="5">
                            <Card.Body>
                                <Form onSubmit={this.AddVideoEpisode} ref={(form) => this.formRefEpisode = form}>
                                    <Form.Group as={Row}> 
                                        <Form.Label column lg={12} xl={2}>Link do vídeo</Form.Label>
                                        <Col>
                                            <Form.Control type="text" ref={(input) => {this.link = input}} required/>
                                        </Col>
                                    </Form.Group>
                                    <ComboBox header={'Séries'} list={this.props.seriesList} onChange={this.SetSeries} />
                                    <this.HasSeasons />
                                    <this.HasEpisodes />
                                    <Row>
                                        <Col>
                                            <Button variant="primary" type="submit" block>Submit</Button>
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

export default CreateCelebrityAssignment;