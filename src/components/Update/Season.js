import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Update } from '../../scripts/api'
import { ReplaceComa } from '../../scripts/utils'
import Alert from '../utils/Alert'
import ComboBox from '../utils/CB'
import ComboBox2 from '../utils/CB2'
import { optionalCallExpression } from '@babel/types';

class Season extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' }
        }
    }

    componentDidUpdate() {
        this.formRef.reset()
        if(this.props.seriesList[0]) this.ChangeCBSeasonOptions(this.props.seriesList[0])
        else this.ChangeCBSeasonOptions({})
    }
    
    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })

    UpdateSeason = (event) => {
        event.preventDefault()
        if(this.props.seasonList[0] && this.props.seriesList[0]) {
            let updateData = [
                { table: 'Season', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'id', data: this.state.selectedSeason.id},
                    {field: 'title', data: this.title.value},
                    {field: 'releaseDate', data: this.releaseDate.value},
                    {field: 'synopsis', data: this.synopsis.value},
                    {field: 'seriesId', data: this.state.seriesId ? this.state.seriesId : this.props.seriesList[0].id}
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

    SetSeries = () => {
        this.ChangeCBSeasonOptions(JSON.parse(this.cbSeries.value))
    }

    ChangeCBSeasonOptions = (series) => {
        if(this.cbSeason) {
            //Apaga os dados existentes da cbSeason
            let i = 0
            while (this.cbSeason.length > 0) {
                this.cbSeason[i] = null
            }
            //this.cbSeason.length = 0
            
            //Adiciona os dados filtrados à cbSeason
            let seasonList = [...this.props.seasonList]
            let nIndex = 0
            seasonList.forEach((season, i) => {
                if(season.seriesid === series.id){
                    nIndex = i
                    let option = new Option( season.title ? ReplaceComa(season.title) : null, JSON.stringify(season),)
                    this.cbSeason.add(option)
                }
            })
            console.log( this.alertSeason)

            if(this.alertSeason) {
                if(!nIndex) {
                    //this.cbSeason.style.display = 'none'
                    this.alertSeason.style.display = 'visible'
                } else {
                    //this.cbSeason.style.display = 'visible'
                    this.alertSeason.style.display = 'none'
                }

            }
        }
    }

    SetSeasonToEdit = (event) => {

    }

    SetSeasonFieldValues = (season) => {
        this.setState({selectedSeason: season})
        let title = (season.title) ? ReplaceComa(season.title) : null
        let releaseDate = (season && season.releasedate) ? season.releasedate.substring(0,10) : null
        let synopsis = (season && season.synopsis) ? ReplaceComa(season.synopsis) : null
        let seriesId = (season.seriesid) ? season.seriesid : null
        this.title.value = title
        this.releaseDate.value = releaseDate
        this.synopsis.value = synopsis
        this.setState({seriesId: seriesId})
    }
    Teste = () => {
        
        // console.log(this.cbSeries)
        // console.log(this.cbSeries.length)
        // console.log(this.cbSeries)
        // console.log(this.cbSeries)
        // console.log(this.cbSeries)
        // console.log(this.cbSeries.value)
    }
    
    render() {
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.UpdateSeason} ref={(form) => this.formRef = form}>
                    <ComboBox list={this.props.seriesList} header={'Série'} ref={(input) => this.cbSeries = input} onChange={this.SetSeries}/>
                    <ComboBox2 header={'Temporada'} ref={(input) => this.cbSeason = input} onChange={this.SetSeasonToEdit}/>
                    <Alert ref={(input) => this.alertSeason = input} variant={'danger'} message={'Não tem temporadas, adicione uma.'} visible={true} />
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
                    <Row>
                        <Col>
                            <Button variant="primary" type="submit" block>Submit</Button>
                        </Col>
                    </Row>
                </Form>
                <Button variant="primary" type="submit" onClick={this.Teste} block>Submit</Button>
            </React.Fragment>
        );
    }
}
 
export default Season;