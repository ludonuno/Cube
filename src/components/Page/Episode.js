import React, { Component } from 'react'
import { Container, Col, Row, Jumbotron, Tabs, Tab, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Navbar from '../CustomNavbar'
import { Get, Create } from '../../scripts/api'
import { ReplaceComa } from '../../scripts/utils'
import Footer from '../Footer';

import SliderVideos from '../utils/SliderVideos'

class Episode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            episode: undefined,
            videos: undefined,
            rating: undefined
        }
    }
    componentDidMount() {
        this.GetEpisode(this.props.match.params.id)
    }

    GetEpisode = (value) => {
        let searchData = [ { table: 'Episode', fieldData: [
            {field: 'id', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res && res.result) {
                this.setState({ episode: res.result[0] })
                this.GetRating(res.result[0].id) //TODO: Deve ser devolvido atraves do GetEpisode
                this.GetVideos(res.result[0].id)
            } else {
                this.setState({ episode: undefined })
                this.props.history.push('/noMatch')
            }
        })
    }
    
    GetVideos = (value) => {
        let searchData = [ { table: 'VideoEpisode', fieldData: [
            {field: 'episodeId', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res && res.result) this.setState({ videos: res.result })
            else this.setState({ videos: undefined })
        })
    }
    // Rating
    AddRating = (event) => {
        event.preventDefault()
        let searchData = [ { table: 'EpisodeRating', fieldData: [
            {field: 'userEmail', data: this.state.user.email},
            {field: 'userPassword', data: this.state.user.password},
            {field: 'userId', data: this.state.user.id},
            {field: 'episodeId', data: this.state.episode.id},
            {field: 'rate', data: this.rate.value},
        ] } ]
        Create(searchData,(res) => {
            if(res && res.result) this.GetRating(this.state.episode.id)
            else this.setState({ rating: undefined })
        })
    }
    GetRating = (value) => {
        let searchData = [ { table: 'EpisodeRating', fieldData: [
            {field: 'episodeId', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res && res.result) this.setState({ rating: res.result[0] })
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

    // Episode
    EpisodeInfo = () => {
        if(this.state.episode) {
            let title = this.state.episode ? ReplaceComa(this.state.episode.title) : 'Título desconhecido'
            let releaseDate = this.state.episode.releaseDate ? this.state.episode.releaseDate.substring(0,10) : 'Data de lançamento desconhecida'
            let synopsis = this.state.episode.synopsis ? ReplaceComa(this.state.episode.synopsis) : 'Sínopse desconhecida'
            let rating = this.state.rating ? this.state.rating.avg : null

            let serieTitle = this.state.episode.seriesTitle ? this.state.episode.seriesTitle : 'Sem titlo de série'
            let serieId = this.state.episode.seriesId ? this.state.episode.seriesId : 'Sem id de série'
            let seasonTitle = this.state.episode.seasonTitle ? this.state.episode.seasonTitle : 'Sem titlo de temporada'
            let seasonId = this.state.episode.seasonId ? this.state.episode.seasonId : 'Sem id de temporada'
            let parentAdvisory = this.state.episode.parentAdvisoryRate ? this.state.episode.parentAdvisoryRate : 'Aconselhamento parental desconhecido'
            let parentAdvisoryDescription = this.state.episode.parentAdvisoryDescription ? this.state.episode.parentAdvisoryDescription : 'Descrição do Aconselhamento parental desconhecida'
            let saga = this.state.episode.sagaName ? this.state.episode.sagaName : 'Saga desconhecida'

            return (
                <React.Fragment>
                    <Row>
                        <Col>
                            <Row><h2>{ title }</h2></Row>
                            <Row>
                                <span className="sub-title">Data de lançamento: { releaseDate }</span>
                                <span className="sub-title">| Série: <Link to={`/Series/${serieId}`}>{ serieTitle }</Link></span>
                                <span className="sub-title">| Temporada: <Link to={`/Season/${seasonId}`}>{ seasonTitle }</Link></span>
                                <span className="sub-title" title={parentAdvisoryDescription}>| Aconselhamento parental: { parentAdvisory }</span>
                                <span className="sub-title">| Saga: { saga }</span>
                            </Row>
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
        } else return null
    }
        
    GetRating = (value) => {
        let searchData = [ { table: 'EpisodeRating', fieldData: [
            {field: 'episodeId', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res && res.result) this.setState({ rating: res.result[0] })
            else this.setState({ rating: undefined })
        })
    }

    render() { 
        return ( 
            <React.Fragment>
                <Navbar props={this.props}/>
                <br/>
                <Container className="fullpage">
                    <this.EpisodeInfo />
                    <br/>
                    <Tabs defaultActiveKey="videos" id="uncontrolled-tab-example">
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
 
export default Episode;