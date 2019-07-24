import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Update } from '../../scripts/api'
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

    UpdateBook = (event) => {
        event.preventDefault()
        if(this.props.bookList[0] && this.props.sagaList[0] && this.props.publishingCompanyList[0]) {
            let updateData = [
                { table: 'Book', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'id', data: JSON.parse(this.cbBook.value).id},
                    {field: 'title', data: this.title.value},
                    {field: 'releaseDate', data: this.releaseDate.value},
                    {field: 'synopsis', data: this.synopsis.value},
                    {field: 'publishingCompanyId', data: JSON.parse(this.cbPublishingCompany.value).id},
                    {field: 'sagaId', data: JSON.parse(this.cbSaga.value).id}
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

    SetBookToEdit = () => {
        this.SetBookFieldValues(JSON.parse(this.cbBook.value))
    }

    SetBookFieldValues = (book) => {
        if(book && this.cbPublishingCompany && this.cbSaga) {
            let title = book.title ? ReplaceComa(book.title) : null
            let releaseDate = book.releaseDate ? book.releaseDate.substring(0,10) : null
            let synopsis = book.synopsis ? ReplaceComa(book.synopsis) : null
            let publishingCompanyId = book.publishingCompanyId ? book.publishingCompanyId : null
            let sagaId = book.sagaId ? book.sagaId : null
            
            this.title.value = title
            this.releaseDate.value = releaseDate
            this.synopsis.value = synopsis
            this.cbPublishingCompany.value = JSON.stringify(this.props.publishingCompanyList.find((e) => { return e.id === publishingCompanyId }))
            this.cbSaga.value = JSON.stringify(this.props.sagaList.find((e) => { return e.id === sagaId }))
        }
    }

    render() {
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.UpdateBook} ref={(form) => this.formRef = form}>
                    <DropDown list={this.props.bookList} header={'Livros'} ref={(input) => this.cbBook = input} onChange={this.SetBookToEdit}/>
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
                    <DropDown list={this.props.publishingCompanyList} header={'Editora'} ref={(input) => this.cbPublishingCompany = input}/>
                    <DropDown list={this.props.sagaList} header={'Saga'} ref={(input) => this.cbSaga = input}/>
                    <Row>
                        <Col>
                            <Button variant="primary" type="submit" block>Atualizar</Button>
                        </Col>
                    </Row>
                </Form>
            </React.Fragment>
        )
    }
}
 
export default Book;