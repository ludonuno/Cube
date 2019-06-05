import React, { Component } from 'react'
import { Container, Form, Row, Col, Jumbotron } from 'react-bootstrap'

import Navbar from './CustomNavbar'
import { Get } from '../scripts/api'
//Faz as pesquisas aqui que depois são direcionadas para as respetivas páginas

class Home extends Component {
    constructor(props) {
        super(props);
        this.Search = this.Search.bind(this)
        this.HasSearched = this.HasSearched.bind(this)

        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            searched: undefined,
            apublishingCompanyList: [],
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

    acomponentDidMount() {
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

    aGetPublishingCompanyList = () => {
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
    GetGenresList = () => {
        let searchData = [ { table: 'Genres', fieldData: undefined } ]
        Get(searchData,(res) => {
            if(res.result) this.setState({ genresList: res.result })  
        })
    }

    HasSearched = () => {
        if(this.state.searched)
            return(
                <div>
                    {this.state.searched}
                </div>
            )
        else   
            return(
                <div>Pesquise algo na barra de pesquisa</div>
            )
    }

    Search(event) {
        event.preventDefault()
        this.setState({ searched: this.search.value })
    }
    
    render() { 
        return (
            <React.Fragment>
                <Navbar/>
                <Container className="fullpage">
                    <Form onSubmit={this.Search} ref={(form) => this.formRef = form}>
                        <Form.Group as={Row}> 
                            <Col>
                                <Form.Control type="text" ref={(input) => {this.search = input}} placeholder="Pesquisa" required/>
                            </Col>
                        </Form.Group>
                    </Form>
                    <this.HasSearched />
                </Container>
                <Jumbotron className="footer">
                    Isto é suposto ser o footer
                </Jumbotron>
            </React.Fragment>
        );
    }
}
 
export default Home;