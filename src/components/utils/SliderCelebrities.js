import React from 'react';
import { Carousel, Jumbotron, Col, Row, Badge } from 'react-bootstrap'
import { ReplaceComa } from '../../scripts/utils'

const SliderCelebrities = (props) => {
    if(props.list) {
        let toRender = []
        let howMany = undefined
        props.list.forEach((v, i) => {
            let id = v.id ? v.id : undefined
            let name = v.name ? ReplaceComa(v.name) : undefined
            let birthday = v.birthday ? v.birthday.substring(0,10) : 'Sem aniversário'
            toRender.push(
                <Carousel.Item key={i}>
                    <br/>
                    <Jumbotron className="info-slider" >
                        <Col>
                            <Row><a href={`/${props.href}/${id}`}><h5>{name}</h5></a></Row>
                            <Row><span className="sub-title">{birthday}</span></Row>
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
    } else return <p>Sem celebridades associadas</p>
}
export default SliderCelebrities;