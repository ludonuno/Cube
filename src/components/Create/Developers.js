import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Create } from '../../scripts/api'
import Alert from '../utils/Alert'
import DropDown from '../utils/DP'

class Developers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            alert: { visible: false, message: '', variant: '' }
        }
    }
    
    componentDidUpdate() {
        this.formRef.reset()
    }
    
    ChangeAlert = (visible, message, variant) => this.setState({ alert: { visible: visible, message: message, variant: variant} })

    AddDevelopers = (event) => {
        event.preventDefault()
        if(this.props.gameList[0] && this.props.companyList[0]) {
            let insertData = [
                { table: 'Developers', fieldData: [ 
                    {field: 'userEmail', data: this.state.user.email},
                    {field: 'userPassword', data: this.state.user.password},
                    {field: 'gameId', data: JSON.parse(this.cbGame.value).id},
                    {field: 'companyId', data: JSON.parse(this.cbCompany.value).id},
                ] }
            ]
            this.ChangeAlert(true, 'A ligar ao servidor...', 'info')
            Create(insertData, (res, rej) => {
                if(res) {
                    if(res.error) this.ChangeAlert(true, res.error, 'danger')
                    else {
                        this.formRef.reset()
                        this.ChangeAlert(true, res.result.message, 'success')
                    }
                } else this.ChangeAlert(true, `${rej}`, 'danger')
            })
        } else this.ChangeAlert(true, 'Por favor adicione os campos em falta', 'warning')
    }

    render() {
        return ( 
            <React.Fragment>
                <br/>
                <Alert variant={this.state.alert.variant} message={this.state.alert.message} visible={this.state.alert.visible} />
                <Form onSubmit={this.AddDevelopers} ref={(form) => this.formRef = form}>
                    <DropDown list={this.props.gameList} header={'Jogo'} ref={(input) => this.cbGame = input} />
                    <DropDown list={this.props.companyList} header={'Empresa'} ref={(input) => this.cbCompany = input} />
                    <Row>
                        <Col>
                            <Button variant="success" type="submit" block>Adicionar</Button>
                        </Col>
                    </Row>
                </Form>
            </React.Fragment>
        );
    }
}
export default Developers;