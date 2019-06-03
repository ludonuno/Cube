import React, { Component } from 'react';
import { Row, Col, Form, Button, Accordion, Card } from 'react-bootstrap'
import { Create } from '../../scripts/api'
import Alert from '../utils/Alert'
import ComboBox from '../utils/ComboBox'

//TODO: change api to return a more meaningfull message when the data is already in the database
class CreateRelateGenres extends Component {
    constructor(props) {
        super(props);
        this.ChangeAlert = this.ChangeAlert.bind(this)
        this.state = { 
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' },
            genresId: undefined,
            gameId: undefined,
            seriesId: undefined,
            movieId: undefined,
            bookId: undefined
        }
    }

    ChangeAlert(visible, message, variant) {
        this.setState({ alert: { visible: visible, message: message, variant: variant} })
    }

    AddGenresBook = (event) => {
        event.preventDefault()
        if(this.props.genresList[0] && this.props.bookList[0]) {
            let insertData = [
                { table: 'GenresBook', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'genresId', data: this.state.genresId ? this.state.genresId : this.props.genresList[0].id},
                    {field: 'bookId', data: this.state.bookId ? this.state.bookId : this.props.bookList[0].id},
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Create(insertData, (res) => {
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

    AddGenresGame = (event) => {
        event.preventDefault()
        if(this.props.genresList[0] && this.props.gameList[0]) {
            let insertData = [
                { table: 'GenresGame', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'genresId', data: this.state.genresId ? this.state.genresId : this.props.genresList[0].id},
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

    AddGenresMovie = (event) => {
        event.preventDefault()
        if(this.props.genresList[0] && this.props.movieList[0]) {
            let insertData = [
                { table: 'GenresMovie', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'genresId', data: this.state.genresId ? this.state.genresId : this.props.genresList[0].id},
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

    AddGenresSeries = (event) => {
        event.preventDefault()
        if(this.props.genresList[0] && this.props.seriesList[0]) {
            let insertData = [
                { table: 'GenresSeries', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'genresId', data: this.state.genresId ? this.state.genresId : this.props.genresList[0].id},
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

    SetGenres = (event) =>{
        this.setState({ genresId: Number(event.target.value) })
    }
    SetBook = (event) =>{
        this.setState({ bookId: Number(event.target.value) })
    }
    SetGame = (event) =>{
        this.setState({ gameId: Number(event.target.value) })
    }
    SetMovie = (event) =>{
        this.setState({ movieId: Number(event.target.value) })
    }
    SetSeries = (event) =>{
        this.setState({ seriesId: Number(event.target.value) })
    }

    ClickEvent = () => {
        if(this.accordiongPage.id === 'accordionBook')
            this.ResetForm(false, true, true, true)
        if(this.accordiongPage.id === 'accordionGame')
            this.ResetForm(true, false, true, true)
        if(this.accordiongPage.id === 'accordionMovie')
            this.ResetForm(true, true, false, true)
        if(this.accordiongPage.id === 'accordionSeries')
            this.ResetForm(true, true, true, false)
    }

    ResetForm = (book, game, movie, series) => {
        if (book) this.formRefBook.reset()
        if (game) this.formRefGame.reset()
        if (movie) this.formRefMovie.reset()
        if (series) this.formRefSeries.reset()

        this.setState({genresId: this.props.genresList[0] ? this.props.genresList[0].id : undefined})
        this.setState({bookId: this.props.bookList[0] ? this.props.bookList[0].id : undefined})
        this.setState({gameId: this.props.gameList[0] ? this.props.gameList[0].id : undefined})
        this.setState({movieId: this.props.movieList[0] ? this.props.movieList[0].id : undefined})
        this.setState({seriesId: this.props.seriesList[0] ? this.props.seriesList[0].id : undefined})
    }

    render() { 
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0"  id="accordionBook" ref={(accordiong) => this.accordiongPage = accordiong} onClick={this.ClickEvent}>
                            Adicionar géneros a um Livro
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Form onSubmit={this.AddGenresBook} ref={(form) => this.formRefBook = form}>
                                    <ComboBox header={'Género'} list={this.props.genresList} onChange={this.SetGenres} />
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
                        <Accordion.Toggle as={Card.Header} eventKey="1"  id="accordionGame" ref={(accordiong) => this.accordiongPage = accordiong} onClick={this.ClickEvent}>
                            Adicionar géneros a um Jogo
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <Form onSubmit={this.AddGenresGame} ref={(form) => this.formRefGame = form}>
                                    <ComboBox header={'Género'} list={this.props.genresList} onChange={this.SetGenres} />
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
                        <Accordion.Toggle as={Card.Header} eventKey="2" id="accordionMovie" ref={(accordiong) => this.accordiongPage = accordiong} onClick={this.ClickEvent}>
                            Adicionar géneros a um Filme
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body>
                                <Form onSubmit={this.AddGenresMovie} ref={(form) => this.formRefMovie = form}>
                                    <ComboBox header={'Género'} list={this.props.genresList} onChange={this.SetGenres} />
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
                        <Accordion.Toggle as={Card.Header} eventKey="3" id="accordionSeries" ref={(accordiong) => this.accordiongPage = accordiong} onClick={this.ClickEvent}>
                            Adicionar géneros a uma Série
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="3">
                            <Card.Body>
                                <Form onSubmit={this.AddGenresSeries} ref={(form) => this.formRefSeries = form}>
                                    <ComboBox header={'Género'} list={this.props.genresList} onChange={this.SetGenres} />
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
                </Accordion>
            </React.Fragment>
        )
    }
}

export default CreateRelateGenres;