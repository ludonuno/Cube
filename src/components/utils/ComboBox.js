import React from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import Alert from './Alert'
import { ReplaceComa } from '../../scripts/utils'

const SagaCb = (props) => {
    if (props.list[0]) {
        let options = []
        props.list.forEach((element) => {
            options.push(<option key={element.id} value={element.id}>{element.name ? ReplaceComa(element.name) : ReplaceComa(element.rate)}</option>)
        })
        return (
            <Form.Group>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>{props.header}</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control as="select" onChange={props.onChange} required>
                        {options}
                    </Form.Control>
                </InputGroup>
            </Form.Group>
        )
    } else return (<Alert visible={true} variant={'danger'} message={`Não existem ${props.header}, adicione uma.`} />)
}
export default SagaCb;