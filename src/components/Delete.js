import React, { Component } from 'react'
import { Tabs, Tab, Container } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { Get } from '../scripts/api'

import Navbar from './CustomNavbar'

// import CreateBook from './Delete/CreateBook'
// import CreateCelebrity from './Delete/CreateCelebrity'
// import CreateCelebrityAssignment from './Delete/CreateCelebrityAssignment'
// import CreateGame from './Delete/CreateGame'
// import CreateMovie from './Delete/CreateMovie'
// import CreateSeries from './Delete/CreateSeries'

// import CreateAssignment from './Delete/SecondaryForms/CreateAssignment'
// import CreateCompany from './Delete/SecondaryForms/CreateCompany'
// import CreateEngine from './Delete/SecondaryForms/CreateEngine'
// import CreateParentAdvisory from './Delete/SecondaryForms/CreateParentAdvisory'
// import CreatePublishingCompany from './Delete/SecondaryForms/CreatePublishingCompany'
// import CreateSaga from './Delete/SecondaryForms/CreateSaga'


class Delete extends Component {
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
            sagaList: []
        }
    }
    componentDidMount() {
        this.GetPublisherList()
        this.GetEngineList()
        this.GetCompanyList()
        this.GetParentAdvisoryList()
        this.GetSagaList()
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
                        <Tab eventKey="book" title="Book"><CreateBook
                            publishingCompanyList={this.state.publishingCompanyList}
                            sagaList={this.state.sagaList}
                            onSubmit={this.GetPublisherList}
                        /></Tab>
                        <Tab eventKey="game" title="Game"><CreateGame
                            engineList={this.state.engineList}
                            companyList={this.state.companyList}
                            parentAdvisoryList={this.state.parentAdvisoryList}
                            sagaList={this.state.sagaList}
                            onSubmit={this.GetEngineList}
                        /></Tab>
                        <Tab eventKey="movie" title="Movie"><CreateMovie
                            parentAdvisoryList={this.state.parentAdvisoryList}
                            sagaList={this.state.sagaList}
                            onSubmit={this.GetParentAdvisoryList}
                        /></Tab>
                        <Tab eventKey="series" title="Series"><CreateSeries
                            parentAdvisoryList={this.state.parentAdvisoryList}
                            sagaList={this.state.sagaList}
                            onSubmit={this.GetParentAdvisoryList}
                        /></Tab>
                        <Tab eventKey="parentAdvisory" title="Parent Advisory"><CreateParentAdvisory
                            parentAdvisoryList={this.state.parentAdvisoryList}
                            onSubmit={this.GetParentAdvisoryList}
                        /></Tab>
                        <Tab eventKey="company" title="Company"><CreateCompany
                            companyList={this.state.companyList}
                            onSubmit={this.GetCompanyList}
                        /></Tab>
                        <Tab eventKey="engine" title="Engine"><CreateEngine
                            engineList={this.state.engineList}
                            onSubmit={this.GetEngineList}
                        /></Tab>
                        <Tab eventKey="publishingCompany" title="Publishing Company"><CreatePublishingCompany
                            publishingCompanyList={this.state.publishingCompanyList}
                            onSubmit={this.GetPublisherList}
                        /></Tab>
                        <Tab eventKey="saga" title="Saga"><CreateSaga
                            sagaList={this.state.sagaList}
                            onSubmit={this.GetSagaList}
                        /></Tab>
                        <Tab eventKey="celebrity" title="Celebrity"><CreateCelebrity/></Tab>
                        <Tab eventKey="assignment" title="Assignment"><CreateAssignment
                            assignmentList={this.state.assignmentList}
                            onSubmit={this.GetAssignmentList}
                        /></Tab>
                    </Tabs>
                </Container>
            </React.Fragment>
        )
    }
}
 
export default Delete;