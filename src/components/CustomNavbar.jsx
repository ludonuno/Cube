import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'

import './CustomNavbar.css'

const formValid = formErrors => {
    let valid = true;

    Object.values(formErrors).forEach(val => {
        val.lenght > 0 && (valid = false)
    })

    return valid
}

class CustomNavbar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            searchText: null,
            formErrors: {
                searchText: ""
            }
        }
    }

    handleSearch = e => {
        e.preventDefault()

        if(formValid(this.state.formErrors)) {
            console.log(`Search text: ${this.state.searchText}`)
        } else {
            console.error('')
        }
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target
        //utilizar estes valores para pesquisar
        //console.log(name, value)
    }

    render() { 
        return ( 
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Cube</Navbar.Brand>
                <Form inline onSubmit={this.handleSearch}>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" name="searchText" onChange={this.handleChange}/>
                    <Button variant="outline-success" type="submit">Search</Button>
                </Form>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="text-left"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/series">Series</Nav.Link>
                        <Nav.Link href="/livros">Livros</Nav.Link>
                        <Nav.Link href="/filmes">Filmes</Nav.Link>
                        <Nav.Link href="/jogos">Jogos</Nav.Link>
                        <Nav.Link href="/pessoas">Pessoas</Nav.Link>
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