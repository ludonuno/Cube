import React, { Component } from 'react';
import { Row, Col, Form, Button, Accordion, Card } from 'react-bootstrap'
import { Delete } from '../../scripts/api'
import Alert from '../utils/Alert'
import ComboBox from '../utils/CBRelateGenres'

//TODO: change api to return a more meaningfull message when the data is already in the database
class RelateGenres extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' }
        }
    }

    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })

    DeleteGenresBook = (event) => {
        event.preventDefault()
        if(this.props.genresBookList[0]) {
            let deleteData = [
                { table: 'GenresBook', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'bookId', data: JSON.parse(this.cbDeleteBook.value).bookid},
                    {field: 'genresId', data: JSON.parse(this.cbDeleteBook.value).genreid}
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Delete(deleteData, (res, rej) => {
                if(res) {
                    if(res.error) this.ChangeAlert(true, res.error, 'danger')
                    else {
                        this.formRefBook.reset()
                        this.props.onSubmit()
                        this.ChangeAlert(true, res.result.message, 'success')
                    }
                } else this.ChangeAlert(true, `${rej}`, 'danger')
            })
        } else this.ChangeAlert(true, `Não pode apagar registos se a lista estiver vazia, adiceone um registo no respectivo formulário.`, 'warning')
    }

    DeleteGenresGame = (event) => {
        event.preventDefault()
        if(this.props.genresGameList[0]) {
            let deleteData = [
                { table: 'GenresGame', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'gameId', data: JSON.parse(this.cbDeleteGame.value).gameid},
                    {field: 'genresId', data: JSON.parse(this.cbDeleteGame.value).genreid}
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Delete(deleteData, (res, rej) => {
                if(res) {
                    if(res.error) this.ChangeAlert(true, res.error, 'danger')
                    else {
                        this.formRefGame.reset()
                        this.props.onSubmit()
                        this.ChangeAlert(true, res.result.message, 'success')
                    }
                } else this.ChangeAlert(true, `${rej}`, 'danger')
            })
        } else this.ChangeAlert(true, `Não pode apagar registos se a lista estiver vazia, adiceone um registo no respectivo formulário.`, 'warning')
    }

    DeleteGenresMovie = (event) => {
        event.preventDefault()
        if(this.props.genresMovieList[0]) {
            console.log(JSON.parse(this.cbDeleteMovie.value))
            let deleteData = [
                { table: 'GenresMovie', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'movieId', data: JSON.parse(this.cbDeleteMovie.value).movieid},
                    {field: 'genresId', data: JSON.parse(this.cbDeleteMovie.value).genreid}
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Delete(deleteData, (res, rej) => {
                if(res) {
                    if(res.error) this.ChangeAlert(true, res.error, 'danger')
                    else {
                        this.formRefMovie.reset()
                        this.props.onSubmit()
                        this.ChangeAlert(true, res.result.message, 'success')
                    }
                } else this.ChangeAlert(true, `${rej}`, 'danger')
            })
        } else this.ChangeAlert(true, `Não pode apagar registos se a lista estiver vazia, adiceone um registo no respectivo formulário.`, 'warning')
    }

    DeleteGenresSeries = (event) => {
        event.preventDefault()
        if(this.props.genresSeriesList[0]) {
            let deleteData = [
                { table: 'GenresSeries', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'seriesId', data: JSON.parse(this.cbDeleteSeries.value).seriesid},
                    {field: 'genresId', data: JSON.parse(this.cbDeleteSeries.value).genreid}
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Delete(deleteData, (res, rej) => {
                if(res) {
                    if(res.error) this.ChangeAlert(true, res.error, 'danger')
                    else {
                        this.formRefSeries.reset()
                        this.props.onSubmit()
                        this.ChangeAlert(true, res.result.message, 'success')
                    }
                } else this.ChangeAlert(true, `${rej}`, 'danger')
            })
        } else this.ChangeAlert(true, `Não pode apagar registos se a lista estiver vazia, adiceone um registo no respectivo formulário.`, 'warning')
    }

    render() { 
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0"  id="accordionBook" ref={(accordiong) => this.accordiongPage = accordiong} onClick={this.ClickEvent}>
                            Apagar géneros a um Livro
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Form onSubmit={this.DeleteGenresBook} ref={(form) => this.formRefBook = form}>
                                    <ComboBox header={'Género e livro'} list={this.props.genresBookList} ref={(input) => this.cbDeleteBook = input} />
                                    <Row>
                                        <Col>
                                            <Button variant="danger" type="submit" block>Apagar</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1"  id="accordionGame" ref={(accordiong) => this.accordiongPage = accordiong} onClick={this.ClickEvent}>
                            Apagar géneros a um Jogo
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <Form onSubmit={this.DeleteGenresGame} ref={(form) => this.formRefGame = form}>
                                    <ComboBox header={'Género e jogo'} list={this.props.genresGameList} ref={(input) => this.cbDeleteGame = input} />
                                    <Row>
                                        <Col>
                                            <Button variant="danger" type="submit" block>Apagar</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="2" id="accordionMovie" ref={(accordiong) => this.accordiongPage = accordiong} onClick={this.ClickEvent}>
                            Apagar géneros a um Filme
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body>
                                <Form onSubmit={this.DeleteGenresMovie} ref={(form) => this.formRefMovie = form}>
                                    <ComboBox header={'Género e filme'} list={this.props.genresMovieList} ref={(input) => this.cbDeleteMovie = input} />
                                    <Row>
                                        <Col>
                                            <Button variant="danger" type="submit" block>Apagar</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="3" id="accordionSeries" ref={(accordiong) => this.accordiongPage = accordiong} onClick={this.ClickEvent}>
                            Apagar géneros a uma Série
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="3">
                            <Card.Body>
                                <Form onSubmit={this.DeleteGenresSeries} ref={(form) => this.formRefSeries = form}>
                                    <ComboBox header={'Género e séries'} list={this.props.genresSeriesList} ref={(input) => this.cbDeleteSeries = input} />
                                    <Row>
                                        <Col>
                                            <Button variant="danger" type="submit" block>Apagar</Button>
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

export default RelateGenres;