import React, { Component } from 'react'
import { Container, Col, Row, Jumbotron, Tabs, Tab, Card, Accordion } from 'react-bootstrap'

import Navbar from '../CustomNavbar'
import { Get } from '../../scripts/api'
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
        this.GetRating = this.GetRating.bind(this)
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
            responseTo: undefined,
            seasonList: undefined,
            episodeList: undefined
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
                this.GetParentAdvisory(res.result[0].parentadvisoryid) //TODO: Deve ser devolvido atraves do GetSeries
                this.GetComments(res.result[0].id)
                this.GetCelebrities(res.result[0].id)
                this.GetVideos(res.result[0].id)
                this.GetSeasons(res.result[0].id)
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
            if(res.result) {
                this.setState({ videos: res.result })
            } else {
                this.setState({ videos: undefined })
            }
        })
    }
    GetSeasons = (value) => {
        let searchData = [ { table: 'Season', fieldData: [
            {field: 'seriesId', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) {
                this.setState({ seasonList: res.result })
                res.result.forEach((v, i) => {
                    this.GetEpisodes(v)
                })
            } else {
                this.setState({ seasonList: undefined })
            }
        })
    }
    GetEpisodes = (value) => {
        let searchData = [ { table: 'Episode', fieldData: [
            {field: 'seasonId', data: value.id},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) {
                let seasonList = [...this.state.seasonList]
                seasonList.forEach((v, i) => {
                    if(v === value) {
                        value.episodes = res.result
                        v = value
                    }
                })
                this.setState({ seasonList: seasonList })
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

    SeasonEpisode = () => {
        if(this.state.seasonList) {
            let SeasonCards = []
            this.state.seasonList.forEach((v, i) => {
                let episodes = []
                if(v.episodes) {
                    v.episodes.forEach((v, i) => {
                        episodes.push(
                            <Row key={i}>
                                <Col lg={12}>
                                    <a href={`/Episode/${v.id}`}><h4>{v.title ? ReplaceComa(v.title) : 'Sem título'} </h4></a>
                                    <span className="sub-title">{v.releasedate ? v.releasedate.substring(0,10) : 'Sem data de lançamento'} </span>
                                </Col>
                                <Col lg={12}>
                                    <p>{v.synopsis ? ReplaceComa(v.synopsis) : 'Sem sinópse' }</p>
                                </Col>
                            </Row>
                        )
                    })
                }
                SeasonCards.push(
                    <Card key={i}>
                        <Accordion.Toggle as={Card.Header} eventKey={i} id={i}>
                            {v.title}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={i}>
                            <Card.Body>
                                <Row>
                                    <Col lg={12}>
                                        <a href={`/Season/${v.id}`}><h4>{v.title ? ReplaceComa(v.title) : 'Sem título'} </h4></a>
                                        <span className="sub-title">{v.releasedate ? v.releasedate.substring(0,10) : 'Sem data de lançamento'} </span>
                                    </Col>
                                    <Col lg={12}>{v.synopsis ? ReplaceComa(v.synopsis) : 'Sem sinópse' } </Col>
                                </Row>
                                <br/>
                                {episodes[0] ? episodes : 'Esta temporada não tem episódios'}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                )
            })
            return (<Accordion defaultActiveKey="0">
                    {SeasonCards}
                    <br/>
                </Accordion>)
        }
        return <p>Sem temporadas e episódios associados</p>
    }
    // Series
    SeriesInfo = () => {
        let title = this.state.series ? ReplaceComa(this.state.series.title) : 'Título desconhecido'
        let releaseDate = (this.state.series && this.state.series.releasedate) ? this.state.series.releasedate.substring(0,10) : 'Data de lançamento desconhecido'
        let parentAdvisory = this.state.parentAdvisory ? this.state.parentAdvisory.rate : 'Aconselhamento parental desconhecido'
        let parentAdvisoryTitle = this.state.parentAdvisory ? this.state.parentAdvisory.description : 'Descrição do Aconselhamento parental desconhecida'
        let synopsis = (this.state.series && this.state.series.synopsis) ? ReplaceComa(this.state.series.synopsis) : 'Sínopse desconhecida'
        let saga = this.state.saga ? this.state.saga.name : 'Saga desconhecida'
        let genres = this.state.genresSeries ? this.OrderGenres() : 'Sem géneros associados'
        let rating = this.state.rating ? this.state.rating.avg : null
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <Row><h2>{ title }</h2></Row>
                        <Row>
                            <span className="sub-title">Data de lançamento: { releaseDate }</span>
                            <span className="sub-title" title={parentAdvisoryTitle}>| Aconselhamento parental: { parentAdvisory }</span>
                            <span className="sub-title">| Saga: { saga }</span>
                        </Row>
                        <Row><span className="sub-title">Géneros: { genres } </span></Row>
                    </Col>
                    <Col lg={12} xl={4} >
                        <Jumbotron className="rating">
                            Avaliação: { rating ? `${rating}/10` : 'Sem avaliações' }
                            <br/>
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
    GetRating = (value) => {
        let searchData = [ { table: 'SeriesRating', fieldData: [
            {field: 'seriesId', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) this.setState({ rating: res.result[0] })
            else this.setState({ rating: undefined })
        })
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
                        <Tab eventKey="Season" title="Temporadas e episódios">
                            <br/>
                            <this.SeasonEpisode/>
                        </Tab>
                    </Tabs>
                </Container>
                <Footer />
            </React.Fragment>    
        )
    }
}
 
export default Series;