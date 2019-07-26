import React from 'react';
import { Carousel, Jumbotron, Col, Row, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ReplaceComa } from '../../scripts/utils'

const SliderSagaRelated = (props) => {
    if(props.list) {
        let toRender = []
        let howMany = undefined
        props.list.forEach((v, i) => {
            let id = v.id ? v.id : undefined
            let title = v.title ? ReplaceComa(v.title) : undefined
            let releaseDate = v.releasedate ? v.releasedate.substring(0,10) : 'Sem data de lançamento'
            toRender.push(
                <Carousel.Item key={i}>
                    <br/>
                    <Jumbotron className="info-slider" >
                        <Col >
                            <Row><Link to={`/${props.href}/${id}`}><h5>{title}</h5></Link></Row>
                            <Row><span className="sub-title">{releaseDate}</span></Row>
                            <Row><h5><Badge variant="secondary">#{i+1}/{props.list.length}</Badge></h5></Row>
                        </Col>
                    </Jumbotron>
                </Carousel.Item>
            )
            howMany = i
        })
        return(
            <Row>
                <Col lg={12}>
                    <Row><h5>{props.header}</h5></Row>
                    <Carousel controls={ howMany ? true : false } indicators={ howMany ? true : false }>
                        {toRender}
                    </Carousel>
                </Col>
            </Row>
        )
    } else return null
}
export default SliderSagaRelated;