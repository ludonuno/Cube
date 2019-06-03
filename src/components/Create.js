import React, { Component } from 'react'
import { Tabs, Tab, Container } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { Get } from '../scripts/api'

import Navbar from './CustomNavbar'

import CreateBook from './Create/CreateBook'
import CreateCelebrity from './Create/CreateCelebrity'
import CreateCelebrityAssignment from './Create/CreateCelebrityAssignment'
import CreateGame from './Create/CreateGame'
import CreateMovie from './Create/CreateMovie'
import CreateSeries from './Create/CreateSeries'

import CreateAssignment from './Create/CreateAssignment'
import CreateCompany from './Create/CreateCompany'
import CreateEngine from './Create/CreateEngine'
import CreateParentAdvisory from './Create/CreateParentAdvisory'
import CreatePublishingCompany from './Create/CreatePublishingCompany'
import CreateSaga from './Create/CreateSaga'

import CreateVideo from './Create/CreateVideo'

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
            movieList: [],
            bookList: [],
            gameList: []
        }
    }
    componentDidMount() {
        this.GetPublisherList()
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
    }

    GetPublisherList = () => {
        let searchData = [ { table: 'PublishingCompany', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res.result) this.setState({ publishingCompanyList: res.result })  
        })
    }
    GetEngineList = () => {
        let searchData = [ { table: 'Engine', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res.result) this.setState({ engineList: res.result })  
        })
    }
    GetCompanyList = () => {
        let searchData = [ { table: 'Company', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res.result) this.setState({ companyList: res.result })  
        })
    }
    GetParentAdvisoryList = () => {
        let searchData = [ { table: 'ParentAdvisory', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res.result) this.setState({ parentAdvisoryList: res.result })  
        })
    }
    GetSagaList = () => {
        let searchData = [ { table: 'Saga', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res.result) this.setState({ sagaList: res.result })  
        })
    }

    GetAssignmentList = () => {
        let searchData = [ { table: 'Assignment', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res.result) this.setState({ assignmentList: res.result })  
        })
    }
    GetCelebrityList = () => {
        let searchData = [ { table: 'Celebrity', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res.result) this.setState({ celebrityList: res.result })  
        })
    }
    GetSeriesList = () => {
        let searchData = [ { table: 'Series', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res.result) this.setState({ seriesList: res.result })  
        })
    }
    GetBookList = () => {
        let searchData = [ { table: 'Book', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res.result) this.setState({ bookList: res.result })  
        })
    }
    GetGameList = () => {
        let searchData = [ { table: 'Game', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res.result) this.setState({ gameList: res.result })  
        })
    }
    GetMovieList = () => {
        let searchData = [ { table: 'Movie', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res.result) this.setState({ movieList: res.result })  
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
                            onSubmit={this.GetPublisherList}
                        /></Tab>
                        <Tab eventKey="game" title="Jogo"><CreateGame
                            engineList={this.state.engineList}
                            companyList={this.state.companyList}
                            parentAdvisoryList={this.state.parentAdvisoryList}
                            sagaList={this.state.sagaList}
                            onSubmit={this.GetEngineList}
                        /></Tab>
                        <Tab eventKey="movie" title="Filme"><CreateMovie
                            parentAdvisoryList={this.state.parentAdvisoryList}
                            sagaList={this.state.sagaList}
                            onSubmit={this.GetParentAdvisoryList}
                        /></Tab>
                        <Tab eventKey="series" title="Séries"><CreateSeries
                            parentAdvisoryList={this.state.parentAdvisoryList}
                            sagaList={this.state.sagaList}
                            onSubmit={this.GetParentAdvisoryList}
                        /></Tab>
                        <Tab eventKey="parentAdvisory" title="Aconselhamento Parental"><CreateParentAdvisory
                            parentAdvisoryList={this.state.parentAdvisoryList}
                            onSubmit={this.GetParentAdvisoryList}
                        /></Tab>
                        <Tab eventKey="company" title="Empresa"><CreateCompany
                            companyList={this.state.companyList}
                            onSubmit={this.GetCompanyList}
                        /></Tab>
                        <Tab eventKey="engine" title="Engine"><CreateEngine
                            engineList={this.state.engineList}
                            onSubmit={this.GetEngineList}
                        /></Tab>
                        <Tab eventKey="publishingCompany" title="Editora"><CreatePublishingCompany
                            publishingCompanyList={this.state.publishingCompanyList}
                            onSubmit={this.GetPublisherList}
                        /></Tab>
                        <Tab eventKey="saga" title="Saga"><CreateSaga
                            sagaList={this.state.sagaList}
                            onSubmit={this.GetSagaList}
                        /></Tab>
                        <Tab eventKey="celebrity" title="Celebridade"><CreateCelebrity/></Tab>
                        <Tab eventKey="assignment" title="Função"><CreateAssignment
                            assignmentList={this.state.assignmentList}
                            onSubmit={this.GetAssignmentList}
                        /></Tab>
                        <Tab eventKey="createCelebrityAssignment" title="Funções das Celebridades"><CreateCelebrityAssignment
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
                        /></Tab>
                    </Tabs>
                </Container>
            </React.Fragment>
        )
    }
}
 
export default Create;