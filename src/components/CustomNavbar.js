import React, { Component } from 'react';
import { Navbar, NavDropdown } from 'react-bootstrap'

class CustomNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined
        }
    }

    logOut = () => {
        localStorage.removeItem('user')
        if(this.props.props.history.location.pathname === "/")
            this.setState({ user: undefined })
        else
            this.props.props.history.push('/')
    }

    UserFields = () => {
        if(this.state.user) {
            return (
                <NavDropdown title={this.state.user.name} id="basic-nav-dropdown" > 
                    <NavDropdown.Item href="/user/page">Perfil</NavDropdown.Item>
                    <this.CanUserEdit />
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={this.logOut}>Sair</NavDropdown.Item>
                </NavDropdown>
            )
        } else {
            return (
                <div>
                    <a href="/user/login" className="btn btn-outline-primary">LogIn</a> <a href="/user/create" className="btn btn-outline-success">Registar</a>
                </div>
            )
        }
    }
    
    CanUserEdit = () => {
        if(this.state.user.canedit) {
            return (
                <React.Fragment>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/create">Adicionar</NavDropdown.Item>
                    <NavDropdown.Item href="/#">Atualizar</NavDropdown.Item>
                    <NavDropdown.Item href="/#">Apagar</NavDropdown.Item>
                </React.Fragment>
            )
        } else {
            return (null)
        }
    }

    render() {
        return ( 
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand href="/">Cube</Navbar.Brand>
                <div className="align-right">
                    <this.UserFields />
                </div>
            </Navbar>
        )
    }
}
 
export default CustomNavbar;
