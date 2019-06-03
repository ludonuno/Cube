import React from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import Alert from './Alert'
import { ReplaceComa } from '../../scripts/utils'

const ComboBox = (props) => {
    if (props.list[0]) {
        let options = []
        props.list.forEach((element) => {
            let show = undefined
            show = element.name ? ReplaceComa(element.name) : show
            show = element.rate ? ReplaceComa(element.rate) : show
            show = element.assignment ? ReplaceComa(element.assignment) : show
            show = element.title ? ReplaceComa(element.title) : show
            options.push(<option key={element.id} value={element.id}>{show} {element.id}</option>)
        })
        return (
            <Form.Group as={Row}> 
                <Form.Label column lg={12} xl={2}>{props.header}</Form.Label>
                <Col>
                    <Form.Control as="select" onChange={props.onChange} required>{options}</Form.Control> 
                </Col>
            </Form.Group>
        )
    } else return (<Alert visible={true} variant={'danger'} message={`Não existem ${props.header}, adicione uma.`} />)
}
export default ComboBox;