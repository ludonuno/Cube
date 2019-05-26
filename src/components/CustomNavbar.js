import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
// import { Get } from '../scripts/api'

class CustomNavbar extends Component {
    constructor() {
        super()
        this.SearchData = this.SearchData.bind(this)
    }

    SearchData = (event) => {
        event.preventDefault()
        if(this.dataToSearch.value !== "") {

            //Create object with the data to search and where to search, table name has to match exactly with API route
            // var whereToSearch = [
            //     { table: 'Series', fieldData: [ {field: 'title', data: this.dataToSearch.value} ] },
            //     { table: 'Book', fieldData: [ {field: 'title', data: this.dataToSearch.value} ] },
            //     { table: 'Movie', fieldData: [ {field: 'title', data: this.dataToSearch.value} ] },
            //     { table: 'Game', fieldData: [ {field: 'title', data: this.dataToSearch.value} ] },
            // ]
            
            //FIXME: Resolver e permitir que sejam feitas várias pesquisas
            // whereToSearch.forEach(element => {
            //     Get(element, (res) => {
            //         if(res.result) {
            //             console.log(res)
            //         } else {
            //             console.log('Não foram encontrados quais quer registos nas tabelas pedidas')
            //         }
            //     })
            // });

        }
    }

    render() { 
        return ( 
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Cube</Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="text-left"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Form inline onSubmit={this.SearchData} className="mb-3">
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" name="searchText" ref={(FormControl) => {this.dataToSearch = FormControl}}/>
                        <Button variant="outline-success" type="submit">Search</Button>
                    </Form>
                    <Nav className="mr-auto">
                        <Nav.Link href="/series/create">Create Series</Nav.Link>
                        <Nav.Link href="/book/create">Create Books</Nav.Link>
                        <Nav.Link href="/movie/create">Create Movies</Nav.Link>
                        <Nav.Link href="/game/create">Create Games</Nav.Link>
                        <Nav.Link href="/celebrity/create">Create Celebrities</Nav.Link>
                        <Nav.Link href="/user/create">Create user</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
         );
    }
}
 
export default CustomNavbar;