import React, { Component } from 'react'
import { Tabs, Tab, Container } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { Get } from '../scripts/api'

import Navbar from './CustomNavbar'

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
        this.GetPublishingCompanyList = this.GetPublishingCompanyList.bind(this)
        this.GetEngineList = this.GetEngineList.bind(this)
        this.GetCompanyList = this.GetCompanyList.bind(this)
        this.GetParentAdvisoryList = this.GetParentAdvisoryList.bind(this)
        this.GetSagaList = this.GetSagaList.bind(this)
        this.GetAssignmentList = this.GetAssignmentList.bind(this)
        this.GetCelebrityList = this.GetCelebrityList.bind(this)
        this.GetEpisodeList = this.GetEpisodeList.bind(this)
        this.GetSeasonList = this.GetSeasonList.bind(this)
        this.GetSeriesList = this.GetSeriesList.bind(this)
        this.GetBookList = this.GetBookList.bind(this)
        this.GetGameList = this.GetGameList.bind(this)
        this.GetMovieList = this.GetMovieList.bind(this)
        this.GetGenresList = this.GetGenresList.bind(this)
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
        this.LoadData()
    }
    LoadData() {
        this.GetPublishingCompanyList()
        this.GetEngineList()
        this.GetCompanyList()
        this.GetParentAdvisoryList()
        this.GetSagaList()
        this.GetAssignmentList()
        this.GetCelebrityList()
        this.GetSeriesList()
        this.GetBookList()
        this.GetGameList()
        this.GetMovieList()
        this.GetGenresList()
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
    
    GetEpisodeList = (seasonId) => { // FIXME: BUG AO MUDAR A SÉRIE NUMA TAB MUDA AS COMBOBOX DAS OUTRAS TABS SERIES, SEASON, EPISODE
        let searchData = [ { table: 'Episode', fieldData: [
            { field: 'seasonId', data: seasonId }
        ] } ]
        Get(searchData,(res) => {
            if(res && res.result) this.setState({ episodeList: res.result })
            else this.setState({ episodeList: [] })
        })
    }
    
    GetSeasonList = (seriesId) => { // FIXME: BUG AO MUDAR A SÉRIE NUMA TAB MUDA AS COMBOBOX DAS OUTRAS TABS SERIES, SEASON, EPISODE
        let searchData = [ { table: 'Season', fieldData: [
            { field: 'seriesId', data: seriesId }
        ] } ]
        Get(searchData,(res) => {
            if(res && res.result) {
                this.setState({ seasonList: res.result })  
                if(res.result[0])
                    this.GetEpisodeList(res.result[0].id)
            } else {
                this.setState({ seasonList: [] })
                this.setState({ episodeList: [] })
            }
        })
    }
    
    GetSeriesList = () => { // FIXME: BUG AO MUDAR A SÉRIE NUMA TAB MUDA AS COMBOBOX DAS OUTRAS TABS SERIES, SEASON, EPISODE
        let searchData = [ { table: 'Series', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res && res.result) {
                this.setState({ seriesList: res.result })
                if(res.result[0])
                    this.GetSeasonList(res.result[0].id)
            }
            else {
                this.setState({ seriesList: [] })
                this.setState({ seasonList: [] })
                this.setState({ episodeList: [] })
            }
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
        this.LoadData()
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
                        <Tab eventKey="book" title="Livro"><Book bookList={this.state.bookList} publishingCompanyList={this.state.publishingCompanyList} sagaList={this.state.sagaList} onSubmit={this.GetBookList} /></Tab>
                        <Tab eventKey="game" title="Jogo"><Game gameList={this.state.gameList} engineList={this.state.engineList} companyList={this.state.companyList} parentAdvisoryList={this.state.parentAdvisoryList} sagaList={this.state.sagaList} onSubmit={this.GetGameList} /></Tab>
                        <Tab eventKey="movie" title="Filme"><Movie movieList={this.state.movieList} parentAdvisoryList={this.state.parentAdvisoryList} sagaList={this.state.sagaList} onSubmit={this.GetMovieList} /></Tab>
                        
                        <Tab eventKey="series" title="Séries"><Series seriesList={this.state.seriesList} parentAdvisoryList={this.state.parentAdvisoryList} sagaList={this.state.sagaList} onSubmit={this.GetSeriesList} /></Tab>
                        <Tab eventKey="season" title="Temporada"><Season seriesList={this.state.seriesList} seasonList={this.state.seasonList} onSubmit={this.GetSeasonList}/></Tab>
                        <Tab eventKey="episode" title="Episódio"><Episode seriesList={this.state.seriesList} seasonList={this.state.seasonList} episodeList={this.state.episodeList} GetSeasonList={this.GetSeasonList} onSubmit={this.GetEpisodeList}/></Tab>
                       
                        <Tab eventKey="parentAdvisory" title="Aconselhamento Parental"><ParentAdvisory parentAdvisoryList={this.state.parentAdvisoryList} onSubmit={this.GetParentAdvisoryList} /></Tab>
                        <Tab eventKey="company" title="Empresa"><Company companyList={this.state.companyList} onSubmit={this.GetCompanyList} /></Tab>
                        <Tab eventKey="engine" title="Engine"><Engine engineList={this.state.engineList} onSubmit={this.GetEngineList} /></Tab>
                        <Tab eventKey="publishingCompany" title="Editora"><PublishingCompany publishingCompanyList={this.state.publishingCompanyList} onSubmit={this.GetPublishingCompanyList} /></Tab>
                        <Tab eventKey="saga" title="Saga"><Saga sagaList={this.state.sagaList} onSubmit={this.GetSagaList} /></Tab>
                        <Tab eventKey="celebrity" title="Celebridade"><Celebrity celebrityList={this.state.celebrityList} onSubmit={this.GetCelebrityList} /></Tab>
                        <Tab eventKey="assignment" title="Função"><Assignment assignmentList={this.state.assignmentList} onSubmit={this.GetAssignmentList} /></Tab>
                    </Tabs>
                </Container>
            </React.Fragment>
        )
    }
}
 
export default Update;