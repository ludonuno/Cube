import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap'

const Footer = (props) => {
    return ( 
        <React.Fragment>
            <Jumbotron className="footer">
                <Container>
                    <p>Este projeto foi realizado por Nuno Ludovice, para a cadeira de Projeto Global do 3º ano da Licenciatura de Informática, esta teve a duração de um ano.</p>
                    <p>Durante este periodo foi realizada a aplicação de front-end (esta) feita com a tecnologia Reac.js e a aplicação back-end onde foi construida uma REST API de forma a responder ao objetivo do projeto.</p>
                    As duas aplicação formam todo o Projeto Global. Este tem o objetivo de apresentar uma forma de relacionar os Filmes, Séries, Jogos e Livros entre eles.
                </Container>
            </Jumbotron>
        </React.Fragment>
    )
}
export default Footer;