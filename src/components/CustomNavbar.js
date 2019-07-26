import React, { Component } from 'react';
import { Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

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
                    <NavDropdown.Item><Link to="/user/page">Perfil</Link></NavDropdown.Item>
                    <this.CanUserEdit />
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={this.logOut}>Sair</NavDropdown.Item>
                </NavDropdown>
            )
        } else {
            return (
                <div>
                    <Link to="/user/login"><div className="btn btn-outline-primary">Login</div></Link>
                    <Link to="/user/create"><div className="btn btn-outline-success">Registar</div></Link>
                </div>
            )
        }
    }
    
    CanUserEdit = () => {
        if(this.state.user.canedit) {
            return (
                <React.Fragment>
                    <NavDropdown.Divider />
                    <NavDropdown.Item><Link to="/create">Adicionar</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link to="/update">Atualizar</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link to="/delete">Apagar</Link></NavDropdown.Item>
                </React.Fragment>
            )
        } else {
            return (null)
        }
    }

    render() {
        return ( 
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand><Link to="/">Cube</Link></Navbar.Brand>
                <div className="align-right">
                    <this.UserFields />
                </div>
            </Navbar>
        )
    }
}
 
export default CustomNavbar;
