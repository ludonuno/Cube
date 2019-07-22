import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Delete } from '../../scripts/api'
import { ReplaceComa } from '../../scripts/utils'

import Alert from '../utils/Alert'
import ComboBox from '../utils/CB'
class Season extends Component {
    constructor(props) {
        super(props);
        this.ola = 'ola'
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' },
            seasonList: [],
            selectedSeries: undefined
        }
    }
    componentWillReceiveProps() {
        if(this.props.seriesList[0]) {
            this.formRef.reset()
            this.SelectSeason(this.props.seriesList[0])
        }
    }
    componentDidUpdate() {
        if(this.props.seriesList[0]) {
            if(this.props.seasonList[0]) {
                if(this.state.selectedSeries) this.SelectSeasonUpdate(this.state.selectedSeries)
                else this.SelectSeasonUpdate(this.props.seriesList[0])
            } 
            else this.SelectSeasonUpdate({}) 
        } else this.SelectSeasonUpdate({})
    }

    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })

    DeleteSeason = (event) => {
        event.preventDefault()
        if(this.props.seasonList[0] && this.cbDeleteSeason) {
            let deleteData = [
                { table: 'Season', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'id', data: JSON.parse(this.cbDeleteSeason.value).id},
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
    
    SetSeasonFieldValues = (season) => {
        let title = (season && season.title) ? ReplaceComa(season.title) : null
        let releaseDate = (season && season.releasedate) ? season.releasedate.substring(0,10) : null
        let synopsis = (season && season.synopsis) ? ReplaceComa(season.synopsis) : null
        this.title.value = title
        this.releaseDate.value = releaseDate
        this.synopsis.value = synopsis
    }

    SelectSeason = (selectedSeries) => {
        let seasonList = [...this.props.seasonList]
        let newSeason = []
        seasonList.forEach((season) => {
            if(season.seriesid === selectedSeries.id){
                newSeason.push(season)
            }
        })
        this.SetSeasonFieldValues(newSeason[0])
        this.setState({selectedSeries})
        this.setState({seasonList: newSeason})
    }
    SelectSeasonUpdate = (selectedSeries) => {
        let seasonList = [...this.props.seasonList]
        let newSeason = []
        seasonList.forEach((season) => {
            if(season.seriesid === selectedSeries.id){
                newSeason.push(season)
            }
        })
        this.SetSeasonFieldValues(newSeason[0])
    }

    LoadSeasonData = () => {
        this.SelectSeason(JSON.parse(this.cbDeleteSeries.value))
    }

    LoadDataToFields = () => {
        this.SetSeasonFieldValues(JSON.parse(this.cbDeleteSeason.value))
    }
    
    render() {
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.DeleteSeason} ref={(form) => this.formRef = form}>
                    <ComboBox header={'Série'} list={this.props.seriesList} onChange={this.LoadSeasonData} ref={(input) => this.cbDeleteSeries = input} />
                    <ComboBox header={'Temporada'} list={this.state.seasonList} onChange={this.LoadDataToFields} ref={(input) => this.cbDeleteSeason = input} />
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
 
export default Season;