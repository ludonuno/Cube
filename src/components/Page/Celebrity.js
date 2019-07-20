import React, { Component } from 'react'
import { Container, Col, Row, Tabs, Tab } from 'react-bootstrap'

import Navbar from '../CustomNavbar'
import { Get } from '../../scripts/api'
import { ReplaceComa } from '../../scripts/utils'
import Footer from '../Footer';
import CelebrityWork from '../utils/CelebrityWork'

class Celebrity extends Component {
    constructor(props) {
        super(props);
        this.GetCelebrity = this.GetCelebrity.bind(this)
        this.CelebrityInfo = this.CelebrityInfo.bind(this)
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            celebrity: undefined,
            celebrityWorkGame: undefined,
            celebrityWorkMovie: undefined,
            celebrityWorkSeries: undefined,
            celebrityWorkBook: undefined
        }
    }

    componentDidMount() {
        this.GetCelebrity(this.props.match.params.id)
    }

    GetCelebrity = (value) => {
        let searchData = [ { table: 'Celebrity', fieldData: [
            {field: 'id', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res.result) {
                this.setState({ celebrity: res.result[0] })
                this.GetCelebrityWork(res.result[0].id)
            } else {
                this.setState({ celebrity: undefined })
                this.props.history.push('/noMatch')
            }
        })
    }

    GetCelebrityWork = (value) => {
        let searchDataMovie = [ { table: 'CelebrityAssignmentMovie', fieldData: [
            {field: 'celebrityId', data: value},
        ] } ]
        Get(searchDataMovie,(res) => {
            console.log('Movie', res)
            if(res.result) this.setState({ celebrityWorkMovie: res.result })
            else this.setState({ celebrityWorkMovie: undefined })
        })
        let searchDataGame = [ { table: 'CelebrityAssignmentGame', fieldData: [
            {field: 'celebrityId', data: value},
        ] } ]
        Get(searchDataGame,(res) => {
            console.log('Game', res)
            if(res.result) this.setState({ celebrityWorkGame: res.result })
            else this.setState({ celebrityWorkGame: undefined })
        })
        let searchDataSeries = [ { table: 'CelebrityAssignmentSeries', fieldData: [
            {field: 'celebrityId', data: value},
        ] } ]
        Get(searchDataSeries,(res) => {
            console.log('Series', res)
            if(res.result) this.setState({ celebrityWorkSeries: res.result })
            else this.setState({ celebrityWorkSeries: undefined })
        })
        let searchDataBook = [ { table: 'CelebrityAssignmentBook', fieldData: [
            {field: 'celebrityId', data: value},
        ] } ]
        Get(searchDataBook,(res) => {
            console.log('Book', res)
            if(res.result) this.setState({ celebrityWorkBook: res.result })
            else this.setState({ celebrityWorkBook: undefined })
        })
    }

    CelebrityInfo = () => {
        let name = this.state.celebrity ? ReplaceComa(this.state.celebrity.name) : 'Nome desconhecido'
        let birthday = (this.state.celebrity && this.state.celebrity.birthday) ? this.state.celebrity.birthday.substring(0,10) : 'Data de aniversário desconhecida'
        let biography = (this.state.celebrity && this.state.celebrity.biography) ? ReplaceComa(this.state.celebrity.biography) : 'Sínopse desconhecida'
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <Row><h2>{ name }</h2></Row>
                        <Row>
                            <span className="sub-title">Data de aniversário: { birthday }</span>
                        </Row>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Row><h4>Biografia</h4></Row>
                        <Row>
                            <span>{ biography }</span>
                        </Row>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }

    render() { 
        return ( 
            <React.Fragment>
                <Navbar props={this.props}/>
                <br/>
                <Container className="fullpage">
                    <this.CelebrityInfo />
                    <br/>
                    <Tabs defaultActiveKey="CelebrityWork" id="uncontrolled-tab-example">
                        <Tab eventKey="CelebrityWork" title="Trabalhos">
                            <br/>
                            <CelebrityWork CelebrityWorkMovie={this.state.celebrityWorkMovie} CelebrityWorkGame={this.state.celebrityWorkGame} CelebrityWorkSeries={this.state.celebrityWorkSeries} CelebrityWorkBook={this.state.celebrityWorkBook}/>
                        </Tab>
                    </Tabs>
                </Container>
                <Footer />
            </React.Fragment>    
        );
    }
}
 
export default Celebrity;