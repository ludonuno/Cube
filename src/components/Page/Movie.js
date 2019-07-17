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

class Movie extends Component {
    constructor(props) {
        super(props);
        this.GetMovie = this.GetMovie.bind(this)
        this.GetSaga = this.GetSaga.bind(this)
        this.GetSagaRelated = this.GetSagaRelated.bind(this)
        this.GetGenresMovie = this.GetGenresMovie.bind(this)
        this.GetComments = this.GetComments.bind(this)
        this.GetResponseTo = this.GetResponseTo.bind(this)
        this.GetCelebrities = this.GetCelebrities.bind(this)
        this.MovieInfo = this.MovieInfo.bind(this)
        this.OrderGenres = this.OrderGenres.bind(this)
        this.AddRating = this.AddRating.bind(this)
        this.GetRating = this.GetRating.bind(this)
        this.FormRating = this.FormRating.bind(this)
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            movie: undefined,
            publishingCompany: undefined,
            parentAdvisory: undefined,
            saga: undefined,
            sagaMovie: undefined,
            sagaGame: undefined,
            sagaSeries: undefined,
            sagaBook: undefined,
            genresMovie: undefined,
            celebritiesAssignment: undefined,
            videos: undefined,
            rating: undefined,
            comments: undefined,
            responseTo: undefined
        }
    }
    componentDidMount() {
        this.GetMovie(this.props.match.params.id)
    }

    GetMovie = (value) => {
        let searchData = [ { table: 'Movie', fieldData: [
            {field: 'id', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) {
                console.log(res.result[0])
                this.setState({ movie: res.result[0] })
                this.GetSaga(res.result[0].sagaid) //TODO: Deve ser devolvido atraves do GetMovie
                this.GetGenresMovie(res.result[0].id)
                this.GetRating(res.result[0].id) //TODO: Deve ser devolvido atraves do GetMovie
                this.GetParentAdvisory(res.result[0].parentadvisoryid) //TODO: Deve ser devolvido atraves do GetMovie
                this.GetComments(res.result[0].id)
                this.GetCelebrities(res.result[0].id)
                this.GetVideos(res.result[0].id)
            } else {
                this.setState({ movie: undefined })
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
    GetGenresMovie = (value) => {
        let searchData = [ { table: 'GenresMovie', fieldData: [
            {field: 'movieId', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) this.setState({ genresMovie: res.result })
            else this.setState({ genresMovie: undefined })
        })
    }
    GetComments = (value) => {
        let searchData = [ { table: 'MovieComments', fieldData: [
            {field: 'movieId', data: value},
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
        let searchData = [ { table: 'MovieComments', fieldData: [
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
        let searchData = [ { table: 'CelebrityAssignmentMovie', fieldData: [
            {field: 'movieId', data: value},
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
        let searchData = [ { table: 'VideoMovie', fieldData: [
            {field: 'movieId', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) {
                this.setState({ videos: res.result })
            } else {
                this.setState({ videos: undefined })
            }
        })
    }
    GetParentAdvisory = (value) => {
        let searchData = [ { table: 'ParentAdvisory', fieldData: [
            {field: 'id', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) {
                this.setState({ parentAdvisory: res.result[0] })
            } else {
                this.setState({ parentAdvisory: undefined })
            }
        })
    }

    // Movie
    MovieInfo = () => {
        let title = this.state.movie ? ReplaceComa(this.state.movie.title) : null
        let releaseDate = (this.state.movie && this.state.movie.releasedate) ? this.state.movie.releasedate.substring(0,10) : 'Data de lançamento indisponível'
        let duration = this.state.movie ? this.state.movie.duration : null
        let parentAdvisory = this.state.parentAdvisory ? this.state.parentAdvisory.rate : null
        let parentAdvisoryTitle = this.state.parentAdvisory ? this.state.parentAdvisory.description : null
        let synopsis = this.state.movie ? ReplaceComa(this.state.movie.synopsis) : 'Sem sínopse'
        let saga = this.state.saga ? ReplaceComa(this.state.saga.name) : null
        let genres = this.state.genresMovie ? this.OrderGenres() : 'Sem géneros associados'
        let rating = this.state.rating ? this.state.rating.avg : null
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <Row><h2>{ title }</h2></Row>
                        <Row>
                            <span className="sub-title">Data de lançamento: { releaseDate }</span>
                            <span className="sub-title">| Duração: {duration} minutos</span>
                            <span className="sub-title" title={parentAdvisoryTitle}>| Aconselhamento parental: { parentAdvisory }</span>
                            <span className="sub-title">| Saga: { saga }</span>
                        </Row>
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
        let genresMovie = []
        this.state.genresMovie.forEach((v, i) => {
            genresMovie.push(v.genre)
            genresMovie.push(' | ')
            if (i === this.state.genresMovie.length - 1) genresMovie.pop()
        })
        return genresMovie
    }
    
    // Rating
    AddRating = (event) => {
        event.preventDefault()
        let searchData = [ { table: 'MovieRating', fieldData: [
            {field: 'userEmail', data: this.state.user.email},
            {field: 'userPassword', data: this.state.user.password},
            {field: 'userId', data: this.state.user.id},
            {field: 'movieId', data: this.state.movie.id},
            {field: 'rate', data: this.rate.value},
        ] } ]
        Create(searchData,(res) => {
            if(res.result) {
                this.GetRating(this.state.movie.id)
            } 
            else this.setState({ rating: undefined })
        })
    }
    GetRating = (value) => {
        let searchData = [ { table: 'MovieRating', fieldData: [
            {field: 'movieId', data: value},
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
                    <this.MovieInfo />
                    <br/>
                    <Tabs defaultActiveKey="comments" id="uncontrolled-tab-example">
                        <Tab eventKey="comments" title="Comentários">
                            <br/>
                            <Comments table={'MovieComments'} field={'movieId'} id={this.state.movie ? this.state.movie.id : null} comments={this.state.comments} GetComments={this.GetComments}/>
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
 
export default Movie;