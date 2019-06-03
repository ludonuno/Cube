import React, { Component } from 'react';
import { Row, Col, Form, Button, Accordion, Card } from 'react-bootstrap'
import { Create } from '../../scripts/api'
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
            celebrityId: undefined,
            assignmentId: undefined,
            gameId: undefined,
            seriesId: undefined,
            movieId: undefined,
            bookId: undefined
        }
    }

    ChangeAlert(visible, message, variant) {
        this.setState({ alert: { visible: visible, message: message, variant: variant} })
        setTimeout(() => {
            this.setState({ alert: { visible: !visible, message: message, variant: variant} })
        }, 5000)
    }

    AddAssignmentBook = (event) => {
        event.preventDefault()
        if(this.props.celebrityList[0] && this.props.assignmentList[0] && this.props.bookList[0]) {
            let insertData = [
                { table: 'CelebrityAssignmentBook', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'celebrityId', data: this.state.celebrityId ? this.state.celebrityId : this.props.celebrityList[0].id},
                    {field: 'assignmentId', data: this.state.assignmentId ? this.state.assignmentId : this.props.assignmentList[0].id},
                    {field: 'bookId', data: this.state.bookId ? this.state.bookId : this.props.bookList[0].id},
                ] }
            ]
            console.log(insertData)
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

    AddAssignmentGame = (event) => {
        event.preventDefault()
        if(this.props.celebrityList[0] && this.props.assignmentList[0] && this.props.gameList[0]) {
            let insertData = [
                { table: 'CelebrityAssignmentGame', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'celebrityId', data: this.state.celebrityId ? this.state.celebrityId : this.props.celebrityList[0].id},
                    {field: 'assignmentId', data: this.state.assignmentId ? this.state.assignmentId : this.props.assignmentList[0].id},
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

    AddAssignmentMovie = (event) => {
        event.preventDefault()
        if(this.props.celebrityList[0] && this.props.assignmentList[0] && this.props.movieList[0]) {
            let insertData = [
                { table: 'CelebrityAssignmentMovie', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'celebrityId', data: this.state.celebrityId ? this.state.celebrityId : this.props.celebrityList[0].id},
                    {field: 'assignmentId', data: this.state.assignmentId ? this.state.assignmentId : this.props.assignmentList[0].id},
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

    AddAssignmentSeries = (event) => {
        event.preventDefault()
        if(this.props.celebrityList[0] && this.props.assignmentList[0] && this.props.seriesList[0]) {
            let insertData = [
                { table: 'CelebrityAssignmentSeries', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'celebrityId', data: this.state.celebrityId ? this.state.celebrityId : this.props.celebrityList[0].id},
                    {field: 'assignmentId', data: this.state.assignmentId ? this.state.assignmentId : this.props.assignmentList[0].id},
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

    SetAssignment = (event) =>{
        this.setState({ assignmentId: Number(event.target.value) })
    }

    SetCelebrity = (event) =>{
        this.setState({ celebrityId: Number(event.target.value) })
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

        this.setState({celebrityId: this.props.celebrityList[0] ? this.props.celebrityList[0].id : undefined})
        this.setState({assignmentId: this.props.assignmentList[0] ? this.props.assignmentList[0].id : undefined})
        this.setState({gameId: this.props.gameList[0] ? this.props.gameList[0].id : undefined})
        this.setState({seriesId: this.props.seriesList[0] ? this.props.seriesList[0].id : undefined})
        this.setState({movieId: this.props.movieList[0] ? this.props.movieList[0].id : undefined})
        this.setState({bookId: this.props.bookList[0] ? this.props.bookList[0].id : undefined})
    }

    render() { 
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Accordion>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0"  id="accordionBook" ref={(accordiong) => this.accordiongPage = accordiong} onClick={this.ClickEvent}>
                            Adicionar uma celebridade a um Livro
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Form onSubmit={this.AddAssignmentBook} ref={(form) => this.formRefBook = form}>
                                    <ComboBox header={'Função'} list={this.props.assignmentList} onChange={this.SetAssignment} />
                                    <ComboBox header={'Celebridade'} list={this.props.celebrityList} onChange={this.SetCelebrity} />
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
                            Adicionar uma celebridade a um Jogo
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <Form onSubmit={this.AddAssignmentGame} ref={(form) => this.formRefGame = form}>
                                    <ComboBox header={'Função'} list={this.props.assignmentList} onChange={this.SetAssignment} />
                                    <ComboBox header={'Celebridade'} list={this.props.celebrityList} onChange={this.SetCelebrity} />
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
                            Adicionar uma celebridade a um Filme
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body>
                                <Form onSubmit={this.AddAssignmentMovie} ref={(form) => this.formRefMovie = form}>
                                    <ComboBox header={'Função'} list={this.props.assignmentList} onChange={this.SetAssignment} />
                                    <ComboBox header={'Celebridade'} list={this.props.celebrityList} onChange={this.SetCelebrity} />
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
                            Adicionar uma celebridade a uma Série
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="3">
                            <Card.Body>
                                <Form onSubmit={this.AddAssignmentSeries} ref={(form) => this.formRefSeries = form}>
                                    <ComboBox header={'Função'} list={this.props.assignmentList} onChange={this.SetAssignment} />
                                    <ComboBox header={'Celebridade'} list={this.props.celebrityList} onChange={this.SetCelebrity} />
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

export default CreateCelebrityAssignment;