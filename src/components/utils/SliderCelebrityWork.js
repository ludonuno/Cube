import React from 'react';
import { Carousel, Jumbotron, Col, Row, Badge } from 'react-bootstrap'

import { ReplaceComa } from '../../scripts/utils'

const SliderCelebrityWork = (props) => {
    if(props.list) {
        let toRender = []
        let howMany = undefined
        props.list.forEach((element, i) => {
            let id = undefined
            id = element.id ? element.id : id
            id = element.bookId ? element.bookId : id
            id = element.movieId ? element.movieId : id
            id = element.gameId ? element.gameId : id
            id = element.seriesId ? element.seriesId : id
            let title = undefined
            title = element.bookTitle ? ReplaceComa(element.bookTitle) : title
            title = element.movieTitle ? ReplaceComa(element.movieTitle) : title
            title = element.gameTitle ? ReplaceComa(element.gameTitle) : title
            title = element.seriesTitle ? ReplaceComa(element.seriesTitle) : title
            let releaseDate = 'Sem data de lançamento'
            releaseDate = element.bookReleaseDate ? element.bookReleaseDate.substring(0,10) : releaseDate
            releaseDate = element.movieReleaseDate ? element.movieReleaseDate.substring(0,10) : releaseDate
            releaseDate = element.gameReleaseDate ? element.gameReleaseDate.substring(0,10) : releaseDate
            releaseDate = element.seriesReleaseDate ? element.seriesReleaseDate.substring(0,10) : releaseDate
            toRender.push(
                <Carousel.Item key={i}>
                    <br/>
                    <Jumbotron className="info-slider" >
                        <Col >
                            <Row><a href={`/${props.href}/${id}`}><h5>{title}</h5></a></Row>
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
export default SliderCelebrityWork;