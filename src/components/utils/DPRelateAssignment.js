import React from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import Alert from './Alert'
import { ReplaceComa } from '../../scripts/utils'

const DPRelateAssignment = React.forwardRef((props, ref) => {
    if (props.list[0]) {
        let options = []
        props.list.forEach((element, i) => {
            let name = element.celebrityName ? ReplaceComa(element.celebrityName) : undefined
            let title = undefined
            title = element.bookTitle ? ReplaceComa(element.bookTitle) : title
            title = element.movieTitle ? ReplaceComa(element.movieTitle) : title
            title = element.gameTitle ? ReplaceComa(element.gameTitle) : title
            title = element.seriesTitle ? ReplaceComa(element.seriesTitle) : title
            let assignment = element.assignmentName ? ReplaceComa(element.assignmentName) : undefined
            let show = `Nome: ${name} | Título: ${title} | Função: ${assignment}`
            options.push(<option key={i} value={JSON.stringify(element)} >{show}</option>)
        })
        return (
            <Form.Group as={Row}> 
                <Form.Label column lg={12} xl={2}>{props.header}</Form.Label>
                <Col>
                    <Form.Control as="select" ref={ref} onChange={props.onChange} required>{options}</Form.Control> 
                </Col>
            </Form.Group>
        )
    } else return (<Alert visible={true} variant={'danger'} message={`Não existem ${props.header}, adicione uma.`} />)
})
export default DPRelateAssignment;