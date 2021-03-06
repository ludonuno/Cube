import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Delete } from '../../scripts/api'
import Alert from '../utils/Alert'
import { ReplaceComa } from '../../scripts/utils'
import DropDown from '../utils/DP'

class Genres extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' }
        }
    }
    
    componentDidUpdate() {
        this.formRef.reset()
        if(this.props.genresList[0]) this.SetGenresFieldValues(this.props.genresList[0])
        else this.SetGenresFieldValues({})
    }

    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })

    DeleteGenre = (event) => {
        event.preventDefault()
        if(this.props.genresList[0]) {
            let deleteData = [
                { table: 'Genres', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'id', data: JSON.parse(this.cbDelete.value).id}
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao servidor...', 'info')
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

    SetGenresFieldValues = (genre) => {
        if(genre) {
            let genero = genre.genre ? ReplaceComa(genre.genre) : null
            this.genre.value = genero
        }
    }

    LoadDataToFields = () => {
        this.SetGenresFieldValues(JSON.parse(this.cbDelete.value))
    }

    render() {
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.DeleteGenre} ref={(form) => this.formRef = form}>
                    <DropDown header={'Géneros'} list={this.props.genresList} onChange={this.LoadDataToFields} ref={(input) => this.cbDelete = input} />
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Género</Form.Label>
                        <Col>
                            <Form.Control type="text" ref={(input) => {this.genre = input}} disabled/> 
                        </Col>
                    </Form.Group>
                    <Row>
                        <Col>
                            <Button variant="danger" type="submit" block>Apagar</Button>
                        </Col>
                    </Row>
                </Form>
            </React.Fragment>
        );
    }
}
export default Genres;