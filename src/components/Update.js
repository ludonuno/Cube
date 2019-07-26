import React, { Component } from 'react'
import { Tabs, Tab, Container } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { Get } from '../scripts/api'

import Navbar from './CustomNavbar'
import Footer from './Footer';

import Book from './Update/Book'
import Celebrity from './Update/Celebrity'
import Game from './Update/Game'
import Movie from './Update/Movie'
import Series from './Update/Series'
import Season from './Update/Season'
import Episode from './Update/Episode'
import Assignment from './Update/Assignment'
import Company from './Update/Company'
import Engine from './Update/Engine'
import ParentAdvisory from './Update/ParentAdvisory'
import PublishingCompany from './Update/PublishingCompany'
import Saga from './Update/Saga'

class Update extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            key: 'book',
            publishingCompanyList: [],
            engineList: [],
            companyList: [],
            parentAdvisoryList: [],
            sagaList: [],
            assignmentList: [],
            celebrityList: [],
            seriesList: [],
            seasonList: [],
            episodeList: [],
            movieList: [],
            bookList: [],
            gameList: [],
            genresList: []
        }
    }
    componentDidMount() {   
        this.GetBookList()
        this.GetPublishingCompanyList()
        this.GetSagaList()
    }

    GetPublishingCompanyList = () => {
        let searchData = [ { table: 'PublishingCompany', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res && res.result) this.setState({ publishingCompanyList: res.result })
            else this.setState({ publishingCompanyList: [] })
        })
    }
    GetEngineList = () => {
        let searchData = [ { table: 'Engine', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res && res.result) this.setState({ engineList: res.result })
            else this.setState({ engineList: [] })
        })
    }
    GetCompanyList = () => {
        let searchData = [ { table: 'Company', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res && res.result) this.setState({ companyList: res.result })
            else this.setState({ companyList: [] })
        })
    }
    GetParentAdvisoryList = () => {
        let searchData = [ { table: 'ParentAdvisory', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res && res.result) this.setState({ parentAdvisoryList: res.result })
            else this.setState({ parentAdvisoryList: [] })
        })
    }
    GetSagaList = () => {
        let searchData = [ { table: 'Saga', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res && res.result) this.setState({ sagaList: res.result })
            else this.setState({ sagaList: [] })
        })
    }
    GetAssignmentList = () => {
        let searchData = [ { table: 'Assignment', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res && res.result) this.setState({ assignmentList: res.result })
            else this.setState({ assignmentList: [] })
        })
    }
    GetCelebrityList = () => {
        let searchData = [ { table: 'Celebrity', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res && res.result) this.setState({ celebrityList: res.result })
            else this.setState({ celebrityList: [] })
        })
    }
    GetEpisodeList = () => {
        let searchData = [ { table: 'Episode', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res && res.result) this.setState({ episodeList: res.result })
            else this.setState({ episodeList: [] })
        })
    }
    GetSeasonList = () => {
        let searchData = [ { table: 'Season', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res && res.result) this.setState({ seasonList: res.result })
            else this.setState({ seasonList: [] })
        })
    }
    GetSeriesList = () => {
        let searchData = [ { table: 'Series', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res && res.result) this.setState({ seriesList: res.result })
            else this.setState({ seriesList: [] })
        })
    }
    GetBookList = () => {
        let searchData = [ { table: 'Book', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res && res.result) this.setState({ bookList: res.result })
            else this.setState({ bookList: [] })
        })
    }
    GetGameList = () => {
        let searchData = [ { table: 'Game', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res && res.result) this.setState({ gameList: res.result })
            else this.setState({ gameList: [] })
        })
    }
    GetMovieList = () => {
        let searchData = [ { table: 'Movie', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res && res.result) this.setState({ movieList: res.result })
            else this.setState({ movieList: [] })
        })
    }
    GetGenresList = () => {
        let searchData = [ { table: 'Genres', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res && res.result) this.setState({ genresList: res.result })
            else this.setState({ genresList: [] })
        })
    }

    ChangeTab = (key) => {
        this.setState({ key })
        switch (key) {
            case 'book':
                this.GetBookList()
                this.GetPublishingCompanyList()
                this.GetSagaList()
                break
            case 'game':
                this.GetEngineList()
                this.GetCompanyList()
                this.GetParentAdvisoryList()
                this.GetGameList()
                this.GetSagaList()
                break
            case 'movie':
                this.GetMovieList()
                this.GetParentAdvisoryList()
                this.GetSagaList()
                break
            case 'series':
                this.GetSeriesList()
                this.GetParentAdvisoryList()
                this.GetSagaList()
                break
            case 'season':
                this.GetSeasonList()
                break
            case 'episode':
                this.GetEpisodeList()
                break
            case 'parentAdvisory':
                this.GetParentAdvisoryList()
                break
            case 'company':
                this.GetCompanyList()
                break
            case 'engine':
                this.GetEngineList()
                break
            case 'publishingCompany':
                this.GetPublishingCompanyList()
                break
            case 'saga':
                this.GetSagaList()
                break
            case 'celebrity':
                this.GetCelebrityList()
                break
            case 'assignment':
                this.GetAssignmentList()
                break
            default:
                break;
        }
    }

    render() { 
        if(!this.state.user || !this.state.user.canedit) {
            return (<Redirect to='/noMatch' />)
        }
        return (
            <React.Fragment>
                <Navbar props={this.props} />
                <br/>
                <Container className="fullpage">
                    <Tabs id="controlled-tab-example" activeKey={this.state.key} onSelect={key => this.ChangeTab(key)}>
                        <Tab eventKey="book" title="Livro"><Book bookList={this.state.bookList} publishingCompanyList={this.state.publishingCompanyList} sagaList={this.state.sagaList} onSubmit={this.GetBookList} /></Tab>
                        <Tab eventKey="game" title="Jogo"><Game gameList={this.state.gameList} engineList={this.state.engineList} companyList={this.state.companyList} parentAdvisoryList={this.state.parentAdvisoryList} sagaList={this.state.sagaList} onSubmit={this.GetGameList} /></Tab>
                        <Tab eventKey="movie" title="Filme"><Movie movieList={this.state.movieList} parentAdvisoryList={this.state.parentAdvisoryList} sagaList={this.state.sagaList} onSubmit={this.GetMovieList} /></Tab>
                        
                        <Tab eventKey="series" title="Séries"><Series seriesList={this.state.seriesList} parentAdvisoryList={this.state.parentAdvisoryList} sagaList={this.state.sagaList} onSubmit={this.GetSeriesList} /></Tab>
                        <Tab eventKey="season" title="Temporada"><Season seasonList={this.state.seasonList} onSubmit={this.GetSeasonList}/></Tab>
                        <Tab eventKey="episode" title="Episódio"><Episode episodeList={this.state.episodeList} onSubmit={this.GetEpisodeList}/></Tab>
                       
                        <Tab eventKey="parentAdvisory" title="Aconselhamento Parental"><ParentAdvisory parentAdvisoryList={this.state.parentAdvisoryList} onSubmit={this.GetParentAdvisoryList} /></Tab>
                        <Tab eventKey="company" title="Empresa"><Company companyList={this.state.companyList} onSubmit={this.GetCompanyList} /></Tab>
                        <Tab eventKey="engine" title="Engine"><Engine engineList={this.state.engineList} onSubmit={this.GetEngineList} /></Tab>
                        <Tab eventKey="publishingCompany" title="Editora"><PublishingCompany publishingCompanyList={this.state.publishingCompanyList} onSubmit={this.GetPublishingCompanyList} /></Tab>
                        <Tab eventKey="saga" title="Saga"><Saga sagaList={this.state.sagaList} onSubmit={this.GetSagaList} /></Tab>
                        <Tab eventKey="celebrity" title="Celebridade"><Celebrity celebrityList={this.state.celebrityList} onSubmit={this.GetCelebrityList} /></Tab>
                        <Tab eventKey="assignment" title="Função"><Assignment assignmentList={this.state.assignmentList} onSubmit={this.GetAssignmentList} /></Tab>
                    </Tabs>
                </Container>
                <br/>
                <Footer />
            </React.Fragment>
        )
    }
}
 
export default Update;