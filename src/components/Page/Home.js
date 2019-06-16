import React, { Component } from 'react'
import { Container, Form, Row, Col, Card, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

import Navbar from '../CustomNavbar'
import Footer from '../Footer'
import { Get } from '../../scripts/api'
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

    GetPublishingCompanyList = (value) => {
        let searchData = [ { table: 'PublishingCompany', fieldData: [
            {field: 'name', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) this.setState({ publishingCompanyList: res.result })  
        })
    }
    GetEngineList = (value) => {
        let searchData = [ { table: 'Engine', fieldData: [
            {field: 'name', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) this.setState({ engineList: res.result })  
        })
    }
    GetCompanyList = (value) => {
        let searchData = [ { table: 'Company', fieldData: [
            {field: 'name', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res && res.result) this.setState({ companyList: res.result }) 
            else  this.setState({ companyList: [] })
        })
    }
    GetSagaList = (value) => {
        let searchData = [ { table: 'Saga', fieldData: [
            {field: 'name', data: value},
        ] } ]
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
    GetBookList = (value) => {
        let searchData = [ { table: 'Book', fieldData: [
            {field: 'title', data: value},
        ] } ]
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

    RenderCompanyList = () => {
        let toRender = []
        this.state.companyList.forEach(company => {
            toRender.push(
                <Col lg={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{company.name}</Card.Title>
                            <Card.Text>Visite a página de {company.name}</Card.Text>
                            <Button variant="primary" onClick={() => {console.log('ola'); console.log('adeus')} }>Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Col>
                
            )
        })
        return (
            <React.Fragment>
                {}
                <Row>
                    {toRender}
                    {toRender}
                </Row>
                <Row>
                    {toRender}
                    {toRender}
                </Row>
            </React.Fragment>
        )
    }

    HasSearched = () => {
        //var toRender
        if(this.state.companyList[0]) {
            return this.RenderCompanyList()
        } else {
            return (
                <div>
                    Não foram encontrados resultados da pesquisa: {this.state.searched}
                </div>   
            )
        }
    }

    Search(event) {
        event.preventDefault()
        this.setState({ searched: this.search.value })
        //executar os gets
        this.GetCompanyList(this.search.value)
        
    }
    
    render() { 
        return (
            <React.Fragment>
                <Navbar/>
                <Container className="fullpage">
                <Row>
                    <Col>
                        <Form onSubmit={this.Search} ref={(form) => this.formRef = form}>
                            <Form.Group as={Row}> 
                                <Col>
                                    <Form.Control type="text" ref={(input) => {this.search = input}} placeholder="Pesquisa" required/>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col lg={2} className="searchMenu">
                        menu
                    </Col>
                    <Col>
                        Apresentação de resultados
                    </Col>
                </Row>
                </Container>
                <Footer />
            </React.Fragment>
        );
    }
}
 
export default Home;