import React from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import Alert from './Alert'
import { ReplaceComa } from '../../scripts/utils'

const DPDevelopers = React.forwardRef((props, ref) => {
    if (props.list[0]) {
        let options = []
        props.list.forEach((element) => {
            let title  = undefined, name = undefined
            title = element.title ? ReplaceComa(element.title) : title
            name = element.name ? ReplaceComa(element.name) : name
            let show = `${title} | ${name}`
            
            options.push(<option key={element.id} value={JSON.stringify(element)} >{show}</option>)
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
export default DPDevelopers;