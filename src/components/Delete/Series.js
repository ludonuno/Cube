import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Delete } from '../../scripts/api'
import { ReplaceComa } from '../../scripts/utils'
import Alert from '../utils/Alert'
import DropDown from '../utils/DP'
class Series extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' }
        }
    }

    componentWillUpdate() {
        this.formRef.reset()
    }

    componentDidUpdate() {
        if(this.props.seriesList[0]) this.SetSeriesFieldValues(this.props.seriesList[0])
        else this.SetSeriesFieldValues({})
    }
    
    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })

    DeleteSeries = (event) => {
        event.preventDefault()
        if(this.props.seriesList[0] && this.cbDeleteSeries) {
            let deleteData = [
                { table: 'Series', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'id', data: JSON.parse(this.cbDeleteSeries.value).id}
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
    
    SetSeriesFieldValues = (series) => {
        if(series) {
            let title = series.title ? ReplaceComa(series.title) : null
            let releaseDate = series.releaseDate ? series.releaseDate.substring(0,10) : null
            let synopsis = series.synopsis ? ReplaceComa(series.synopsis) : null
            let parentAdvisoryRate = series.parentAdvisoryRate ? ReplaceComa(series.parentAdvisoryRate) : null
            let sagaName = series.sagaName ? ReplaceComa(series.sagaName) : null
            this.title.value = title
            this.releaseDate.value = releaseDate
            this.synopsis.value = synopsis
            this.parentAdvisory.value = parentAdvisoryRate
            this.saga.value = sagaName
        }
    }
    
    LoadDataToFields = () => {
        this.SetSeriesFieldValues(JSON.parse(this.cbDeleteSeries.value))
    }
    
    render() {
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.DeleteSeries} ref={(form) => this.formRef = form}>
                    <DropDown header={'Series'} list={this.props.seriesList} onChange={this.LoadDataToFields} ref={(input) => this.cbDeleteSeries = input} />
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
 
export default Series;