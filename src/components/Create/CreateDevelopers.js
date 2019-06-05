import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Create } from '../../scripts/api'
import Alert from '../utils/Alert'
import ComboBox from '../utils/ComboBox'

//TODO: ADD RESET FORM
class CreateDevelopers extends Component {
    constructor(props) {
        super(props);
        this.ChangeAlert = this.ChangeAlert.bind(this)
        this.AddDevelopers = this.AddDevelopers.bind(this)
        this.SetGame = this.SetGame.bind(this)
        this.SetCompany = this.SetCompany.bind(this)
        this.ResetForm = this.ResetForm.bind(this)
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' },
            gameId: undefined,
            companyId: undefined
        }
    }
    
    ChangeAlert(visible, message, variant) {
        this.setState({ alert: { visible: visible, message: message, variant: variant} })
    }

    AddDevelopers = (event) => {
        event.preventDefault()
        if(this.props.gameList[0] && this.props.companyList[0]) {
            let insertData = [
                { table: 'Developers', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'gameId', data: this.state.gameId ? this.state.gameId : this.props.gameList[0].id},
                    {field: 'companyId', data: this.state.companyId ? this.state.companyId : this.props.companyList[0].id},
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao servidor...', 'info')
            Create(insertData, (res, rej) => {
                if(res) {
                    if(res.error) {
                        this.ChangeAlert(true, `${res.error}`, 'danger')
                    } else {
                        this.ResetForm()
                        this.ChangeAlert(true, `${res.result.message}`, 'success')
                    }
                } else {
                    this.ChangeAlert(true, `${rej}`, 'danger')
                }
            })
        } else {
            this.ChangeAlert(true, 'Por favor adicione os campos em falta', 'warning')
        }
    }
    
    SetGame = (event) => {
        this.setState({ gameId: Number(event.target.value) })
    }
    
    SetCompany = (event) => {
        this.setState({ companyId: Number(event.target.value) })
    }

    ResetForm = () => {
        this.formRef.reset()
        this.setState({gameId: this.props.gameList[0] ? this.props.gameList[0].id : undefined})
        this.setState({companyId: this.props.companyList[0] ? this.props.companyList[0].id : undefined})
    }

    render() {
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.AddDevelopers} ref={(form) => this.formRef = form}>
                    <ComboBox header={'Jogo'} list={this.props.gameList} onChange={this.SetGame} />
                    <ComboBox header={'Empresa'} list={this.props.companyList} onChange={this.SetCompany} />
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
export default CreateDevelopers;