import React from 'react'
import { Row, Col, Form } from 'react-bootstrap'

const DropDown = React.forwardRef((props, ref) => {
    return (
        <Form.Group as={Row}> 
            <Form.Label column lg={12} xl={2}>{props.header}</Form.Label>
            <Col>
                <Form.Control as="select" ref={ref} onChange={props.onChange} required></Form.Control> 
            </Col>
        </Form.Group>
    )
})
export default DropDown;