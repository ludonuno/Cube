import React from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import Alert from './utils/Alert'

const SagaCb = (props) => {
    if (props.list[0]) {
        let options = []
        props.list.forEach((element) => {
            options.push(<option key={element.id} value={element.id}>{element.name}</option>)
        })
        return (
            <Form.Group>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>Lista de Editoras</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control as="select" onChange={props.ChangePublisherValue} required>
                        {options}
                    </Form.Control>
                </InputGroup>
            </Form.Group>
        )
    } else return (<Alert visible={true} variant={'danger'} message={'Não existem editoras, adicione uma.'} />)
}
export default SagaCb;