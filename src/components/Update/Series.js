import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Update } from '../../scripts/api'
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
    
    componentDidUpdate() {
        this.formRef.reset()
        if(this.props.seriesList[0]) this.SetSeriesFieldValues(this.props.seriesList[0])
        else this.SetSeriesFieldValues({})
    }
    
    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })

    UpdateSeries = (event) => {
        event.preventDefault()
        if(this.props.seriesList[0] && this.props.sagaList[0] && this.props.parentAdvisoryList[0]) {
            let updateData = [
                { table: 'Series', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'id', data: JSON.parse(this.cbSeries.value).id},
                    {field: 'title', data: this.title.value},
                    {field: 'releaseDate', data: this.releaseDate.value},
                    {field: 'synopsis', data: this.synopsis.value},
                    {field: 'sagaId', data: JSON.parse(this.cbSaga.value).id},
                    {field: 'parentAdvisoryId', data: JSON.parse(this.cbParentAdvisory.value).id}
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

    SetSeriesToEdit = () => {
        this.SetSeriesFieldValues(JSON.parse(this.cbSeries.value))
    }
    
    SetSeriesFieldValues = (series) => {
        if(series && this.cbParentAdvisory && this.cbSaga) {
            let title = series.title ? ReplaceComa(series.title) : null
            let releaseDate = series.releaseDate ? series.releaseDate.substring(0,10) : null
            let synopsis = series.synopsis ? ReplaceComa(series.synopsis) : null
            let parentAdvisoryId = series.parentAdvisoryId ? series.parentAdvisoryId : null
            let sagaId = series.sagaId ? series.sagaId : null
    
            this.title.value = title
            this.releaseDate.value = releaseDate
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
                <Form onSubmit={this.UpdateSeries} ref={(form) => this.formRef = form}>
                    <DropDown list={this.props.seriesList} header={'Series'} ref={(input) => this.cbSeries = input} onChange={this.SetSeriesToEdit}/>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Título</Form.Label>
                        <Col>
                            <Form.Control type="text" ref={(input) => {this.title = input}} required/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Data</Form.Label>
                        <Col>
                            <Form.Control type="date" ref={(input) => {this.releaseDate = input}} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Sinópse</Form.Label>
                        <Col>
                            <Form.Control as="textarea" rows="4" className="noresize" ref={(input) => {this.synopsis = input}}/>
                        </Col>
                    </Form.Group>
                    <DropDown list={this.props.parentAdvisoryList} header={'Acon. Parental'} ref={(input) => this.cbParentAdvisory = input}/>
                    <DropDown list={this.props.sagaList} header={'Saga'} ref={(input) => this.cbSaga = input}/>
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
 
export default Series;