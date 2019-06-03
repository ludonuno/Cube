import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Create, Get } from '../../scripts/api'

import Alert from '../utils/Alert'
import ComboBox from '../utils/ComboBox'
class CreateEpisode extends Component {
    constructor(props) {
        super(props);
        this.ChangeAlert = this.ChangeAlert.bind(this)
        this.AddEpisode = this.AddEpisode.bind(this)
        this.ResetForm = this.ResetForm.bind(this)
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' },
            alertEpisode: { visible: false, message: '', variant: '' },
            seriesId: undefined,
            seasonId: undefined
        }
    }

    ChangeAlert(visible, message, variant) {
        this.setState({ alert: { visible: visible, message: message, variant: variant} })
    }

    AddEpisode = (event) => {
        event.preventDefault()
        if(this.props.seriesList[0] && this.props.seasonList[0]) {
            let insertData = [
                { table: 'Season', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'title', data: this.title.value},
                    {field: 'releaseDate', data: this.releaseDate.value},
                    {field: 'synopsis', data: this.synopsis.value},
                    {field: 'seriesId', data: this.state.seriesId ? this.state.seriesId : this.props.seriesList[0].id}
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao Servidor...', 'info')
            Create(insertData, (res) => {
                if(res.error) {
                    this.ChangeAlert(true, res.error, 'danger')
                } else {
                    this.ResetForm()
                    this.ChangeAlert(true, res.result.message, 'success')
                }
            })
        } else {
            this.ChangeAlert(true, 'Por favor adicione os campos em falta', 'warning')
        }
    }
    
    SetSeries = (event) => {
        this.setState({ seriesId: Number(event.target.value) })
    }

    SetSeason = (event) => {
        this.setState({ seasonId: Number(event.target.value) })
    }
    
    // return (<ComboBox header={'Série'} list={this.props.seriesList} onChange={this.SetSeason} />)
    
    ResetForm = () => {
        this.formRef.reset()        
        this.setState({seriesId: (this.props.series && this.props.series[0]) ? this.props.series[0].id : undefined})
    }

    componentDidMount() {
        console.log(this.props.seriesList)
        //this.props.GetSeasonList(this.props.seriesList[0].id)
    }

    render() {
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.AddEpisode} ref={(form) => this.formRef = form}>
                    <ComboBox header={'Série'} list={this.props.seriesList} onChange={this.SetSeries} />
                    <Alert variant={this.state.alertEpisode.variant} message={this.state.alertEpisode.message} visible={this.state.alertEpisode.visible} />
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
 
export default CreateEpisode;