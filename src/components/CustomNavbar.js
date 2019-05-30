import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

class CustomNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined
        }
    }

    logOut = () => {
        localStorage.removeItem('user')
        this.props.props.history.push('/')
    }

    UserFields = () => {
        if(this.state.user) {
            return (
                <NavDropdown title={this.state.user.name} id="basic-nav-dropdown">
                    <NavDropdown.Item href="/user/page">Perfil</NavDropdown.Item>
                    <this.CanUserEdit />
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={this.logOut}>Logout</NavDropdown.Item>
                </NavDropdown>
            )
        } else {
            return (
                <div>
                    <a href="/user/login" className="btn btn-outline-primary">LogIn</a> / <a href="/user/create" className="btn btn-outline-success">Registar</a>
                </div>
            )
        }
    }
    
    CanUserEdit = () => {
        if(this.state.user.canedit) {
            return (<NavDropdown.Item href="/create">Create</NavDropdown.Item>)
        } else {
            return (null)
        }
        
    }

    CustomNavbarBrand = () => {
        if(!this.state.user) {
            return (<Navbar.Brand href="/">Cube</Navbar.Brand>)
        } else {
            let firstName = String(this.state.user.name).substr(0, String(this.state.user.name).indexOf(" "))
            return (<Navbar.Brand href="/">Bem vindo(a) {firstName}</Navbar.Brand>)
        }
    }

    render() {
        return ( 
            <Navbar bg="light" expand="lg">
                <this.CustomNavbarBrand />
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="text-left"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/series">Series</Nav.Link>
                        <Nav.Link href="/book">Book</Nav.Link>
                        <Nav.Link href="/movie">Movie</Nav.Link>
                        <Nav.Link href="/game">Game</Nav.Link>
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
