import React, { Component } from 'react'
import { Container, Col, Row, Jumbotron, Tabs, Tab } from 'react-bootstrap'

import Navbar from '../CustomNavbar'
import { Get } from '../../scripts/api'
import { ReplaceComa } from '../../scripts/utils'
import Footer from '../Footer';

import SliderVideos from '../utils/SliderVideos'

class Season extends Component {
    constructor(props) {
        super(props);
        this.GetSeason = this.GetSeason.bind(this)
        this.SeasonInfo = this.SeasonInfo.bind(this)
        this.GetRating = this.GetRating.bind(this)
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            season: undefined,
            videos: undefined,
            rating: undefined,
            episodeList: undefined
        }
    }
    componentDidMount() {
        this.GetSeason(this.props.match.params.id)
    }

    GetSeason = (value) => {
        let searchData = [ { table: 'Season', fieldData: [
            {field: 'id', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) {
                this.setState({ season: res.result[0] })
                this.GetRating(res.result[0].id) //TODO: Deve ser devolvido atraves do GetSeason
                this.GetVideos(res.result[0].id)
                this.GetEpisodes(res.result[0].id)
            } else {
                this.setState({ season: undefined })
                this.props.history.push('/noMatch')
            }
        })
    }
    
    GetVideos = (value) => {
        let searchData = [ { table: 'VideoSeason', fieldData: [
            {field: 'seasonId', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) this.setState({ videos: res.result })
            else this.setState({ videos: undefined })
        })
    }
    
    GetEpisodes = (value) => {
        let searchData = [ { table: 'Episode', fieldData: [
            {field: 'seasonId', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) this.setState({ episodeList: res.result })
            else this.setState({ episodeList: undefined })
        })
    }

    SeasonEpisode = () => {
        if(this.state.episodeList) {
           let episodes = []
            this.state.episodeList.forEach((v, i) => {
                episodes.push(
                    <Row key={i}>
                        <Col lg={12}>
                            <a href={`/Episode/${v.id}`}><h4>{v.title ? ReplaceComa(v.title) : 'Título desconhecido'} </h4></a>
                            <span className="sub-title">{v.releasedate ? v.releasedate.substring(0,10) : 'Data de lançamento desconhecida'} </span>
                        </Col>
                        <Col lg={12}>
                            <p>{v.synopsis ? ReplaceComa(v.synopsis) : 'Sinópse desconhecida' }</p>
                        </Col>
                    </Row>
                )
            })
            return (episodes)
        }
        return <p>Sem temporadas e episódios associados</p>
    }
    // Season
    SeasonInfo = () => {
        let title = this.state.season ? ReplaceComa(this.state.season.title) : 'Título desconhecido'
        let releaseDate = (this.state.season && this.state.season.releasedate) ? this.state.season.releasedate.substring(0,10) : 'Data de lançamento desconhecido'
        let synopsis = (this.state.season && this.state.season.synopsis) ? ReplaceComa(this.state.season.synopsis) : 'Sínopse desconhecida'
        let rating = this.state.rating ? this.state.rating.avg : null
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <Row><h2>{ title }</h2></Row>
                        <Row>
                            <span className="sub-title">Data de lançamento: { releaseDate }</span>
                        </Row>
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
        
    GetRating = (value) => {
        let searchData = [ { table: 'SeasonRating', fieldData: [
            {field: 'seasonId', data: value},
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
                    <this.SeasonInfo />
                    <br/>
                    <Tabs defaultActiveKey="Season" id="uncontrolled-tab-example">
                        <Tab eventKey="Season" title="Episódios">
                            <br/>
                            <this.SeasonEpisode/>
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
 
export default Season;