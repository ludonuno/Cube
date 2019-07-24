import React, { Component } from 'react'
import { Container, Col, Row, Jumbotron, Form, Tabs, Tab, } from 'react-bootstrap'

import Navbar from '../CustomNavbar'
import { Get, Create } from '../../scripts/api'
import { ReplaceComa } from '../../scripts/utils'
import Footer from '../Footer';

import Comments from '../utils/Comments'
import SagaRelated from '../utils/SagaRelated'
import SliderVideos from '../utils/SliderVideos'
import SliderCelebrities from '../utils/SliderCelebrities'

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            book: undefined,
            sagaMovie: undefined,
            sagaGame: undefined,
            sagaSeries: undefined,
            sagaBook: undefined,
            genresBook: undefined,
            celebritiesAssignment: undefined,
            videos: undefined,
            rating: undefined,
            comments: undefined,
            responseTo: undefined
        }
    }
    componentDidMount() {
        this.GetBook(this.props.match.params.id)
    }

    GetBook = (value) => {
        let searchData = [ { table: 'Book', fieldData: [
            {field: 'id', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) {
                this.setState({ book: res.result[0] })
                this.GetGenresBook(res.result[0].id)
                this.GetSagaRelated(res.result[0].sagaId)
                this.GetRating(res.result[0].id)
                this.GetComments(res.result[0].id)
                this.GetCelebrities(res.result[0].id)
                this.GetVideos(res.result[0].id)
            } else {
                this.setState({ book: undefined })
                this.props.history.push('/noMatch')
            }
        })
    }
    GetSagaRelated = (value) => {
        let searchDataMovie = [ { table: 'Movie', fieldData: [
            {field: 'sagaId', data: value},
        ] } ]
        let searchDataGame = [ { table: 'Game', fieldData: [
            {field: 'sagaId', data: value},
        ] } ]
        let searchDataSeries = [ { table: 'Series', fieldData: [
            {field: 'sagaId', data: value},
        ] } ]
        let searchDataBook = [ { table: 'Book', fieldData: [
            {field: 'sagaId', data: value},
        ] } ]
        Get(searchDataMovie,(res) => {
            if(res.result) this.setState({ sagaMovie: res.result })
            else this.setState({ sagaMovie: undefined })
        })
        Get(searchDataGame,(res) => {
            if(res.result) this.setState({ sagaGame: res.result })
            else this.setState({ sagaGame: undefined })
        })
        Get(searchDataSeries,(res) => {
            if(res.result) this.setState({ sagaSeries: res.result })
            else this.setState({ sagaSeries: undefined })
        })
        Get(searchDataBook,(res) => {
            if(res.result) this.setState({ sagaBook: res.result })
            else this.setState({ sagaBook: undefined })
        })
    }
    GetGenresBook = (value) => {
        let searchData = [ { table: 'GenresBook', fieldData: [
            {field: 'bookId', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) this.setState({ genresBook: res.result })
            else this.setState({ genresBook: undefined })
        })
    }
    GetComments = (value) => {
        let searchData = [ { table: 'BookComments', fieldData: [
            {field: 'bookId', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) {
                res.result.forEach((v, i) => {
                    v.responseTo = this.GetResponseTo(v.id)
                })
                this.setState({ comments: res.result })
            } else {
                this.setState({ comments: undefined })
            }
        })
    }
    GetResponseTo = (value) => {
        let searchData = [ { table: 'BookComments', fieldData: [
            {field: 'responseTo', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) {
                let comments = [...this.state.comments]
                comments.forEach((v, i) => {
                    if(v.id === value) v.responseto = res.result
                })
                this.setState({ comments: comments })
            }
        })
    }
    GetCelebrities = (value) => {
        let searchData = [ { table: 'CelebrityAssignmentBook', fieldData: [
            {field: 'bookId', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) {
                this.setState({ celebritiesAssignment: res.result })
            } else {
                this.setState({ celebritiesAssignment: undefined })
            }
        })
    }
    GetVideos = (value) => {
        let searchData = [ { table: 'VideoBook', fieldData: [
            {field: 'bookId', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) {
                this.setState({ videos: res.result })
            } else {
                this.setState({ videos: undefined })
            }
        })
    }

    // Book
    BookInfo = () => {
        if(this.state.book) {
            let title = this.state.book.title ? ReplaceComa(this.state.book.title) : 'Título desconhecido'
            let releaseDate = this.state.book.releaseDate ? this.state.book.releaseDate.substring(0,10) : 'Data de lançamento desconhecida'
            let synopsis = this.state.book.synopsis ? ReplaceComa(this.state.book.synopsis) : 'Sínopse desconhecida'
            let sagaName = this.state.book.sagaName ? ReplaceComa(this.state.book.sagaName) : 'Saga desconhecida'
            let publishingCompanyName = this.state.book.publishingCompanyName ? ReplaceComa(this.state.book.publishingCompanyName) : 'Publicadora desconhecida'
            let genres = this.state.genresBook ? this.OrderGenres() : 'Géneros associados desconhecidos'
            let rating = this.state.rating ? this.state.rating.avg : null
            return (
                <React.Fragment>
                    <Row>
                        <Col>
                            <Row><h2>{ title }</h2></Row>
                            <Row>
                                <span className="sub-title">Data de lançamento: { releaseDate }</span>
                                <span className="sub-title">| Editora: { publishingCompanyName }</span>
                                <span className="sub-title">| Saga: { sagaName }</span>
                            </Row>
                            <Row><span className="sub-title">Géneros: { genres } </span></Row>
                        </Col>
                        <Col lg={12} xl={4} >
                            <Jumbotron className="rating">
                                Avaliação: { rating ? `${rating}/10` : 'Sem avaliações' }
                                <br/>
                                <this.FormRating />
                            </Jumbotron>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <Row><h4>Sínopse</h4></Row>
                            <Row>
                                <span>{ synopsis }</span>
                            </Row>
                        </Col>
                    </Row>
                </React.Fragment>
            )
        } else return null
    }
    OrderGenres = () => {
        let genresBook = []
        this.state.genresBook.forEach((v, i) => {
            genresBook.push(v.genre)
            genresBook.push(' | ')
            if (i === this.state.genresBook.length - 1) genresBook.pop()
        })
        return genresBook
    }
    
    // Rating
    AddRating = (event) => {
        event.preventDefault()
        let searchData = [ { table: 'BookRating', fieldData: [
            {field: 'userEmail', data: this.state.user.email},
            {field: 'userPassword', data: this.state.user.password},
            {field: 'userId', data: this.state.user.id},
            {field: 'bookId', data: this.state.book.id},
            {field: 'rate', data: this.rate.value},
        ] } ]
        Create(searchData,(res) => {
            if(res.result) {
                this.GetRating(this.state.book.id)
            } 
            else this.setState({ rating: undefined })
        })
    }
    GetRating = (value) => {
        let searchData = [ { table: 'BookRating', fieldData: [
            {field: 'bookId', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) this.setState({ rating: res.result[0] })
            else this.setState({ rating: undefined })
        })
    }
    FormRating = () => {
        if (!this.state.user) return null
        return (
            <React.Fragment>
                <br/>
                <Form onSubmit={this.AddRating}>
                    <Form.Group as={Row}>
                        <Form.Label column lg={6}>Avaliação</Form.Label>
                        <Col>
                            <Form.Control type="number" defaultValue="0" min="0" max="10" ref={(input) => {this.rate = input}}/>
                        </Col>
                    </Form.Group>
                </Form>
            </React.Fragment>
        )
    }

    render() { 
        return ( 
            <React.Fragment>
                <Navbar props={this.props}/>
                <br/>
                <Container className="fullpage">
                    <this.BookInfo />
                    <br/>
                    <Tabs defaultActiveKey="comments" id="uncontrolled-tab-example">
                        <Tab eventKey="comments" title="Comentários">
                            <br/>
                            <Comments table={'BookComments'} field={'bookId'} id={this.state.book ? this.state.book.id : null} comments={this.state.comments} GetComments={this.GetComments}/>
                        </Tab>
                        <Tab eventKey="saga" title="Saga">
                            <br/>
                            <SagaRelated sagaMovie={this.state.sagaMovie} sagaGame={this.state.sagaGame} sagaSeries={this.state.sagaSeries} sagaBook={this.state.sagaBook}/>
                        </Tab>
                        <Tab eventKey="celebrities" title="Celebridades">
                            <br/>
                            <SliderCelebrities list={this.state.celebritiesAssignment} href='Celebrity' header='Celebridades'/>
                        </Tab>
                        <Tab eventKey="videos" title="Vídeos">
                            <br/>
                            <SliderVideos list={this.state.videos}/>
                        </Tab>
                    </Tabs>
                </Container>
                <Footer />
            </React.Fragment>    
        )
    }
}
 
export default Book;