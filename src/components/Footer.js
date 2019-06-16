import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap'

const Footer = (props) => {
    return ( 
        <React.Fragment>
            <Jumbotron className="footer">
                <Container>
                    Isto é suposto ser o footer :)
                </Container>
            </Jumbotron>
        </React.Fragment>
    )
}
export default Footer;