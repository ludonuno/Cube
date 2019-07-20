import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Delete } from '../../scripts/api'
import { ReplaceComa } from '../../scripts/utils'

import Alert from '../utils/Alert'
import ComboBox from '../utils/ComboBox'

class Movie extends Component {
    constructor(props) {
        super(props);
        this.ChangeAlert = this.ChangeAlert.bind(this)
        this.DeleteMovie = this.DeleteMovie.bind(this)
        this.SetParentAdvisory = this.SetParentAdvisory.bind(this)
        this.SetSaga = this.SetSaga.bind(this)
        this.ResetForm = this.ResetForm.bind(this)
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' },
            parentAdvisoryId: undefined,
            sagaId: undefined,
            parentAdvisoryId: undefined,
            selectedMovie: undefined
        }
    }
    componentWillReceiveProps(){
        if(this.props.movieList[0])
        this.SetMovieFieldValues(this.props.movieList[0])
    }
    SetMovieFieldValues = (movie) => {
        this.setState({selectedMovie: movie})
        let title = (movie.title) ? ReplaceComa(movie.title) : null
        let releaseDate = (movie && movie.releasedate) ? movie.releasedate.substring(0,10) : null
        let duration = (movie && movie.duration) ? movie.duration : null
        let synopsis = (movie && movie.synopsis) ? ReplaceComa(movie.synopsis) : null
        let sagaId = (movie.sagaid) ? movie.sagaid : null
        let parentAdvisoryId = (movie.parentadvisoryid) ? movie.parentadvisoryid : null

        this.title.value = title
        this.releaseDate.value = releaseDate
        this.duration.value = duration
        this.synopsis.value = synopsis
        this.props.parentAdvisoryList.forEach(parentAdvisory => {if(parentAdvisory.id === parentAdvisoryId) this.parentAdvisory.value = ReplaceComa(parentAdvisory.rate)})
        this.props.sagaList.forEach(saga => {if(saga.id === sagaId) this.saga.value = ReplaceComa(saga.name)})
    }
    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })

    DeleteMovie = (event) => {
        event.preventDefault()
        if(this.props.movieList[0]) {
            let deleteData = [
                { table: 'Movie', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'id', data: this.state.selectedMovie.id}
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Delete(deleteData, (res, rej) => {
                if(res) {
                    if(res.error) {
                        this.ChangeAlert(true, res.error, 'danger')
                    } else {
                        this.ResetForm()
                        this.ChangeAlert(true, res.result.message, 'success')
                        this.props.onSubmit()
                        this.setState({selectedMovie: this.props.movieList[0]})
                    }
                } else {
                    this.ChangeAlert(true, `${rej}`, 'danger')
                }
            })
        } else {
            this.ChangeAlert(true, 'Por favor adicione os campos em falta', 'warning')
        }
    }

    SetMovieToEdit = (event) => {
        this.props.movieList.forEach(movie => {
            if(movie.id === Number(event.target.value)) {
                this.SetMovieFieldValues(movie)
            }
        })
    }

    SetParentAdvisory = (event) => {
        this.setState({ parentAdvisoryId: Number(event.target.value) })
    }

    SetSaga = (event) => {
        this.setState({ sagaId: Number(event.target.value) })
    }
    
    ResetForm = () => {
        this.formRef.reset()        
        this.setState({parentAdvisoryId: this.props.parentAdvisoryList[0] ? this.props.parentAdvisoryList[0].id : undefined})
        this.setState({sagaId: this.props.sagaList[0] ? this.props.sagaList[0].id : undefined})
    }
    
    render() {
        return ( 
            <React.Fragment>
                <br/>   
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.DeleteMovie} ref={(form) => this.formRef = form}>
                    <ComboBox header={'Filmes'} list={this.props.movieList} onChange={this.SetMovieToEdit} />
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