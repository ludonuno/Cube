import React, { Component } from 'react'
import { Container, Form } from 'react-bootstrap'

import Navbar from './CustomNavbar'

//Faz as pesquisas aqui que depois são direcionadas para as respetivas páginas

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined
        }
    }
    render() { 
        return (
            <React.Fragment>
                <Navbar props={this.props}/>
                <Container>
                    <Form>
                        ola
                    </Form>
                </Container>
            </React.Fragment>
        );
    }
}
 
export default Home;