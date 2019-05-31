import React, { Component } from 'react'
import { Tabs, Tab, Container } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

import Navbar from './CustomNavbar'
import CreateBook from './Create/CreateBook'
import CreateGame from './Create/CreateGame'
import CreateMovie from './Create/CreateMovie'
import CreateSeries from './Create/CreateSeries'
import CreateCelebrity from './Create/CreateCelebrity'
import CreateAssignment from './Create/CreateAssignment'


class Create extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            key: 'book',
        }
    }
    
    render() { 
        if(!this.state.user.canedit) {
            return (<Redirect to='/noMatch' />)
        }
        return (
            <React.Fragment>
                <Navbar props={this.props} />
                <Container>
                    <Tabs id="controlled-tab-example" activeKey={this.state.key} onSelect={key => this.setState({ key })}>
                        <Tab eventKey="book" title="Book"><CreateBook /></Tab>
                        <Tab eventKey="game" title="Game"><CreateGame /></Tab>
                        <Tab eventKey="movie" title="Movie"><CreateMovie /></Tab>
                        <Tab eventKey="series" title="Series"><CreateSeries /></Tab>
                        <Tab eventKey="celebrity" title="Celebrity"><CreateCelebrity /></Tab>
                        <Tab eventKey="assignment" title="Assignment"><CreateAssignment /></Tab>
                    </Tabs>
                </Container>
            </React.Fragment>
        )
    }
}
 
export default Create;