import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import { Get } from '../../scripts/api'

import Navbar from '../CustomNavbar'
class Company extends Component {
    constructor(props) {
        super(props);
        this.GetGameList = this.GetGameList.bind(this)
        this.state = { 
            pageName: window.location.pathname.replace( new RegExp('/company/([0-9])+/', 'g'), ""),
            gamesList: [],
            developersList: []
        }
    }
    componentDidMount() {
        
    }
    GetGameList = (value) => {
        let searchData = [ { table: 'Company', fieldData: [
            {field: 'name', data: value},
        ] } ]
        Get(searchData,(res) => {
            if(res && res.result) this.setState({ companyList: res.result }) 
            else  this.setState({ companyList: [] })
        })
    }
    render() {
        return ( 
            <React.Fragment>
                <Navbar props={this.props} />
                <Container>
                    {this.state.pageName}
                </Container>
            </React.Fragment>
        )
    }
}
 
export default Company;