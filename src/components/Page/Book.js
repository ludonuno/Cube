import React, { Component } from 'react'
import { Container, Col, Row, Jumbotron, Form, Media, Tabs, Tab, Button } from 'react-bootstrap'

//TODO: FAZER O FORMULÁRIOS DOS COMENTÁRIOS

import Navbar from '../CustomNavbar'
import { Get, Create } from '../../scripts/api'
import { ReplaceComa } from '../../scripts/utils'
import SliderSagaRelated from '../utils/SliderSagaRelated'
import Footer from '../Footer';
class Book extends Component {
    constructor(props) {
        super(props);
        this.GetBook = this.GetBook.bind(this)
        this.GetPublishingCompany = this.GetPublishingCompany.bind(this)
        this.GetSaga = this.GetSaga.bind(this)
        this.GetSagaRelated = this.GetSagaRelated.bind(this)
        this.GetGenresBook = this.GetGenresBook.bind(this)
        this.GetRating = this.GetRating.bind(this)
        this.GetComments = this.GetComments.bind(this)
        this.AddRating = this.AddRating.bind(this)
        this.FormRating = this.FormRating.bind(this)
        this.Comments = this.Comments.bind(this)
        this.AddComment = this.AddComment.bind(this)
        this.GetCelebrities = this.GetCelebrities.bind(this)
        this.OrderGenres = this.OrderGenres.bind(this)
        this.BookInfo = this.BookInfo.bind(this)
        this.SagaMovieInfo = this.SagaMovieInfo.bind(this)
        this.SagaGameInfo = this.SagaGameInfo.bind(this)
        this.SagaSeriesInfo = this.SagaSeriesInfo.bind(this)
        this.SagaBookInfo = this.SagaBookInfo.bind(this)
        this.CelebritiesInfo = this.CelebritiesInfo.bind(this)
        this.VideosInfo = this.VideosInfo.bind(this)
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            book: undefined,
            publishingCompany: undefined,
            saga: undefined,
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
                this.GetPublishingCompany(res.result[0].publishingcompanyid)
                this.GetSaga(res.result[0].sagaid)
                this.GetGenresBook(res.result[0].id)
                this.GetRating(res.result[0].id)
                this.GetComments(res.result[0].id)
                this.GetCelebrities(res.result[0].id)
            } else {
                this.setState({ book: undefined })
                this.props.history.push('/noMatch')
            }
        })
    }
    BookInfo = () => {
        let title = this.state.book ? ReplaceComa(this.state.book.title) : null
        let releaseDate = this.state.book ? this.state.book.releasedate.substring(0,10) : null
        let publishingCompany = this.state.publishingCompany ? this.state.publishingCompany.name : null
        let synopsis = this.state.book ? ReplaceComa(this.state.book.synopsis) : null
        let saga = this.state.saga ? this.state.saga.name : null
        let genres = this.state.genresBook ? this.OrderGenres() : 'Sem géneros associados'
        let rating = this.state.rating ? this.state.rating.avg : null
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <Row><h2>{ title }</h2></Row>
                        <Row><span className="sub-title">Data de lançamento: { releaseDate } | Editora: { publishingCompany } | Saga: { saga }</span></Row>
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
    GetPublishingCompany = (value) => {
        let searchData = [ { table: 'PublishingCompany', fieldData: [
            {field: 'id', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) this.setState({ publishingCompany: res.result[0] })
            else {
                this.setState({ publishingCompany: undefined })
            }
        })
    }
    GetSaga = (value) => {
        let searchData = [ { table: 'Saga', fieldData: [
            {field: 'id', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) {
                this.setState({ saga: res.result[0] })
                this.GetSagaRelated(value)
            } else {
                this.setState({ saga: undefined })
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

    Comments = () => {
        if (!this.state.user) return (<p>É necessário uma conta para poder comentar e ver os comentários</p>)
        let listComments = []
        if( !this.state.comments || !this.state.comments[0]) listComments.push('Sem registos, seja o primeiro a comentar!')
        else {
            this.state.comments.forEach((v, i) => {
                let btnApagar = (v.userid === this.state.user.id) ? (<Button variant="danger" size="sm" onClick={this.DeleteComment}>Apagar</Button>) : null
                listComments.push(
                    <Row key={i}>
                        <Media>
                            <Media.Body>
                                    <h5>{v.name}</h5>
                                    <p>{v.comment}</p>
                            </Media.Body>
                            <Button variant="secondary" size="sm" onClick={() => {this.setState({ responseTo:v })}}>Comentar</Button>
                            {btnApagar}
                        </Media>
                    </Row>
                )
            })
        }
        return (
            <React.Fragment>
                <Form onSubmit={this.AddComment}>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12}>Comentário {JSON.stringify(this.state.responseTo)}</Form.Label>
                        <Col>
                            <Form.Control as="textarea" rows="4" className="noresize" ref={(input) => {this.comment = input}}/>
                        </Col>
                    </Form.Group>
                    <Row>
                        <Col>
                            <Button variant="primary" type="submit" block>Submit</Button>
                        </Col>
                    </Row>
                </Form>
                <br/>
                {listComments}
                <br/><br/>
            </React.Fragment>
        )
    }

    AddComment = (event) => {
        event.preventDefault()
        let searchData = [ { table: 'BookComments', fieldData: [
            {field: 'userEmail', data: this.state.user.email},
            {field: 'userPassword', data: this.state.user.password},
            {field: 'userId', data: this.state.user.id},
            {field: 'bookId', data: this.state.book.id},
            {field: 'comment', data: this.comment.value}
        ] } ]
        Create(searchData,(res) => {
            if(res.result) {
                this.GetComments(this.state.book.id)
            } else {
                this.setState({ celebritiesAssignment: undefined })
            }
        })
    }
    DeleteComment = () => {
        console.log('Delete was called')
    }

    SagaMovieInfo = () => {
        return(<SliderSagaRelated list={this.state.sagaMovie} href='Movie' header='Filmes da mesma saga'/>)
    }
    SagaGameInfo = () => {
        return(<SliderSagaRelated list={this.state.sagaGame} href='Game' header='Jogos da mesma saga'/>)
    }
    SagaSeriesInfo = () => {
        return(<SliderSagaRelated list={this.state.sagaSeries} href='Series' header='Séries da mesma saga'/>)
    }
    SagaBookInfo = () => {
        return(<SliderSagaRelated list={this.state.sagaBook} href='Book' header='Livros da mesma saga'/>)
    }

    CelebritiesInfo = () => {
        if(this.state.celebritiesAssignment) {
            return(
                <Row>
                    <p>Celebrities</p>
                </Row>
            )
        } else return (
            <Row><p>Não existem celebridades relacionadas.</p></Row>
        )
    }

    VideosInfo = () => {
        if(this.state.videos) {
            return(
                <Row>
                    <p>Videos</p>
                </Row>
            )
        } else return(
            <Row><p>Não existem Vídeos relacionadas.</p></Row>
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
                            <this.Comments />
                        </Tab>
                        <Tab eventKey="saga" title="Saga">
                            <br/>
                            <this.SagaBookInfo />
                            <this.SagaMovieInfo />
                            <this.SagaGameInfo />
                            <this.SagaSeriesInfo />
                        </Tab>
                        <Tab eventKey="celebrities" title="Celebridades">
                            <br/>
                            <this.CelebritiesInfo />
                        </Tab>
                        <Tab eventKey="videos" title="Vídeos">
                            <br/>
                            <this.VideosInfo />
                        </Tab>
                    </Tabs>
                </Container>
                <Footer />
            </React.Fragment>    
        )
    }
}
 
export default Book;