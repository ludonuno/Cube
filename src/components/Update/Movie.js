import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Update } from '../../scripts/api'
import { ReplaceComa } from '../../scripts/utils'

import Alert from '../utils/Alert'
import ComboBox from '../utils/CB'

class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' }
        }
    }

    componentDidUpdate() {
        this.formRef.reset()
        if(this.props.movieList[0]) this.SetMovieFieldValues(this.props.movieList[0])
        else this.SetMovieFieldValues({})
    }

    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })

    UpdateMovie = (event) => {
        event.preventDefault()
        if(this.props.movieList[0] && this.props.sagaList[0] && this.props.parentAdvisoryList[0]) {
            let updateData = [
                { table: 'Movie', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'id', data: JSON.parse(this.cbMovie.value).id},
                    {field: 'title', data: this.title.value},
                    {field: 'releaseDate', data: this.releaseDate.value},
                    {field: 'duration', data: this.duration.value},
                    {field: 'synopsis', data: this.synopsis.value},
                    {field: 'parentAdvisoryId', data: JSON.parse(this.cbParentAdvisory.value).id},
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

    SetMovieToEdit = () => {
        this.SetMovieFieldValues(JSON.parse(this.cbMovie.value))
    }

    SetMovieFieldValues = (movie) => {
        if(movie && this.cbParentAdvisory && this.cbSaga) {
            let title = movie.title ? ReplaceComa(movie.title) : null
            let releaseDate = movie.releasedate ? movie.releasedate.substring(0,10) : null
            let duration = movie.duration ? movie.duration : null
            let synopsis = movie.synopsis ? ReplaceComa(movie.synopsis) : null
            let parentAdvisoryId = movie.parentadvisoryid ? movie.parentadvisoryid : null
            let sagaId = movie.sagaid ? movie.sagaid : null
            this.title.value = title
            this.releaseDate.value = releaseDate
            this.duration.value = duration
            this.synopsis.value = synopsis
            this.cbParentAdvisory.value = JSON.stringify(this.props.parentAdvisoryList.find((e) => { return e.id === parentAdvisoryId }))
            this.cbSaga.value = JSON.stringify(this.props.sagaList.find((e) => { return e.id === sagaId }))
        }
        
    }
    
    render() {
        return ( 
            <React.Fragment>
                <br/>   
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.UpdateMovie} ref={(form) => this.formRef = form}>
                    <ComboBox list={this.props.movieList} header={'Filmes'} ref={(input) => this.cbMovie = input} onChange={this.SetMovieToEdit}/>
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
                        <Form.Label column lg={12} xl={2}>Duração</Form.Label>
                        <Col>
                            <Form.Control type="number" defaultValue="0" min="0" max="400" ref={(input) => {this.duration = input}}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Sinópse</Form.Label>
                        <Col>
                            <Form.Control as="textarea" rows="4" className="noresize" ref={(input) => {this.synopsis = input}}/>
                        </Col>
                    </Form.Group>
                    <ComboBox list={this.props.parentAdvisoryList} header={'Acon. Parental'} ref={(input) => this.cbParentAdvisory = input}/>
                    <ComboBox list={this.props.sagaList} header={'Saga'} ref={(input) => this.cbSaga = input}/>
                    <Row>
                        <Col>
                            <Button variant="primary" type="submit" block>Atualizar</Button>
                        </Col>
                    </Row>
                </Form>
            </React.Fragment>
        );
    }
}
 
export default Movie;