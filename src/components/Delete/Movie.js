import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Delete } from '../../scripts/api'
import { ReplaceComa } from '../../scripts/utils'
import Alert from '../utils/Alert'
import DropDown from '../utils/DP'

class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' }
        }
    }

    componentDidUpdate() {
        if(this.props.movieList[0]) this.SetMovieFieldValues(this.props.movieList[0])
        else this.SetMovieFieldValues({})
    }

    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })

    DeleteMovie = (event) => {
        event.preventDefault()
        if(this.props.movieList[0]) {
            let deleteData = [
                { table: 'Movie', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'id', data: JSON.parse(this.cbDelete.value).id}
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

    SetMovieFieldValues = (movie) => {
        if(movie) {
            let title = movie.title ? ReplaceComa(movie.title) : null
            let releaseDate = movie.releaseDate ? movie.releaseDate.substring(0,10) : null
            let duration = movie.duration ? movie.duration : null
            let synopsis = movie.synopsis ? ReplaceComa(movie.synopsis) : null
            let sagaName = movie.sagaName ? ReplaceComa(movie.sagaName) : null
            let parentAdvisoryRate = movie.parentAdvisoryRate ? ReplaceComa(movie.parentAdvisoryRate) : null
            this.title.value = title
            this.releaseDate.value = releaseDate
            this.duration.value = duration
            this.synopsis.value = synopsis
            this.saga.value = sagaName
            this.parentAdvisory.value = parentAdvisoryRate
        }
    }

    LoadDataToFields = () => {
        this.SetMovieFieldValues(JSON.parse(this.cbDelete.value))
    }
    
    render() {
        return ( 
            <React.Fragment>
                <br/>   
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.DeleteMovie} ref={(form) => this.formRef = form}>
                    <DropDown header={'Filmes'} list={this.props.movieList} onChange={this.LoadDataToFields} ref={(input) => this.cbDelete = input} />
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
                        <Form.Label column lg={12} xl={2}>Duração</Form.Label>
                        <Col>
                            <Form.Control type="number" defaultValue="0" min="0" max="400" ref={(input) => {this.duration = input}} disabled/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Sinópse</Form.Label>
                        <Col>
                            <Form.Control as="textarea" rows="4" className="noresize" ref={(input) => {this.synopsis = input}} disabled/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Acon. Parental</Form.Label>
                        <Col>
                            <Form.Control type="text" ref={(input) => {this.parentAdvisory = input}} disabled/> 
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
        );
    }
}
 
export default Movie;