import React, { Component } from 'react'
import { Tabs, Tab, Container } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { Get } from '../scripts/api'

import Navbar from './CustomNavbar'

import CreateBook from './Create/CreateBook'
import CreateCelebrity from './Create/CreateCelebrity'
import CreateRelateAssignment from './Create/CreateRelateAssignment'
import CreateGame from './Create/CreateGame'
import CreateMovie from './Create/CreateMovie'
import CreateSeries from './Create/CreateSeries'
import CreateSeason from './Create/CreateSeason'
import CreateEpisode from './Create/CreateEpisode'

import CreateAssignment from './Create/CreateAssignment'
import CreateCompany from './Create/CreateCompany'
import CreateEngine from './Create/CreateEngine'
import CreateParentAdvisory from './Create/CreateParentAdvisory'
import CreatePublishingCompany from './Create/CreatePublishingCompany'
import CreateSaga from './Create/CreateSaga'

import CreateVideo from './Create/CreateVideo'
import CreateGenres from './Create/CreateGenres'
import CreateRelateGenres from './Create/CreateRelateGenres'
import CreateDevelopers from './Create/CreateDevelopers'

class Create extends Component {
    constructor(props) {
        super(props);
        this.GetEngineList = this.GetEngineList.bind(this)        
        this.GetParentAdvisoryList = this.GetParentAdvisoryList.bind(this)        
        this.GetCompanyList = this.GetCompanyList.bind(this)        
        this.GetSagaList = this.GetSagaList.bind(this)
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
        })
    }
    GetEngineList = () => {
        let searchData = [ { table: 'Engine', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res && res.result) this.setState({ engineList: res.result })  
        })
    }
    GetCompanyList = () => {
        let searchData = [ { table: 'Company', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res && res.result) this.setState({ companyList: res.result })  
        })
    }
    GetParentAdvisoryList = () => {
        let searchData = [ { table: 'ParentAdvisory', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res && res.result) this.setState({ parentAdvisoryList: res.result })  
        })
    }
    GetSagaList = () => {
        let searchData = [ { table: 'Saga', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res && res.result) this.setState({ sagaList: res.result })  
        })
    }

    GetAssignmentList = () => {
        let searchData = [ { table: 'Assignment', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res && res.result) this.setState({ assignmentList: res.result })  
        })
    }
    GetCelebrityList = () => {
        let searchData = [ { table: 'Celebrity', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res && res.result) this.setState({ celebrityList: res.result })  
        })
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
        Get(searchData,(res) => {
            if(res && res.result) this.setState({ bookList: res.result })  
        })
    }
    GetGameList = () => {
        let searchData = [ { table: 'Game', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res && res.result) this.setState({ gameList: res.result })  
        })
    }
    GetMovieList = () => {
        let searchData = [ { table: 'Movie', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res && res.result) this.setState({ movieList: res.result })  
        })
    }
    GetGenresList = () => {
        let searchData = [ { table: 'Genres', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res && res.result) this.setState({ genresList: res.result })  
        })
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
                        <Tab eventKey="book" title="Livro"><CreateBook
                            publishingCompanyList={this.state.publishingCompanyList}
                            sagaList={this.state.sagaList}
                            onSubmit={this.GetBookList}
                        /></Tab>
                        <Tab eventKey="game" title="Jogo"><CreateGame
                            engineList={this.state.engineList}
                            companyList={this.state.companyList}
                            parentAdvisoryList={this.state.parentAdvisoryList}
                            sagaList={this.state.sagaList}
                            onSubmit={this.GetGameList}
                        /></Tab>
                        <Tab eventKey="movie" title="Filme"><CreateMovie
                            parentAdvisoryList={this.state.parentAdvisoryList}
                            sagaList={this.state.sagaList}
                            onSubmit={this.GetMovieList}
                        /></Tab>
                        <Tab eventKey="series" title="Séries"><CreateSeries
                            parentAdvisoryList={this.state.parentAdvisoryList}
                            sagaList={this.state.sagaList}
                            onSubmit={this.GetSeriesList}
                        /></Tab>
                        <Tab eventKey="season" title="Temporada"><CreateSeason
                            seriesList={this.state.seriesList}
                        /></Tab>
                        <Tab eventKey="episode" title="Episódio"><CreateEpisode
                            seriesList={this.state.seriesList}
                            seasonList={this.state.seasonList}
                            GetSeasonList={this.GetSeasonList}
                        /></Tab>
                        <Tab eventKey="parentAdvisory" title="Aconselhamento Parental"><CreateParentAdvisory
                            onSubmit={this.GetParentAdvisoryList}
                        /></Tab>
                        <Tab eventKey="company" title="Empresa"><CreateCompany
                            onSubmit={this.GetCompanyList}
                        /></Tab>
                        <Tab eventKey="engine" title="Engine"><CreateEngine
                            onSubmit={this.GetEngineList}
                        /></Tab>
                        <Tab eventKey="publishingCompany" title="Editora"><CreatePublishingCompany
                            onSubmit={this.GetPublishingCompanyList}
                        /></Tab>
                        <Tab eventKey="saga" title="Saga"><CreateSaga
                            onSubmit={this.GetSagaList}
                        /></Tab>
                        <Tab eventKey="celebrity" title="Celebridade"><CreateCelebrity
                            onSubmit={this.GetCelebrityList}
                        /></Tab>
                        <Tab eventKey="assignment" title="Função"><CreateAssignment
                            onSubmit={this.GetAssignmentList}
                        /></Tab>
                        <Tab eventKey="createRelateAssignment" title="Funções das Celebridades"><CreateRelateAssignment
                            assignmentList={this.state.assignmentList}
                            celebrityList={this.state.celebrityList}
                            bookList={this.state.bookList}
                            gameList={this.state.gameList}
                            movieList={this.state.movieList}
                            seriesList={this.state.seriesList}
                        /></Tab>
                        <Tab eventKey="createVideo" title="Vídeos"><CreateVideo
                            bookList={this.state.bookList}
                            gameList={this.state.gameList}
                            movieList={this.state.movieList}
                            seriesList={this.state.seriesList}
                            seasonList={this.state.seasonList}
                            episodeList={this.state.episodeList}
                            GetSeasonList={this.GetSeasonList}
                            GetEpisodeList={this.GetEpisodeList}
                        /></Tab>
                        <Tab eventKey="genres" title="Géneros"><CreateGenres
                            onSubmit={this.GetGenresList}
                        /></Tab>
                        <Tab eventKey="createRelateGenres" title="Associar Géneros"><CreateRelateGenres
                            genresList={this.state.genresList}
                            bookList={this.state.bookList}
                            gameList={this.state.gameList}
                            movieList={this.state.movieList}
                            seriesList={this.state.seriesList}
                        /></Tab>
                        <Tab eventKey="developers" title="Desenvolvedores"><CreateDevelopers
                            gameList={this.state.gameList}
                            companyList={this.state.companyList}
                        /></Tab>
                    </Tabs>
                </Container>
            </React.Fragment>
        )
    }
}
 
export default Create;