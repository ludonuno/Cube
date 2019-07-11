import React, { Component } from 'react'
import { Container, Col, Row, Jumbotron, Form, Tabs, Tab, } from 'react-bootstrap'

import Navbar from '../CustomNavbar'
import { Get, Create } from '../../scripts/api'
import { ReplaceComa } from '../../scripts/utils'
import Footer from '../Footer';

import Comments from '../utils/Comments'
import SagaRelated from '../utils/SagaRelated'
import SliderVideos from '../utils/SliderVideos'
import SliderCelebrities from '../utils/SliderCelebrities'

//TODO: Apresentar os campos da Series

class Series extends Component {
    constructor(props) {
        super(props);
        this.GetSeries = this.GetSeries.bind(this)
        this.GetSaga = this.GetSaga.bind(this)
        this.GetSagaRelated = this.GetSagaRelated.bind(this)
        this.GetGenresSeries = this.GetGenresSeries.bind(this)
        this.GetComments = this.GetComments.bind(this)
        this.GetResponseTo = this.GetResponseTo.bind(this)
        this.GetCelebrities = this.GetCelebrities.bind(this)
        this.SeriesInfo = this.SeriesInfo.bind(this)
        this.OrderGenres = this.OrderGenres.bind(this)
        this.AddRating = this.AddRating.bind(this)
        this.GetRating = this.GetRating.bind(this)
        this.FormRating = this.FormRating.bind(this)
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            series: undefined,
            publishingCompany: undefined,
            saga: undefined,
            sagaMovie: undefined,
            sagaGame: undefined,
            sagaSeries: undefined,
            sagaBook: undefined,
            genresSeries: undefined,
            celebritiesAssignment: undefined,
            videos: undefined,
            rating: undefined,
            comments: undefined,
            responseTo: undefined
        }
    }
    componentDidMount() {
        this.GetSeries(this.props.match.params.id)
    }

    GetSeries = (value) => {
        let searchData = [ { table: 'Series', fieldData: [
            {field: 'id', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) {
                this.setState({ series: res.result[0] })
                this.GetSaga(res.result[0].sagaid) //TODO: Deve ser devolvido atraves do GetSeries
                this.GetGenresSeries(res.result[0].id)
                this.GetRating(res.result[0].id) //TODO: Deve ser devolvido atraves do GetSeries
                this.GetComments(res.result[0].id)
                this.GetCelebrities(res.result[0].id)
                this.GetVideos(res.result[0].id)
            } else {
                this.setState({ series: undefined })
                this.props.history.push('/noMatch')
            }
        })
    }
    GetSaga = (value) => {
        let searchData = [ { table: 'Saga', fieldData: [
            {field: 'id', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) {
                this.setState({ saga: res.result[0] })
                this.GetSagaRelated(value) //TODO: Passar para o GetSeries com o id da saga devolvido
            } else {
                this.setState({ saga: undefined })
            }
        })
    }
    GetSagaRelated = (value) => {
        let searchDataMovie = [ { table: 'Movie', fieldData: [
            {field: 'sagaId', data: value},
        ] } ]
        let searchDataGame = [ { table: 'Game', fieldData: [
            {field: 'sagaId', data: value},
        ] } ]
        let searchDataSeries = [ { table: 'Series', fieldData: [
            {field: 'sagaId', data: value},
        ] } ]
        let searchDataBook = [ { table: 'Book', fieldData: [
            {field: 'sagaId', data: value},
        ] } ]
        Get(searchDataMovie,(res) => {
            if(res.result) this.setState({ sagaMovie: res.result })
            else this.setState({ sagaMovie: undefined })
        })
        Get(searchDataGame,(res) => {
            if(res.result) this.setState({ sagaGame: res.result })
            else this.setState({ sagaGame: undefined })
        })
        Get(searchDataSeries,(res) => {
            if(res.result) this.setState({ sagaSeries: res.result })
            else this.setState({ sagaSeries: undefined })
        })
        Get(searchDataBook,(res) => {
            if(res.result) this.setState({ sagaBook: res.result })
            else this.setState({ sagaBook: undefined })
        })
    }
    GetGenresSeries = (value) => {
        let searchData = [ { table: 'GenresSeries', fieldData: [
            {field: 'seriesId', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) this.setState({ genresSeries: res.result })
            else this.setState({ genresSeries: undefined })
        })
    }
    GetComments = (value) => {
        let searchData = [ { table: 'SeriesComments', fieldData: [
            {field: 'seriesId', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) {
                res.result.forEach((v, i) => {
                    v.responseTo = this.GetResponseTo(v.id)
                })
                this.setState({ comments: res.result })
            } else {
                this.setState({ comments: undefined })
            }
        })
    }
    GetResponseTo = (value) => {
        let searchData = [ { table: 'SeriesComments', fieldData: [
            {field: 'responseTo', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) {
                let comments = [...this.state.comments]
                comments.forEach((v, i) => {
                    if(v.id === value) v.responseto = res.result
                })
                this.setState({ comments: comments })
            }
        })
    }
    GetCelebrities = (value) => {
        let searchData = [ { table: 'CelebrityAssignmentSeries', fieldData: [
            {field: 'seriesId', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) {
                this.setState({ celebritiesAssignment: res.result })
            } else {
                this.setState({ celebritiesAssignment: undefined })
            }
        })
    }
    GetVideos = (value) => {
        let searchData = [ { table: 'VideoSeries', fieldData: [
            {field: 'seriesId', data: value},
        ] } ]
        Get(searchData,(res) => {
            console.log(res)
            if(res.result) {
                this.setState({ videos: res.result })
            } else {
                this.setState({ videos: undefined })
            }
        })
    }

    // Series
    SeriesInfo = () => {
        let title = this.state.series ? ReplaceComa(this.state.series.title) : null
        let releaseDate = this.state.series ? this.state.series.releasedate.substring(0,10) : null
        let publishingCompany = this.state.publishingCompany ? this.state.publishingCompany.name : null
        let synopsis = this.state.series ? ReplaceComa(this.state.series.synopsis) : null
        let saga = this.state.saga ? this.state.saga.name : null
        let genres = this.state.genresSeries ? this.OrderGenres() : 'Sem géneros associados'
        let rating = this.state.rating ? this.state.rating.avg : null
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <Row><h2>{ title }</h2></Row>
                        <Row><span className="sub-title">Data de lançamento: { releaseDate } | Editora: { publishingCompany } | Saga: { saga }</span></Row>
                        <Row><span className="sub-title">Géneros: { genres } </span></Row>
                    </Col>
                    <Col lg={12} xl={4} >
                        <Jumbotron className="rating">
                            Avaliação: { rating ? `${rating}/10` : 'Sem avaliações' }
                            <br/>
                            <this.FormRating />
                        </Jumbotron>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Row><h4>Sínopse</h4></Row>
                        <Row>
                            <span>{ synopsis }</span>
                        </Row>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
    OrderGenres = () => {
        let genresSeries = []
        this.state.genresSeries.forEach((v, i) => {
            genresSeries.push(v.genre)
            genresSeries.push(' | ')
            if (i === this.state.genresSeries.length - 1) genresSeries.pop()
        })
        return genresSeries
    }
    
    // Rating
    AddRating = (event) => {
        event.preventDefault()
        let searchData = [ { table: 'SeriesRating', fieldData: [
            {field: 'userEmail', data: this.state.user.email},
            {field: 'userPassword', data: this.state.user.password},
            {field: 'userId', data: this.state.user.id},
            {field: 'seriesId', data: this.state.series.id},
            {field: 'rate', data: this.rate.value},
        ] } ]
        Create(searchData,(res) => {
            if(res.result) {
                this.GetRating(this.state.series.id)
            } 
            else this.setState({ rating: undefined })
        })
    }
    GetRating = (value) => {
        let searchData = [ { table: 'SeriesRating', fieldData: [
            {field: 'seriesId', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) this.setState({ rating: res.result[0] })
            else this.setState({ rating: undefined })
        })
    }
    FormRating = () => {
        if (!this.state.user) return null
        return (
            <React.Fragment>
                <br/>
                <Form onSubmit={this.AddRating}>
                    <Form.Group as={Row}>
                        <Form.Label column lg={6}>Avaliação</Form.Label>
                        <Col>
                            <Form.Control type="number" defaultValue="0" min="0" max="10" ref={(input) => {this.rate = input}}/>
                        </Col>
                    </Form.Group>
                </Form>
            </React.Fragment>
        )
    }

    render() { 
        return ( 
            <React.Fragment>
                <Navbar props={this.props}/>
                <br/>
                <Container className="fullpage">
                    <this.SeriesInfo />
                    <br/>
                    <Tabs defaultActiveKey="comments" id="uncontrolled-tab-example">
                        <Tab eventKey="comments" title="Comentários">
                            <br/>
                            <Comments table={'SeriesComments'} field={'seriesId'} id={this.state.series ? this.state.series.id : null} comments={this.state.comments} GetComments={this.GetComments}/>
                        </Tab>
                        <Tab eventKey="saga" title="Saga">
                            <br/>
                            <SagaRelated sagaMovie={this.state.sagaMovie} sagaGame={this.state.sagaGame} sagaSeries={this.state.sagaSeries} sagaBook={this.state.sagaBook}/>
                        </Tab>
                        <Tab eventKey="celebrities" title="Celebridades">
                            <br/>
                            <SliderCelebrities list={this.state.celebritiesAssignment} href='Celebrity' header='Celebridades'/>
                        </Tab>
                        <Tab eventKey="videos" title="Vídeos">
                            <br/>
                            <SliderVideos list={this.state.videos}/>
                        </Tab>
                    </Tabs>
                </Container>
                <Footer />
            </React.Fragment>    
        )
    }
}
 
export default Series;