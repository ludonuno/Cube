import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Delete } from '../../scripts/api'
import { ReplaceComa } from '../../scripts/utils'
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
        if(this.props.bookList[0]) this.SetBookFieldValues(this.props.bookList[0])
        else this.SetBookFieldValues({})
    }

    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })

    DeleteBook = (event) => {
        event.preventDefault()
        if(this.props.bookList[0]) {
            let deleteData = [
                { table: 'Book', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'id', data: JSON.parse(this.cbDelete.value).id},
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Delete(deleteData, (res, rej) => {
                if(res) {
                    if(res.error) this.ChangeAlert(true, res.error, 'danger')
                    else {
                        this.formRef.reset()
                        this.props.onSubmit()
                        this.ChangeAlert(true, res.result.message, 'success')
                    }
                } else this.ChangeAlert(true, `${rej}`, 'danger')
            })
        } else this.ChangeAlert(true, `Não pode apagar registos se a lista estiver vazia, adiceone um registo no respectivo formulário.`, 'warning')
    }
    
    SetBookFieldValues = (book) => {
        if(book) {
            let title = book.title ? ReplaceComa(book.title) : null
            let releaseDate = book.releaseDate ? book.releaseDate.substring(0,10) : null
            let synopsis = book.synopsis ? ReplaceComa(book.synopsis) : null
            let publishingCompanyName = book.publishingCompanyName ? ReplaceComa(book.publishingCompanyName) : null
            let sagaName = book.sagaName ? ReplaceComa(book.sagaName) : null
            this.title.value = title
            this.releaseDate.value = releaseDate
            this.synopsis.value = synopsis
            this.publishingCompany.value = publishingCompanyName
            this.saga.value = sagaName
        }
    }

    LoadDataToFields = () => {
        this.SetBookFieldValues(JSON.parse(this.cbDelete.value))
    }

    render() {
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.DeleteBook} ref={(form) => this.formRef = form}>
                    <DropDown header={'Livros'} list={this.props.bookList} onChange={this.LoadDataToFields} ref={(input) => this.cbDelete = input} />
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Título</Form.Label>
                        <Col>
                            <Form.Control type="text" ref={(input) => {this.title = input}} disabled/> 
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Data</Form.Label>
                        <Col>
                            <Form.Control type="date" ref={(input) => {this.releaseDate = input}} disabled/> 
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Sinópse</Form.Label>
                        <Col>
                            <Form.Control as="textarea" rows="4" className="noresize" ref={(input) => {this.synopsis = input}} disabled/> 
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Editora</Form.Label>
                        <Col>
                            <Form.Control type="text" ref={(input) => {this.publishingCompany = input}} disabled/> 
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Saga</Form.Label>
                        <Col>
                            <Form.Control type="text" ref={(input) => {this.saga = input}} disabled/> 
                        </Col>
                    </Form.Group>
                    <Row>
                        <Col>
                            <Button variant="danger" type="submit" block>Apagar</Button>
                        </Col>
                    </Row>
                </Form>
            </React.Fragment>
        )
    }
}
 
export default Book;