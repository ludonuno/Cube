import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

class CustomNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user'))
        }
    }

    componentDidMount() {
        console.log(this.state.user)
    }
    
    UserFields = () => {
        if(this.state.user) {
            return (
                <div>User Fields</div>
            )
        } else {
            return (
                <div>
                    <a href="/user/login" className="btn btn-outline-primary">LogIn</a> / <a href="/user/create" className="btn btn-outline-success">Registar</a>
                </div>
            )
        }
    }
    
    UserNavbar = () => {
        if(this.state.user) {
            return (
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
            )
        } else {
            return (null)
        }
        
    }

    render() {
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
                        <this.UserNavbar />
                    </Nav>
                    <div>
                        <this.UserFields />
                    </div>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
 
export default CustomNavbar;
