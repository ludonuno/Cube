import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Update } from '../../scripts/api'
import { ReplaceComa } from '../../scripts/utils'
import Alert from '../utils/Alert'
import ComboBox from '../utils/CB'

class Celebrity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' }
        }
    }
    
    componentDidUpdate() {
        this.formRef.reset()
        if(this.props.celebrityList[0]) this.SetCelebrityFieldValues(this.props.celebrityList[0])
        else this.SetCelebrityFieldValues({})
    }

    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })

    UpdateCelebrity = (event) => {
        event.preventDefault()
        if(this.props.celebrityList[0]) {
            let updateData = [
                { table: 'Celebrity', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'id', data: JSON.parse(this.cbCelebrity.value).id},
                    {field: 'name', data: this.name.value},
                    {field: 'birthday', data: this.birthday.value},
                    {field: 'biography', data: this.biography.value}
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Update(updateData, (res, rej) => {
                if(res) {
                    if(res.error) this.ChangeAlert(true, res.error, 'danger')
                    else {
                        this.formRef.reset()
                        this.props.onSubmit()
                        this.ChangeAlert(true, res.result.message, 'success')
                    }
                } else this.ChangeAlert(true, `${rej}`, 'danger')
            })
        } else this.ChangeAlert(true, 'Por favor adicione os campos em falta', 'warning')
    }

    SetCelebrityToEdit = () => {
        this.SetCelebrityFieldValues(JSON.parse(this.cbCelebrity.value))
    }

    SetCelebrityFieldValues = (celebrity) => {
        if(celebrity) {
            let name = celebrity.name ? ReplaceComa(celebrity.name) : null
            let birthday = celebrity.birthday ? celebrity.birthday.substring(0,10) : null
            let biography = celebrity.biography ? ReplaceComa(celebrity.biography) : null
            this.name.value = name
            this.birthday.value = birthday
            this.biography.value = biography
        }
    }

    render() {
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.UpdateCelebrity} ref={(form) => this.formRef = form}>
                    <ComboBox list={this.props.celebrityList} header={'Celebridades'} ref={(input) => this.cbCelebrity = input} onChange={this.SetCelebrityToEdit}/>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Nome</Form.Label>
                        <Col>
                            <Form.Control type="text" ref={(input) => {this.name = input}} required/> 
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Aniversário</Form.Label>
                        <Col>
                            <Form.Control type="date" ref={(input) => {this.birthday = input}} /> 
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Biografia</Form.Label>
                        <Col>
                            <Form.Control as="textarea" rows="4" className="noresize" ref={(input) => {this.biography = input}}/> 
                        </Col>
                    </Form.Group>
                    <Row>
                        <Col>
                            <Button variant="primary" type="submit" block>Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </React.Fragment>
        );
    }
}
 
export default Celebrity;