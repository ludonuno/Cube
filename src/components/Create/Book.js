import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Create } from '../../scripts/api'
import Alert from '../utils/Alert'
import DropDown from '../utils/DP'

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' }
        }
    }

    componentDidUpdate() {
        this.formRef.reset()
    }
    
    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })

    AddBook = (event) => {
        event.preventDefault()
        if(this.props.sagaList[0] && this.props.publishingCompanyList[0]) {
            let insertData = [
                { table: 'Book', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'title', data: this.title.value},
                    {field: 'releaseDate', data: this.releaseDate.value},
                    {field: 'synopsis', data: this.synopsis.value},
                    {field: 'publishingCompanyId', data: JSON.parse(this.cbEditora.value).id},
                    {field: 'sagaId', data: JSON.parse(this.cbSaga.value).id}
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Create(insertData, (res, rej) => {
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
    

    render() {
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.AddBook} ref={(form) => this.formRef = form}>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Título</Form.Label>
                        <Col>
                            <Form.Control type="text" ref={(input) => {this.title = input}} required/> 
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Data</Form.Label>
                        <Col>
                            <Form.Control type="date" ref={(input) => {this.releaseDate = input}}/> 
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Sinópse</Form.Label>
                        <Col>
                            <Form.Control as="textarea" rows="4" className="noresize" ref={(input) => {this.synopsis = input}}/> 
                        </Col>
                    </Form.Group>
                    <DropDown list={this.props.publishingCompanyList} header={'Editora'} ref={(input) => this.cbEditora = input} />
                    <DropDown list={this.props.sagaList} header={'Saga'} ref={(input) => this.cbSaga = input} />
                    <Row>
                        <Col>
                            <Button variant="success" type="submit" block>Adicionar</Button>
                        </Col>
                    </Row>
                </Form>
            </React.Fragment>
        )
    }
}
 
export default Book;