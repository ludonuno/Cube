import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Update } from '../../scripts/api'
import { ReplaceComa } from '../../scripts/utils'

import Alert from '../utils/Alert'
import ComboBox from '../utils/ComboBox'
class Series extends Component {
    constructor(props) {
        super(props);
        this.ChangeAlert = this.ChangeAlert.bind(this)
        this.UpdateSeries = this.UpdateSeries.bind(this)
        this.SetParentAdvisory = this.SetParentAdvisory.bind(this)
        this.SetSaga = this.SetSaga.bind(this)
        this.ResetForm = this.ResetForm.bind(this)
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' },
            parentAdvisoryId: undefined,
            sagaId: undefined,
            selectedSeries: undefined
        }
    }
    componentWillReceiveProps(){
        if(this.props.seriesList[0])
        this.SetSeriesFieldValues(this.props.seriesList[0])
    }
    SetSeriesFieldValues = (series) => {
        this.setState({selectedSeries: series})
        let title = (series.title) ? ReplaceComa(series.title) : null
        let releaseDate = (series && series.releasedate) ? series.releasedate.substring(0,10) : null
        let synopsis = (series && series.synopsis) ? ReplaceComa(series.synopsis) : null
        let parentAdvisoryId = (series.parentadvisoryid) ? series.parentadvisoryid : null
        let sagaId = (series.sagaid) ? series.sagaid : null

        this.title.value = title
        this.releaseDate.value = releaseDate
        this.synopsis.value = synopsis
        this.setState({parentAdvisoryId: parentAdvisoryId})
        this.setState({sagaId: sagaId})
    }
    ChangeAlert(visible, message, variant) {
        this.setState({ alert: { visible: visible, message: message, variant: variant} })
    }

    UpdateSeries = (event) => {
        event.preventDefault()
        if(this.props.seriesList[0] && this.props.sagaList[0] && this.props.parentAdvisoryList[0]) {
            let updateData = [
                { table: 'Series', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'id', data: this.state.selectedSeries.id},
                    {field: 'title', data: this.title.value},
                    {field: 'releaseDate', data: this.releaseDate.value},
                    {field: 'synopsis', data: this.synopsis.value},
                    {field: 'sagaId', data: this.state.sagaId ? this.state.sagaId : this.props.sagaList[0].id},
                    {field: 'parentAdvisoryId', data: this.state.parentAdvisoryId ? this.state.parentAdvisoryId : this.props.parentAdvisoryList[0].id}
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Update(updateData, (res, rej) => {
                if(res) {
                    if(res.error) {
                        this.ChangeAlert(true, res.error, 'danger')
                    } else {
                        this.ResetForm()
                        this.ChangeAlert(true, res.result.message, 'success')
                        this.props.onSubmit()
                    }
                } else {
                    this.ChangeAlert(true, `${rej}`, 'danger')
                }
            })
        } else {
            this.ChangeAlert(true, 'Por favor adicione os campos em falta', 'warning')
        }
    }
    SetSeriesToEdit = (event) => {
        this.props.seriesList.forEach(series => {
            if(series.id === Number(event.target.value)) {
                this.SetSeriesFieldValues(series)
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
                <Form onSubmit={this.UpdateSeries} ref={(form) => this.formRef = form}>
                    <ComboBox header={'Series'} list={this.props.seriesList} onChange={this.SetSeriesToEdit} />
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Título</Form.Label>
                        <Col>
                            <Form.Control type="text" ref={(input) => {this.title = input}} required/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Data</Form.Label>
                        <Col>
                            <Form.Control type="date" ref={(input) => {this.releaseDate = input}} required/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}> 
                        <Form.Label column lg={12} xl={2}>Sinópse</Form.Label>
                        <Col>
                            <Form.Control as="textarea" rows="4" className="noresize" ref={(input) => {this.synopsis = input}}/>
                        </Col>
                    </Form.Group>
                    <ComboBox header={'Acon. Parental'} list={this.props.parentAdvisoryList} onChange={this.SetParentAdvisory} defaultValue={this.state.parentAdvisoryId} />
                    <ComboBox header={'Saga'} list={this.props.sagaList} onChange={this.SetSaga} defaultValue={this.state.sagaId} />
                    <Row>
                        <Col>
                            <Button variant="primary" type="submit" block>Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </React.Fragment>
        );
    }
}
 
export default Series;