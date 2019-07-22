import React, { Component } from 'react';
import { Row, Col, Form, Button, Accordion, Card } from 'react-bootstrap'
import { Delete } from '../../scripts/api'
import Alert from '../utils/Alert'
import ComboBox from '../utils/CBRelateGenres'

class RelateAssignment extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' }
        }
    }

    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })

    DeleteAssignmentBook = (event) => {
        event.preventDefault()
        if(this.props.celebrityAssignmentBookList[0]) {
            let deleteData = [
                { table: 'CelebrityAssignmentBook', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'celebrityId', data: JSON.parse(this.cbDeleteCAB.value).idCelebrity},
                    {field: 'assignmentId', data: JSON.parse(this.cbDeleteCAB.value).idAssignment},
                    {field: 'bookId', data: JSON.parse(this.cbDeleteCAB.value).id},
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

    DeleteAssignmentGame = (event) => {
        event.preventDefault()
        if(this.props.celebrityAssignmentGameList[0]) {
            let deleteData = [
                { table: 'CelebrityAssignmentGame', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'celebrityId', data: JSON.parse(this.cbDeleteCAG.value).idCelebrity},
                    {field: 'assignmentId', data: JSON.parse(this.cbDeleteCAG.value).idAssignment},
                    {field: 'gameId', data: JSON.parse(this.cbDeleteCAG.value).id},
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

    DeleteAssignmentMovie = (event) => {
        event.preventDefault()
        if(this.props.celebrityAssignmentMovieList[0]) {
            let deleteData = [
                { table: 'CelebrityAssignmentMovie', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'celebrityId', data: JSON.parse(this.cbDeleteCAM.value).idCelebrity},
                    {field: 'assignmentId', data: JSON.parse(this.cbDeleteCAM.value).idAssignment},
                    {field: 'movieId', data: JSON.parse(this.cbDeleteCAM.value).id},
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

    DeleteAssignmentSeries = (event) => {
        event.preventDefault()
        if(this.props.celebrityAssignmentSeriesList[0]) {
            let deleteData = [
                { table: 'CelebrityAssignmentSeries', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'celebrityId', data: JSON.parse(this.cbDeleteCAS.value).idCelebrity},
                    {field: 'assignmentId', data: JSON.parse(this.cbDeleteCAS.value).idAssignment},
                    {field: 'seriesId', data: JSON.parse(this.cbDeleteCAS.value).id},
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
                            Eliminar uma celebridade a um Livro
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Form onSubmit={this.DeleteAssignmentBook} ref={(form) => this.formRefBook = form}> 
                                    <ComboBox list={this.props.celebrityAssignmentBookList} header={'Celebridade e livros'} ref={(input) => this.cbDeleteCAB = input} />
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
                            Eliminar uma celebridade a um Jogo
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <Form onSubmit={this.DeleteAssignmentGame} ref={(form) => this.formRefGame = form}> 
                                    <ComboBox 
                                        list={this.props.celebrityAssignmentGameList}
                                        header={'Celebridade e jogos'}
                                        ref={(input) => this.cbDeleteCAG = input} />
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
                            Eliminar uma celebridade a um Filme
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body>
                            <Form onSubmit={this.DeleteAssignmentMovie} ref={(form) => this.formRefMovie = form}> 
                                    <ComboBox 
                                        list={this.props.celebrityAssignmentMovieList}
                                        header={'Celebridade e filmes'}
                                        ref={(input) => this.cbDeleteCAM = input} />
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
                            Eliminar uma celebridade a uma Série
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="3">
                            <Card.Body>
                                <Form onSubmit={this.DeleteAssignmentSeries} ref={(form) => this.formRefSeries = form}> 
                                    <ComboBox 
                                        list={this.props.celebrityAssignmentSeriesList}
                                        header={'Celebridade e séries'}
                                        ref={(input) => this.cbDeleteCAS = input} />
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

export default RelateAssignment;