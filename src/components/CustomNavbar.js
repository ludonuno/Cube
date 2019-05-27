import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

const CustomNavbar = (props) => {
    return ( 
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Cube</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="text-left"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/series">Series</Nav.Link>
                    <Nav.Link href="/book">Book</Nav.Link>
                    <Nav.Link href="/movie">Movie</Nav.Link>
                    <Nav.Link href="/game">Game</Nav.Link>
                    <NavDropdown title="Create" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/series/create">Create Series</NavDropdown.Item>
                        <NavDropdown.Item href="/book/create">Create Book</NavDropdown.Item>
                        <NavDropdown.Item href="/movie/create">Create Movie</NavDropdown.Item>
                        <NavDropdown.Item href="/game/create">Create Game</NavDropdown.Item>
                        <NavDropdown.Item href="/celebrity/create">Create Celebrity</NavDropdown.Item>
                        <NavDropdown.Item href="/user/create">Create User</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#">#</NavDropdown.Item>
                    </NavDropdown>
                    
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
 
export default CustomNavbar;