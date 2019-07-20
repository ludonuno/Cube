import React, { Component } from 'react'
import { Tabs, Tab, Container } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { Get } from '../scripts/api'

import Navbar from './CustomNavbar'

import Book from './Delete/Book'
import Celebrity from './Delete/Celebrity'
import RelateAssignment from './Delete/RelateAssignment'
import Game from './Delete/Game'
import Movie from './Delete/Movie'
import Series from './Delete/Series'
import Season from './Delete/Season'
import Episode from './Delete/Episode'
import Assignment from './Delete/Assignment'
import Company from './Delete/Company'
import Engine from './Delete/Engine'
import ParentAdvisory from './Delete/ParentAdvisory'
import PublishingCompany from './Delete/PublishingCompany'
import Saga from './Delete/Saga'
import Video from './Delete/Video'
import Genres from './Delete/Genres'
import RelateGenres from './Delete/RelateGenres'
import Developers from './Delete/Developers'

class Delete extends Component {
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
            genresList: [],
            celebrityAssignmentGameList: [],
            celebrityAssignmentMovieList: [],
            celebrityAssignmentSeriesList: [],
            celebrityAssignmentBookList: [],
        }
    }

    componentDidMount() {
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
        this.GetRelateAssignmentList()
    }

    GetPublishingCompanyList = () => {
        let searchData = [ { table: 'PublishingCompany', fieldData: undefined } ]
        Get(searchData, (res) => { if(res && res.result) this.setState({ publishingCompanyList: res.result }) })
    }
    GetEngineList = () => {
        let searchData = [ { table: 'Engine', fieldData: undefined } ]
        Get(searchData,(res) => { if(res && res.result) this.setState({ engineList: res.result }) })
    }
    GetCompanyList = () => {
        let searchData = [ { table: 'Company', fieldData: undefined } ]
        Get(searchData,(res) => { if(res && res.result) this.setState({ companyList: res.result }) })
    }
    GetParentAdvisoryList = () => {
        let searchData = [ { table: 'ParentAdvisory', fieldData: undefined } ]
        Get(searchData,(res) => { if(res && res.result) this.setState({ parentAdvisoryList: res.result }) })
    }
    GetSagaList = () => {
        let searchData = [ { table: 'Saga', fieldData: undefined } ]
        Get(searchData,(res) => { if(res && res.result) this.setState({ sagaList: res.result }) })
    }
    GetAssignmentList = () => {
        let searchData = [ { table: 'Assignment', fieldData: undefined } ]
        Get(searchData,(res) => { if(res && res.result) this.setState({ assignmentList: res.result }) })
    }
    GetCelebrityList = () => {
        let searchData = [ { table: 'Celebrity', fieldData: undefined } ]
        Get(searchData,(res) => { if(res && res.result) this.setState({ celebrityList: res.result }) })
    }
    GetEpisodeList = (seasonId) => {
        let searchData = [ { table: 'Episode', fieldData: [
            { field: 'seasonId', data: seasonId }
        ] } ]
        Get(searchData,(res) => {
            if(res && res.result) this.setState({ episodeList: res.result })
            else this.setState({ episodeList: [] })
        })
    }
    GetSeasonList = (seriesId) => {
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
    GetSeriesList = () => {
        let searchData = [ { table: 'Series', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res && res.result) {
                this.setState({ seriesList: res.result })
                if(res.result[0])
                    this.GetSeasonList(res.result[0].id)
            }
        })
    }
    GetBookList = () => {
        let searchData = [ { table: 'Book', fieldData: undefined } ]
        Get(searchData,(res) => { if(res && res.result) this.setState({ bookList: res.result }) })
    }
    GetGameList = () => {
        let searchData = [ { table: 'Game', fieldData: undefined } ]
        Get(searchData,(res) => { if(res && res.result) this.setState({ gameList: res.result }) })
    }
    GetMovieList = () => {
        let searchData = [ { table: 'Movie', fieldData: undefined } ]
        Get(searchData,(res) => { if(res && res.result) this.setState({ movieList: res.result }) })
    }
    GetGenresList = () => {
        let searchData = [ { table: 'Genres', fieldData: undefined } ]
        Get(searchData,(res) => { if(res && res.result) this.setState({ genresList: res.result }) })
    }

    GetRelateAssignmentList = () => {
        let searchDataGame = [ { table: 'CelebrityAssignmentGame', fieldData: undefined } ]
        Get(searchDataGame,(res) => { if(res && res.result) this.setState({ celebrityAssignmentGameList: res.result }) })
        let searchDataMovie = [ { table: 'CelebrityAssignmentMovie', fieldData: undefined } ]
        Get(searchDataMovie,(res) => { if(res && res.result) this.setState({ celebrityAssignmentMovieList: res.result }) })
        let searchDataSeries = [ { table: 'CelebrityAssignmentSeries', fieldData: undefined } ]
        Get(searchDataSeries,(res) => { if(res && res.result) this.setState({ celebrityAssignmentSeriesList: res.result }) })
        let searchDataBook = [ { table: 'CelebrityAssignmentBook', fieldData: undefined } ]
        Get(searchDataBook,(res) => { if(res && res.result) this.setState({ celebrityAssignmentBookList: res.result }) })
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
                    <Tabs id="controlled-tab-example" activeKey={this.state.key} onSelect={key => this.setState({ key })}>
                        <Tab eventKey="book" title="Livro"><Book bookList={this.state.bookList} publishingCompanyList={this.state.publishingCompanyList} sagaList={this.state.sagaList} onSubmit={this.GetBookList} /></Tab>
                        <Tab eventKey="game" title="Jogo"><Game gameList={this.state.gameList} engineList={this.state.engineList} companyList={this.state.companyList} parentAdvisoryList={this.state.parentAdvisoryList} sagaList={this.state.sagaList} onSubmit={this.GetGameList} /></Tab>
                        <Tab eventKey="movie" title="Filme"><Movie movieList={this.state.movieList} parentAdvisoryList={this.state.parentAdvisoryList} sagaList={this.state.sagaList} onSubmit={this.GetMovieList} /></Tab>
                        <Tab eventKey="series" title="Séries"><Series seriesList={this.state.seriesList} parentAdvisoryList={this.state.parentAdvisoryList} sagaList={this.state.sagaList} onSubmit={this.GetSeriesList} /></Tab>
                        <Tab eventKey="season" title="Temporada"><Season seasonList={this.state.seasonList} seriesList={this.state.seriesList} onSubmit={this.GetSeasonList}/></Tab>
                        <Tab eventKey="episode" title="Episódio"><Episode episodeList={this.state.episodeList} seriesList={this.state.seriesList} seasonList={this.state.seasonList} GetSeasonList={this.GetSeasonList} onSubmit={this.GetEpisodeList}/></Tab>
                        <Tab eventKey="parentAdvisory" title="Aconselhamento Parental"><ParentAdvisory parentAdvisoryList={this.state.parentAdvisoryList} onSubmit={this.GetParentAdvisoryList} /></Tab>
                        <Tab eventKey="company" title="Empresa"><Company companyList={this.state.companyList} onSubmit={this.GetCompanyList} /></Tab>
                        <Tab eventKey="engine" title="Engine"><Engine engineList={this.state.engineList} onSubmit={this.GetEngineList} /></Tab>
                        <Tab eventKey="publishingCompany" title="Editora"><PublishingCompany publishingCompanyList={this.state.publishingCompanyList} onSubmit={this.GetPublishingCompanyList} /></Tab>
                        <Tab eventKey="saga" title="Saga"><Saga sagaList={this.state.sagaList} onSubmit={this.GetSagaList} /></Tab>
                        <Tab eventKey="celebrity" title="Celebridade"><Celebrity celebrityList={this.state.celebrityList} onSubmit={this.GetCelebrityList} /></Tab>
                        <Tab eventKey="assignment" title="Função"><Assignment assignmentList={this.state.assignmentList} onSubmit={this.GetAssignmentList} /></Tab>

                        <Tab eventKey="createRelateAssignment" title="Funções das Celebridades"><RelateAssignment assignmentList={this.state.assignmentList} celebrityList={this.state.celebrityList} bookList={this.state.bookList} gameList={this.state.gameList} movieList={this.state.movieList} seriesList={this.state.seriesList} /></Tab>
                        <Tab eventKey="createVideo" title="Vídeos"><Video bookList={this.state.bookList} gameList={this.state.gameList} movieList={this.state.movieList} seriesList={this.state.seriesList} seasonList={this.state.seasonList} episodeList={this.state.episodeList} GetSeasonList={this.GetSeasonList} GetEpisodeList={this.GetEpisodeList} /></Tab>
                        <Tab eventKey="genres" title="Géneros"><Genres onSubmit={this.GetGenresList} /></Tab>
                        <Tab eventKey="createRelateGenres" title="Associar Géneros"><RelateGenres genresList={this.state.genresList} bookList={this.state.bookList} gameList={this.state.gameList} movieList={this.state.movieList} seriesList={this.state.seriesList} /></Tab>
                        <Tab eventKey="developers" title="Desenvolvedores"><Developers gameList={this.state.gameList} companyList={this.state.companyList} /></Tab>
                    </Tabs>
                </Container>
            </React.Fragment>
        )
    }
}
 
export default Delete;