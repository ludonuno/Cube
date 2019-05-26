import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap'
import { Create, Get } from '../scripts/api'

import Alert from './utils/Alert'

import Navbar from './CustomNavbar'
import PublishingCompanyForm from './PublishingCompanyForm'
import SagaForm from './SagaForm'

class CreateBookForm extends Component {

    constructor(props) {
        super(props);
        this.AddBook = this.AddBook.bind(this)
        this.GetPublisherList = this.GetPublisherList.bind(this)
        this.GetSagaList = this.GetSagaList.bind(this)
        this.state = {
            inserted: {
                hasInserted: false,
                message: '',
                variant: ''
            },
            publishingCompanyList: [],
            sagaList: [],
            publishingCompanyId: '',
            sagaId: ''
        }
    }
    
    AddBook = (event) => {
        event.preventDefault()
        //userEmail, userPassword, title, photo, releaseDate, synopsis, publishingCompanyId, sagaId,
        let insertData = [
            { table: 'Book', fieldData: [ 
                {field: 'userEmail', data: this.email.value},
                {field: 'userPassword', data: this.password.value},
                {field: 'title', data: this.title.value},
                {field: 'sagaId', data: this.state.sagaId},
                {field: 'publishingCompanyId', data: this.state.publishingCompanyId}
            ] }
        ]

        let inserted = {...this.state.inserted}
        inserted = {
            visible: true,
            message: 'A ligar ao servidor...',
            variant: 'info'
        }
        this.setState({ inserted })

        Create(insertData, (res) => {
            console.log(res, 'CreateBook')
            if(res.error) {
                let inserted = {...this.state.inserted}
                inserted = {
                    visible: true,
                    message: `${res.error}`,
                    variant: 'danger'
                }
                this.setState({ inserted })
            } else {
                let inserted = {...this.state.inserted}
                inserted = {
                    visible: true,
                    message: `${res.result.message}`,
                    variant: 'success'
                }
                this.setState({ inserted })
            }
        })
    }
    
    SetPublisherValue = (value) => {
        let publishingCompanyId = {...this.state.publishingCompanyId}
        publishingCompanyId = value
        this.setState({ publishingCompanyId })
    }

    SetSagaValue = (value) => {
        let sagaId = {...this.state.sagaId}
        sagaId = value
        this.setState({ sagaId })
    }
    
    ChangePublisherValue = (event) => {
        this.SetPublisherValue(Number(event.target.value))
    }

    ChangeSagaValue = (event) => {
        this.SetSagaValue(Number(event.target.value))
    }
    
    GetPublisherList = () => {
        let searchData = [
            { table: 'PublishingCompany', fieldData: undefined }
        ]
        Get(searchData,(res) => {
            if(res.result) {
                let publishingCompanyList = [...this.state.publishingCompanyList]
                publishingCompanyList = res.result
                this.setState({ publishingCompanyList })
            }  
        })
    }

    GetSagaList = () => {
        let searchData = [
            { table: 'Saga', fieldData: undefined }
        ]
        Get(searchData,(res) => {
            if(res.result) {
                let sagaList = [...this.state.sagaList]
                sagaList = res.result
                this.setState({ sagaList })
            }  
        })
    }

    componentDidMount() {
        this.GetPublisherList()
        this.GetSagaList()
        //FIXME: Se não houver valores da BD ele mete 1 na mesma
        this.SetPublisherValue(1)
        this.SetSagaValue(1)
    }

    PublisherOptions = () => {
        let options = []
        this.state.publishingCompanyList.forEach((element) => {
            options.push(<option key={element.id} value={element.id}>{element.name}</option>)
        })
        return (options)
    }
    
    SagaOptions = () => {
        let options = []
        this.state.sagaList.forEach((element) => {
            options.push(<option key={element.id} value={element.id}>{element.name}</option>)
        })
        return (options)
    }

    render() {
        return ( 
            <React.Fragment>
                <Navbar/>
                <PublishingCompanyForm GetPublisherList={this.GetPublisherList} />
                <hr/>
                <SagaForm GetSagaList={this.GetSagaList} />
                <hr/>
                <Container>
                    <h3>Create Book</h3>
                    <Alert variant={this.state.inserted.variant} message={this.state.inserted.message} visible={this.state.inserted.visible} />
                    <Form onSubmit={this.AddBook}>
                        <Alert variant="success" message="Registo inserido com sucesso" visible={this.state.dataInserted} />
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" ref={(email) => {this.email = email}} required/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" ref={(password) => {this.password = password}} required/>
                        </Form.Group>
                        
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Title" ref={(title) => {this.title = title}} required/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Lista de Editoras</Form.Label>
                            <Form.Control as="select" onChange={this.ChangePublisherValue} required>
                                <this.PublisherOptions />
                            </Form.Control>
                        </Form.Group>
                        
                        <Form.Group>
                            <Form.Label>Lista de Sagas</Form.Label>
                            <Form.Control as="select" onChange={this.ChangeSagaValue} required>
                                <this.SagaOptions />
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Container>
            </React.Fragment>
        );
    }
}
 
export default CreateBookForm;