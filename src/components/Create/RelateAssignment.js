import React, { Component } from 'react';
import { Row, Col, Form, Button, Accordion, Card } from 'react-bootstrap'
import { Create } from '../../scripts/api'
import Alert from '../utils/Alert'
import ComboBox from '../utils/CB'

//TODO: change api to return a more meaningfull message when the data is already in the database
class RelateAssignment extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' }
        }
    }

    componentDidUpdate() {
        this.formRefBook.reset()
        this.formRefGame.reset()
        this.formRefMovie.reset()
        this.formRefSeries.reset()
    }

    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })

    AddAssignmentBook = (event) => {
        event.preventDefault()
        if(this.props.celebrityList[0] && this.props.assignmentList[0] && this.props.bookList[0]) {
            let insertData = [
                { table: 'CelebrityAssignmentBook', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'celebrityId', data: JSON.parse(this.cbBookCelebrity.value).id},
                    {field: 'assignmentId', data: JSON.parse(this.cbBookAssignment.value).id},
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

    AddAssignmentGame = (event) => {
        event.preventDefault()
        if(this.props.celebrityList[0] && this.props.assignmentList[0] && this.props.gameList[0]) {
            let insertData = [
                { table: 'CelebrityAssignmentGame', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'celebrityId', data: JSON.parse(this.cbGameCelebrity.value).id},
                    {field: 'assignmentId', data: JSON.parse(this.cbGameAssignment.value).id},
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

    AddAssignmentMovie = (event) => {
        event.preventDefault()
        if(this.props.celebrityList[0] && this.props.assignmentList[0] && this.props.movieList[0]) {
            let insertData = [
                { table: 'CelebrityAssignmentMovie', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'celebrityId', data: JSON.parse(this.cbMovieCelebrity.value).id},
                    {field: 'assignmentId', data: JSON.parse(this.cbMovieAssignment.value).id},
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

    AddAssignmentSeries = (event) => {
        event.preventDefault()
        if(this.props.celebrityList[0] && this.props.assignmentList[0] && this.props.seriesList[0]) {
            let insertData = [
                { table: 'CelebrityAssignmentSeries', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'celebrityId', data: JSON.parse(this.cbSeriesCelebrity.value).id},
                    {field: 'assignmentId', data: JSON.parse(this.cbSeriesAssignment.value).id},
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

    ClickEvent = () => {
        this.formRefBook.reset()
        this.formRefGame.reset()
        this.formRefMovie.reset()
        this.formRefSeries.reset()
    }

    render() { 
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0"  id="accordionBook" ref={(accordiong) => this.accordiongPage = accordiong} onClick={this.ClickEvent}>
                            Adicionar uma celebridade a um Livro
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Form onSubmit={this.AddAssignmentBook} ref={(form) => this.formRefBook = form}>
                                    <ComboBox list={this.props.assignmentList} header={'Função'} ref={(input) => this.cbBookAssignment = input} />
                                    <ComboBox list={this.props.celebrityList} header={'Celebridade'} ref={(input) => this.cbBookCelebrity = input} />
                                    <ComboBox list={this.props.bookList} header={'Livro'} ref={(input) => this.cbBook = input} />
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
                        <Accordion.Toggle as={Card.Header} eventKey="1"  id="accordionGame" ref={(accordiong) => this.accordiongPage = accordiong} onClick={this.ClickEvent}>
                            Adicionar uma celebridade a um Jogo
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <Form onSubmit={this.AddAssignmentGame} ref={(form) => this.formRefGame = form}>
                                    <ComboBox list={this.props.assignmentList} header={'Função'} ref={(input) => this.cbGameAssignment = input} />
                                    <ComboBox list={this.props.celebrityList} header={'Celebridade'} ref={(input) => this.cbGameCelebrity = input} />
                                    <ComboBox list={this.props.gameList} header={'Jogo'} ref={(input) => this.cbGame = input} />
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
                        <Accordion.Toggle as={Card.Header} eventKey="2" id="accordionMovie" ref={(accordiong) => this.accordiongPage = accordiong} onClick={this.ClickEvent}>
                            Adicionar uma celebridade a um Filme
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body>
                                <Form onSubmit={this.AddAssignmentMovie} ref={(form) => this.formRefMovie = form}>
                                    <ComboBox list={this.props.assignmentList} header={'Função'} ref={(input) => this.cbMovieAssignment = input} />
                                    <ComboBox list={this.props.celebrityList} header={'Celebridade'} ref={(input) => this.cbMovieCelebrity = input} />
                                    <ComboBox list={this.props.movieList} header={'Filme'} ref={(input) => this.cbMovie = input} />
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
                        <Accordion.Toggle as={Card.Header} eventKey="3" id="accordionSeries" ref={(accordiong) => this.accordiongPage = accordiong} onClick={this.ClickEvent}>
                            Adicionar uma celebridade a uma Série
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="3">
                            <Card.Body>
                                <Form onSubmit={this.AddAssignmentSeries} ref={(form) => this.formRefSeries = form}>
                                    <ComboBox list={this.props.assignmentList} header={'Função'} ref={(input) => this.cbSeriesAssignment = input} />
                                    <ComboBox list={this.props.celebrityList} header={'Celebridade'} ref={(input) => this.cbSeriesCelebrity = input} />
                                    <ComboBox list={this.props.seriesList} header={'Séries'} ref={(input) => this.cbSeries = input} />
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

export default RelateAssignment;