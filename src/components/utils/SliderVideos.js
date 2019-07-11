import React from 'react';
import { Carousel, Jumbotron, Col, Row } from 'react-bootstrap'

import { GetVideoId } from '../../scripts/utils'

const SliderVideos = (props) => {
    if(props.list) {
        let toRender = []
        let howMany = undefined
        props.list.forEach((v, i) => {
            let link = v.link ? GetVideoId(v.link) : null
            let id = v.id ? v.id : null
            toRender.push(
                <Carousel.Item key={i}>
                    <br/>
                    <Jumbotron className="info-slider" >
                    <div className="embed-responsive embed-responsive-16by9">
                        <iframe className="embed-responsive-item" src={`https://www.youtube.com/embed/${link}`} title={id} allowFullScreen></iframe>
                    </div>
                    </Jumbotron>
                </Carousel.Item>
            )
            howMany = i
        })
        return(
            <Row>
                <Col lg={12}>
                    <Carousel controls={ howMany ? true : false } indicators={ howMany ? true : false } interval={null}>
                        {toRender}
                    </Carousel>
                </Col>
            </Row>
        )
    } else return <p>Sem videos associadas</p>
}
export default SliderVideos;