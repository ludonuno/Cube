import React, { Component } from 'react'
import { Container, Form, Row, Col, Dropdown, InputGroup, DropdownButton, Carousel, Pagination} from 'react-bootstrap'

import Navbar from '../CustomNavbar'
import Footer from '../Footer'
import Alert from '../utils/Alert'
import { Get } from '../../scripts/api'
//Faz as pesquisas aqui que depois são direcionadas para as respetivas páginas

class Home extends Component {
    constructor(props) {
        super(props);
        this.Search = this.Search.bind(this)
        this.SearchForm = this.SearchForm.bind(this)
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            tableToSearch: 'Book',
            hasSearched: false,
            searchList: [],
            searchPage: 1,
            alert: { visible: false, message: '', variant: '' }
        }
    }
    ChangeAlert(visible, message, variant) {
        this.setState({ alert: { visible: visible, message: message, variant: variant} })
    }

    GetBookList = (value) => {
        let searchData = [ { table: 'Book', fieldData: [
            {field: 'title', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) this.setState({ searchList: res.result })  
            else {
                this.setState({ searchList: [] })
                this.ChangeAlert(true, `Não foram encontrados registos de : ${value}`, 'danger')
            }
        })
    }

    GetMovieList = (value) => {
        let searchData = [ { table: 'Movie', fieldData: [
            {field: 'title', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) this.setState({ searchList: res.result })  
            else {
                this.setState({ searchList: [] })
                this.ChangeAlert(true, `Não foram encontrados registos de : ${value}`, 'danger')
            }
        })
    }

    GetGameList = (value) => {
        let searchData = [ { table: 'Game', fieldData: [
            {field: 'title', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) this.setState({ searchList: res.result })  
            else {
                this.setState({ searchList: [] })
                this.ChangeAlert(true, `Não foram encontrados registos de : ${value}`, 'danger')
            }
        })
    }

    GetSeriesList = (value) => {
        let searchData = [ { table: 'Series', fieldData: [
            {field: 'title', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res && res.result) this.setState({ searchList: res.result }) 
            else {
                this.setState({ searchList: [] })
                this.ChangeAlert(true, `Não foram encontrados registos de : ${value}`, 'danger')
            }
        })
    }

    GetCelebrityList = (value) => {
        let searchData = [ { table: 'Celebrity', fieldData: [
            {field: 'name', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) this.setState({ searchList: res.result })  
            else {
                this.setState({ searchList: [] })
                this.ChangeAlert(true, `Não foram encontrados registos de : ${value}`, 'danger')
            }
        })
    }

    ShowSearchResult = () => {
        if (this.state.searchList[0]) {
            var toRender = []
            //console.log(this.state.searchList.length % 5)
            
            var index = (this.state.searchPage === 1) ? 0 : (this.state.searchPage - 1) * 5
            console.log(index)
            console.log(this.state.searchList)
            for (let n = index ; n <= this.state.searchPage * 5 - 1; n++) {
                if(this.state.searchList[n]) {
                    let element = this.state.searchList[n]
                    let header = null, subTitle = null, body = null
                    header = element.name ? element.name : header
                    header = element.title ? element.title : header
                    subTitle = element.releasedate ? element.releasedate.substring(0,10) : subTitle
                    subTitle = element.birthday ? element.birthday.substring(0,10) : subTitle
                    body = element.synopsis ? element.synopsis : body
                    body = element.biography ? element.biography : body

                    toRender.push(
                        <Row>
                            <Col>
                                <Row><a href={`/${this.state.tableToSearch}/${element.id}`}><h3>{ header }</h3></a></Row>
                                <Row><p className="sub-title-h3">{ subTitle }</p></Row>
                                <Row><p className="body-h3">{ body }</p></Row>
                            </Col>
                        </Row>
                    )
                }
            }
            return (
                <React.Fragment>
                    <Row>
                        <Col>
                            {toRender}
                        </Col>
                    </Row>
                    <Row >  
                        <Col>
                            <this.NavigationBar />
                        </Col>
                    </Row>
                </React.Fragment>
            )
        } else {
            return(<Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />)
        }
    }

    
    NavigationBar = () => {
        var nPages = []
        for (let n = 1; n <= Math.floor(this.state.searchList.length / 5) + 1; n++) {
            nPages.push( <Pagination.Item key={n} active={n === this.state.searchPage} onClick={() => {this.setState({ searchPage: n })}}> {n} </Pagination.Item> )
        }
        if(this.state.searchList.length % 5 === 0) nPages.pop()
        return (<Pagination className="text-center mt-4 mb-4">{nPages}</Pagination>)
    }

    Search(event) {
        event.preventDefault()
        switch (this.state.tableToSearch) {
            case 'Book':
                this.GetBookList(this.search.value)
                break;
            case 'Movie':
                this.GetMovieList(this.search.value)
                break;
            case 'Game':
                this.GetGameList(this.search.value)
                break;
            case 'Series':
                this.GetSeriesList(this.search.value)
                break;
            case 'Celebrity':
                this.GetCelebrityList(this.search.value)
                break;
            default:
                break;
        }
        this.setState({ hasSearched: true})
        this.setState({ searchPage: 1 })
    }
    
    SearchForm = () => {
        return(
            <Form onSubmit={this.Search} ref={(form) => this.formSearch = form}>
                <Form.Group as={Row}> 
                    <InputGroup className="mb-3">
                        <DropdownButton as={InputGroup.Prepend} variant="dark" title={`Pesquisar por ${this.state.tableToSearch}`} id="input-group-dropdown-1" size="lg">
                            <Dropdown.Item onClick={ () => this.setState({ tableToSearch: 'Book'}) }>Livros</Dropdown.Item>
                            <Dropdown.Item onClick={ () => this.setState({ tableToSearch: 'Movie'}) }>Filmes</Dropdown.Item>
                            <Dropdown.Item onClick={ () => this.setState({ tableToSearch: 'Game'}) }>Jogos</Dropdown.Item>
                            <Dropdown.Item onClick={ () => this.setState({ tableToSearch: 'Series'}) }>Séries</Dropdown.Item>
                            <Dropdown.Item onClick={ () => this.setState({ tableToSearch: 'Celebrity'}) }>Celebridades</Dropdown.Item>
                        </DropdownButton>
                        <Form.Control type="text" ref={(input) => {this.search = input}} placeholder="Pesquisa" required/>
                    </InputGroup>
                </Form.Group>
            </Form>
        )
    }

    render() { 
        if(this.state.hasSearched) {
            return (
                <React.Fragment>
                    <Navbar props={this.props} />
                    <Container className="fullpage">
                        <br />
                        <Row>
                            <Col>
                                <this.SearchForm/>
                            </Col>
                        </Row>
                        <this.ShowSearchResult />
                    </Container>
                    <Footer />
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <Navbar props={this.props} />
                    <Carousel className="background" controls={false} indicators={false}>
                        <Carousel.Item className="background-item">
                            <img className="background-item-img" src="http://yesofcorsa.com/wp-content/uploads/2017/05/Cinema-Wallpaper-High-Definition-1024x683.jpg" alt="First slide" />
                        </Carousel.Item>
                        <Carousel.Item className="background-item">
                            <img className="background-item-img" src="https://www.rd.com/wp-content/uploads/2017/11/How-Much-Does-a-Book-Need-to-Sell-to-Be-a-Bestseller-509582812-Billion-Photos-1024x683.jpg" alt="Third slide" />
                        </Carousel.Item>
                        <Carousel.Item className="background-item">
                            <img className="background-item-img" src="https://3c1703fe8d.site.internapcdn.net/newman/gfx/news/hires/2017/gaming.jpg" alt="Third slide" />
                        </Carousel.Item>
                    </Carousel>
                    <Container className="fullpage">
                        <br />
                        <Row>
                            <Col>
                                <this.SearchForm/>
                            </Col>
                        </Row>
                    </Container>
                    <Footer />
                </React.Fragment>
            );
        }
    }
}
 
export default Home;