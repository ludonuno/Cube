import React, { Component } from 'react'
import { Tabs, Tab, Container } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { Get } from '../scripts/api'

import Navbar from './CustomNavbar'

import Book from './Create/Book'
import Celebrity from './Create/Celebrity'
import RelateAssignment from './Create/RelateAssignment'
import Game from './Create/Game'
import Movie from './Create/Movie'
import Series from './Create/Series'
import Season from './Create/Season'
import Episode from './Create/Episode'
import Assignment from './Create/Assignment'
import Company from './Create/Company'
import Engine from './Create/Engine'
import ParentAdvisory from './Create/ParentAdvisory'
import PublishingCompany from './Create/PublishingCompany'
import Saga from './Create/Saga'
import Video from './Create/Video'
import Genres from './Create/Genres'
import RelateGenres from './Create/RelateGenres'
import Developers from './Create/Developers'

class Create extends Component {
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
            else  this.setState({ sagaList: [] })
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
                this.GetPublishingCompanyList()
                this.GetSagaList()
                break
            case 'game':
                this.GetEngineList()
                this.GetCompanyList()
                this.GetParentAdvisoryList()
                this.GetSagaList()
                break
            case 'movie':
                this.GetParentAdvisoryList()
                this.GetSagaList()
                break
            case 'series':
                this.GetParentAdvisoryList()
                this.GetSagaList()
                break
            case 'season':
                this.GetSeriesList()
                break
            case 'episode':
                this.GetSeasonList()
                break
            case 'createRelateAssignment':
                this.GetAssignmentList()
                this.GetCelebrityList()
                this.GetBookList()
                this.GetGameList()
                this.GetMovieList()
                this.GetSeriesList()
                break
            case 'createVideo':
                this.GetBookList()
                this.GetGameList()
                this.GetMovieList()
                this.GetSeriesList()
                this.GetSeasonList()
                this.GetEpisodeList()
                break
            case 'createRelateGenres':
                this.GetGenresList()
                this.GetBookList()
                this.GetGameList()
                this.GetMovieList()
                this.GetSeriesList()
                break
            case 'developers':
                this.GetGameList()
                this.GetCompanyList()
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
                <Container>
                    <Tabs id="controlled-tab-example" activeKey={this.state.key} onSelect={key => this.ChangeTab(key)}>
                        <Tab eventKey="book" title="Livro"><Book publishingCompanyList={this.state.publishingCompanyList} sagaList={this.state.sagaList} onSubmit={this.GetBookList} /></Tab>
                        <Tab eventKey="game" title="Jogo"><Game engineList={this.state.engineList} companyList={this.state.companyList} parentAdvisoryList={this.state.parentAdvisoryList} sagaList={this.state.sagaList} onSubmit={this.GetGameList} /></Tab>
                        <Tab eventKey="movie" title="Filme"><Movie parentAdvisoryList={this.state.parentAdvisoryList} sagaList={this.state.sagaList} onSubmit={this.GetMovieList} /></Tab>
                        <Tab eventKey="series" title="Séries"><Series parentAdvisoryList={this.state.parentAdvisoryList} sagaList={this.state.sagaList} onSubmit={this.GetSeriesList} /></Tab>
                        <Tab eventKey="season" title="Temporada"><Season seriesList={this.state.seriesList} onSubmit={this.GetSeasonList}/></Tab>
                        <Tab eventKey="episode" title="Episódio"><Episode seriesList={this.state.seriesList} seasonList={this.state.seasonList} GetSeasonList={this.GetSeasonList} onSubmit={this.GetSeasonList}/></Tab>
                        <Tab eventKey="parentAdvisory" title="Aconselhamento Parental"><ParentAdvisory onSubmit={this.GetParentAdvisoryList} /></Tab>
                        <Tab eventKey="company" title="Empresa"><Company onSubmit={this.GetCompanyList} /></Tab>
                        <Tab eventKey="engine" title="Engine"><Engine onSubmit={this.GetEngineList} /></Tab>
                        <Tab eventKey="publishingCompany" title="Editora"><PublishingCompany onSubmit={this.GetPublishingCompanyList} /></Tab>
                        <Tab eventKey="saga" title="Saga"><Saga onSubmit={this.GetSagaList} /></Tab>
                        <Tab eventKey="celebrity" title="Celebridade"><Celebrity onSubmit={this.GetCelebrityList} /></Tab>
                        <Tab eventKey="assignment" title="Função"><Assignment onSubmit={this.GetAssignmentList} /></Tab>
                        <Tab eventKey="genres" title="Géneros"><Genres onSubmit={this.GetGenresList} /></Tab>
                        
                        <Tab eventKey="createRelateAssignment" title="Funções das Celebridades"><RelateAssignment assignmentList={this.state.assignmentList} celebrityList={this.state.celebrityList} bookList={this.state.bookList} gameList={this.state.gameList} movieList={this.state.movieList} seriesList={this.state.seriesList} /></Tab>
                        <Tab eventKey="createVideo" title="Vídeos"><Video bookList={this.state.bookList} gameList={this.state.gameList} movieList={this.state.movieList} seriesList={this.state.seriesList} seasonList={this.state.seasonList} episodeList={this.state.episodeList} /></Tab>
                        <Tab eventKey="createRelateGenres" title="Associar Géneros"><RelateGenres genresList={this.state.genresList} bookList={this.state.bookList} gameList={this.state.gameList} movieList={this.state.movieList} seriesList={this.state.seriesList} /></Tab>
                        <Tab eventKey="developers" title="Desenvolvedores"><Developers gameList={this.state.gameList} companyList={this.state.companyList} /></Tab>
                    </Tabs>
                </Container>
            </React.Fragment>
        )
    }
}
 
export default Create;