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
        this.state = { 
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' },
            seasonList: [],
            episodeList: [],
            bookId: undefined,
            gameId: undefined,
            movieId: undefined,
            seriesId: undefined
            // seasonId: undefined,
            // episodeId: undefined
        }
    }

    ChangeAlert(visible, message, variant) {
        this.setState({ alert: { visible: visible, message: message, variant: variant} })
        setTimeout(() => {
            this.setState({ alert: { visible: !visible, message: message, variant: variant} })
        }, 5000)
    }

    AddVideoBook = (event) => {
        event.preventDefault()
        if(this.props.celebrityList[0] && this.props.assignmentList[0] && this.props.bookList[0]) {
            let insertData = [
                { table: 'CelebrityAssignmentBook', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'link', data: this.link.value},
                    {field: 'bookId', data: this.state.bookId ? this.state.bookId : this.props.bookList[0].id},
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Create(insertData, (res) => {
                console.log(res)
                if(res.error) {
                    this.ChangeAlert(true, res.error, 'danger')
                } else {
                    this.formRefBook.reset()
                    this.ChangeAlert(true, res.result.message, 'success')
                }
            })
        } else {
            this.ChangeAlert(true, 'Por favor adicione os campos em falta', 'warning')
        }
    }

    AddVideoGame = (event) => {
        event.preventDefault()
        if(this.props.celebrityList[0] && this.props.assignmentList[0] && this.props.gameList[0]) {
            let insertData = [
                { table: 'CelebrityAssignmentGame', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'link', data: this.link.value},
                    {field: 'gameId', data: this.state.gameId ? this.state.gameId : this.props.gameList[0].id},
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Create(insertData, (res) => {
                if(res.error) {
                    this.ChangeAlert(true, res.error, 'danger')
                } else {
                    this.formRefGame.reset()
                    this.ChangeAlert(true, res.result.message, 'success')
                }
            })
        } else {
            this.ChangeAlert(true, 'Por favor adicione os campos em falta', 'warning')
        }
    }

    AddVideoMovie = (event) => {
        event.preventDefault()
        if(this.props.celebrityList[0] && this.props.assignmentList[0] && this.props.movieList[0]) {
            let insertData = [
                { table: 'CelebrityAssignmentMovie', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'link', data: this.link.value},
                    {field: 'movieId', data: this.state.movieId ? this.state.movieId : this.props.movieList[0].id},
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Create(insertData, (res) => {
                if(res.error) {
                    this.ChangeAlert(true, res.error, 'danger')
                } else {
                    this.formRefMovie.reset()
                    this.ChangeAlert(true, res.result.message, 'success')
                }
            })
        } else {
            this.ChangeAlert(true, 'Por favor adicione os campos em falta', 'warning')
        }
    }

    AddVideoSeries = (event) => {
        event.preventDefault()
        if(this.props.celebrityList[0] && this.props.assignmentList[0] && this.props.seriesList[0]) {
            let insertData = [
                { table: 'CelebrityAssignmentSeries', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'link', data: this.link.value},
                    {field: 'seriesId', data: this.state.seriesId ? this.state.seriesId : this.props.seriesList[0].id},
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Create(insertData, (res) => {
                if(res.error) {
                    this.ChangeAlert(true, res.error, 'danger')
                } else {
                    this.formRefSeries.reset()
                    this.ChangeAlert(true, res.result.message, 'success')
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
        this.GetSeason()
    }
    // SetSeason = (event) => {
    //     this.setState({ seasonId: Number(event.target.value) })
    //     this.GetEpisode()
    // }
    // SetEpisode = (event) => {
    //     this.setState({ episodeId: Number(event.target.value) })
    // }

    // GetSeason = (value) => {
    //     let searchData = [ { table: 'Season', fieldData: [ 
    //         {field: 'seriesId', data: value ? value : this.state.seriesId}
    //     ] } ]
    //     Get(searchData,(res) => {
    //         if(res.result) this.setState({ seasonList: res.result })  
    //     })
    // }

    // GetEpisode = () => {
    //     let searchData = [ { table: 'Episode', fieldData: [ 
    //         {field: 'seasonId', data: this.state.seasonId}
    //     ] } ]
    //     Get(searchData,(res) => {
    //         if(res.result) this.setState({ episodeList: res.result })  
    //     })
    // }

    ClickEvent = () => {
        if(this.accordionPage.id === 'accordionBook')
            this.ResetForm(false, true, true, true, true, true)
        if(this.accordionPage.id === 'accordionGame')
            this.ResetForm(true, false, true, true, true, true)
        if(this.accordionPage.id === 'accordionMovie')
            this.ResetForm(true, true, false, true, true, true)
        if(this.accordionPage.id === 'accordionSeries')
            this.ResetForm(true, true, true, false, true, true)
        // if(this.accordionPage.id === 'accordionSeason') {
        //     this.ResetForm(true, true, true, true, false, true)
        //     this.GetSeason(this.props.seriesList[0].id)
        // }
        // if(this.accordionPage.id === 'accordionEpisode')
        //     this.ResetForm(true, true, true, true, true, false)
    }

    ResetForm = (book, game, movie, series, season, episode) => {
        if (book) this.formRefBook.reset()
        if (game) this.formRefGame.reset()
        if (movie) this.formRefMovie.reset()
        if (series) this.formRefSeries.reset()
        // if (season) this.formRefSeason.reset()
       // if (episode) this.formRefEpisode.reset()

        this.setState({bookId: this.props.bookList[0] ? this.props.bookList[0].id : undefined})
        this.setState({gameId: this.props.gameList[0] ? this.props.gameList[0].id : undefined})
        this.setState({movieId: this.props.movieList[0] ? this.props.movieList[0].id : undefined})
        this.setState({seriesId: this.props.seriesList[0] ? this.props.seriesList[0].id : undefined})
        // this.setState({seasonId: this.props.seasonList[0] ? this.props.seasonList[0].id : undefined})
        //this.setState({episodeId: this.props.episodeList[0] ? this.props.episodeList[0].id : undefined})
    }

    // ShowComboBoxSeason = () => {
    //     if(this.state.seriesId)
    //         return<ComboBox header={'Season'} list={this.seasonList} onChange={this.SetSeason} />
    // }

    render() { 
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Accordion>
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
                                            <Form.Control type="text" ref={(input) => {this.link = input}} required/>
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
                                            <Form.Control type="text" ref={(input) => {this.link = input}} required/>
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
                                            <Form.Control type="text" ref={(input) => {this.link = input}} required/>
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
                                            <Form.Control type="text" ref={(input) => {this.link = input}} required/>
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
                    {/* <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="4" id="accordionSeason" ref={(accordion) => this.accordionPage = accordion} onClick={this.ClickEvent}>
                            Adicionar um vídeo a uma Temporada
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="3">
                            <Card.Body>
                                <Form onSubmit={this.AddVideoSeason} ref={(form) => this.formRefSeason = form}>
                                    <Form.Group as={Row}> 
                                        <Form.Label column lg={12} xl={2}>Link do vídeo</Form.Label>
                                        <Col>
                                            <Form.Control type="text" ref={(input) => {this.link = input}} required/>
                                        </Col>
                                    </Form.Group>
                                    <ComboBox header={'Séries'} list={this.props.seriesList} onChange={this.SetSeries} />
                                    <this.ShowComboBoxSeason />
                                    <Row>
                                        <Col>
                                            <Button variant="primary" type="submit" block>Submit</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card> */}
                    {/* <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="5" id="accordionEpisode" ref={(accordion) => this.accordionPage = accordion} onClick={this.ClickEvent}>
                            Adicionar um vídeo a um Episódio
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="3">
                            <Card.Body>
                                <Form onSubmit={this.AddVideoSeries} ref={(form) => this.formRefSeries = form}>
                                    <Form.Group as={Row}> 
                                        <Form.Label column lg={12} xl={2}>Link do vídeo</Form.Label>
                                        <Col>
                                            <Form.Control type="text" ref={(input) => {this.link = input}} required/>
                                        </Col>
                                    </Form.Group>
                                    <this.ShowComboBoxSeason />
                                    <this.ShowComboBoxEpisode />
                                    <ComboBox header={'Séries'} list={this.episodeList} onChange={this.SetEpisode} />
                                    <Row>
                                        <Col>
                                            <Button variant="primary" type="submit" block>Submit</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card> */}
                </Accordion>
            </React.Fragment>
        )
    }
}

export default CreateCelebrityAssignment;