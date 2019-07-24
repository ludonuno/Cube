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
            genresGameList: [],
            genresMovieList: [],
            genresBookList: [],
            genresSeriesList: [],
            developersList: [],
            videoGameList: [],
            videoMovieList: [],
            videoBookList: [],
            videoSeriesList: [],
            videoSeasonList: [],
            videoEpisodeList: []
        }
    }

    componentDidMount() {   
        this.GetBookList()
        this.GetPublishingCompanyList()
        this.GetSagaList()
    }

    GetPublishingCompanyList = () => {
        let searchData = [ { table: 'PublishingCompany', fieldData: undefined } ]
        Get(searchData, (res) => { 
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

    GetRelateAssignmentList = () => {
        let searchDataGame = [ { table: 'CelebrityAssignmentGame', fieldData: undefined } ]
        Get(searchDataGame,(res) => {
            if(res && res.result) this.setState({ celebrityAssignmentGameList: res.result })
            else this.setState({ celebrityAssignmentGameList: [] })
        })
        let searchDataMovie = [ { table: 'CelebrityAssignmentMovie', fieldData: undefined } ]
        Get(searchDataMovie,(res) => {
            if(res && res.result) this.setState({ celebrityAssignmentMovieList: res.result })
            else this.setState({ celebrityAssignmentMovieList: [] })
        })
        let searchDataSeries = [ { table: 'CelebrityAssignmentSeries', fieldData: undefined } ]
        Get(searchDataSeries,(res) => {
            if(res && res.result) this.setState({ celebrityAssignmentSeriesList: res.result })
            else this.setState({ celebrityAssignmentSeriesList: [] })
        })
        let searchDataBook = [ { table: 'CelebrityAssignmentBook', fieldData: undefined } ]
        Get(searchDataBook,(res) => {
            if(res && res.result) this.setState({ celebrityAssignmentBookList: res.result })
            else this.setState({ celebrityAssignmentBookList: [] })
        })
    }
    GetRelateGenresList = () => {
        let searchDataGame = [ { table: 'GenresGame', fieldData: undefined } ]
        Get(searchDataGame,(res) => {
            if(res && res.result) this.setState({ genresGameList: res.result })
            else this.setState({ genresGameList: [] })
        })
        let searchDataMovie = [ { table: 'GenresMovie', fieldData: undefined } ]
        Get(searchDataMovie,(res) => {
            if(res && res.result) this.setState({ genresMovieList: res.result })
            else this.setState({ genresMovieList: [] })
        })
        let searchDataSeries = [ { table: 'GenresSeries', fieldData: undefined } ]
        Get(searchDataSeries,(res) => {
            if(res && res.result) this.setState({ genresSeriesList: res.result })
            else this.setState({ genresSeriesList: [] })
        })
        let searchDataBook = [ { table: 'GenresBook', fieldData: undefined } ]
        Get(searchDataBook,(res) => {
            if(res && res.result) this.setState({ genresBookList: res.result })
            else this.setState({ genresBookList: [] })
        })
    }
    GetDevelopersList = () => {
        let searchData = [ { table: 'Developers', fieldData: undefined } ]
        Get(searchData,(res) => { 
            if(res && res.result) this.setState({ developersList: res.result }) 
            else this.setState({ developersList: [] })
        })
    }
    GetVideosList = () => {
        let searchDataGame = [ { table: 'VideoGame', fieldData: undefined } ]
        Get(searchDataGame,(res) => {
            if(res && res.result) this.setState({ videoGameList: res.result })
            else this.setState({ videoGameList: [] })
        })
        let searchDataMovie = [ { table: 'VideoMovie', fieldData: undefined } ]
        Get(searchDataMovie,(res) => {
            if(res && res.result) this.setState({ videoMovieList: res.result })
            else this.setState({ videoMovieList: [] })
        })
        let searchDataBook = [ { table: 'VideoBook', fieldData: undefined } ]
        Get(searchDataBook,(res) => {
            if(res && res.result) this.setState({ videoBookList: res.result })
            else this.setState({ videoBookList: [] })
        })
        let searchDataSeries = [ { table: 'VideoSeries', fieldData: undefined } ]
        Get(searchDataSeries,(res) => {
            if(res && res.result) this.setState({ videoSeriesList: res.result })
            else this.setState({ videoSeriesList: [] })
        })
        let searchDataSeason = [ { table: 'VideoSeason', fieldData: undefined } ]
        Get(searchDataSeason,(res) => {
            if(res && res.result) this.setState({ videoSeasonList: res.result })
            else this.setState({ videoSeasonList: [] })
        })
        let searchDataEpisode = [ { table: 'VideoEpisode', fieldData: undefined } ]
        Get(searchDataEpisode,(res) => {
            if(res && res.result) this.setState({ videoEpisodeList: res.result })
            else this.setState({ videoEpisodeList: [] })
        })
    }

    ChangeTab = (key) => {
        this.setState({ key })
        switch (key) {
            case 'book':
                this.GetBookList()
                break
            case 'game':
                this.GetGameList()
                break
            case 'movie':
                this.GetMovieList()
                break
            case 'series':
                this.GetSeriesList()
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
            case 'relateAssignment':
                this.GetRelateAssignmentList()
                break
            case 'video':
                this.GetVideosList()
                break
            case 'genres':
                this.GetGenresList()
                break
            case 'relateGenres':
                this.GetRelateGenresList()
                break
            case 'developers':
                this.GetDevelopersList()
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
                        <Tab eventKey="relateAssignment" title="Funções das Celebridades"><RelateAssignment onSubmit={this.GetRelateAssignmentList} assignmentList={this.state.assignmentList} celebrityList={this.state.celebrityList} bookList={this.state.bookList} gameList={this.state.gameList} movieList={this.state.movieList} seriesList={this.state.seriesList} celebrityAssignmentGameList={this.state.celebrityAssignmentGameList} celebrityAssignmentMovieList={this.state.celebrityAssignmentMovieList} celebrityAssignmentSeriesList={this.state.celebrityAssignmentSeriesList} celebrityAssignmentBookList={this.state.celebrityAssignmentBookList}/></Tab>

                        <Tab eventKey="video" title="Vídeos"><Video videoGameList={this.state.videoGameList} videoMovieList={this.state.videoMovieList} videoBookList={this.state.videoBookList} videoSeriesList={this.state.videoSeriesList} videoSeasonList={this.state.videoSeasonList} videoEpisodeList={this.state.videoEpisodeList} onSubmit={this.GetVideosList} /></Tab>

                        <Tab eventKey="genres" title="Géneros"><Genres genresList={this.state.genresList} onSubmit={this.GetGenresList} /></Tab>
                        <Tab eventKey="relateGenres" title="Associar Géneros"><RelateGenres genresGameList={this.state.genresGameList} genresMovieList={this.state.genresMovieList} genresBookList={this.state.genresBookList} genresSeriesList={this.state.genresSeriesList} onSubmit={this.GetRelateGenresList} /></Tab>
                        <Tab eventKey="developers" title="Desenvolvedores"><Developers developersList={this.state.developersList} onSubmit={this.GetDevelopersList} /></Tab>
                    </Tabs>
                </Container>
            </React.Fragment>
        )
    }
}
 
export default Delete;