import React, { Component } from 'react';
import { Col, Row, Form, Media, Button } from 'react-bootstrap'
import { Create, Delete } from '../../scripts/api'

class Comments extends Component {
    constructor(props) {
        super(props);
        this.DeleteReply = this.DeleteReply.bind(this)
        this.state = { 
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[0] : undefined,
            respondeTo: undefined
        }
    }

    AddComment = (event) => {
        event.preventDefault()
        let addData = this.state.responseTo ? [ { table: this.props.table, fieldData: [
            {field: 'userEmail', data: this.state.user.email},
            {field: 'userPassword', data: this.state.user.password},
            {field: 'userId', data: this.state.user.id},
            {field: this.props.field, data: this.props.id},
            {field: 'comment', data: this.comment.value},
            {field: 'responseTo', data: this.state.responseTo.id}
        ] } ]
        : [ { table: this.props.table, fieldData: [
            {field: 'userEmail', data: this.state.user.email},
            {field: 'userPassword', data: this.state.user.password},
            {field: 'userId', data: this.state.user.id},
            {field: this.props.field, data: this.props.id},
            {field: 'comment', data: this.comment.value},
        ] } ]
        Create(addData,(res) => {
            if(res.result) {
                this.form.reset()
                this.setState({ responseTo: undefined })
                this.props.GetComments(this.props.id)
            } else {
                this.setState({ celebritiesAssignment: undefined })
            }
        })
    }
    DeleteComment = (id) => {
        let deleteData = [ { table: this.props.table, fieldData: [
            {field: 'userEmail', data: this.state.user.email},
            {field: 'userPassword', data: this.state.user.password},
            {field: 'userId', data: this.state.user.id},
            {field: 'id', data: id}
        ] } ]
        Delete(deleteData,(res) => {
            if(res.result) {
                this.props.GetComments(this.props.id)
            } else {
                this.setState({ celebritiesAssignment: undefined })
            }
        })
    }
    DeleteReply = () => {
        this.setState({ respondeTo: undefined })
    }

    BtnDeleteComment = (props) => {
        return <Button variant="danger" size="sm" onClick={() => this.DeleteComment(props.id)} block>Apagar</Button>
    }

    ListComments = () => {
        let listComments = []
        if( !this.props.comments || !this.props.comments[0]) listComments.push('Sem registos, seja o primeiro a comentar!')
        else {
            this.props.comments.forEach((v, i) => {
                let responseTo = []
                if(v.responseto) {
                    v.responseto.forEach((v2, i) => {
                        let btnApagar2 = (v2.userid === this.state.user.id) ? (<this.BtnDeleteComment id={v2.id}/>) : null
                        responseTo.push(
                            <Media key={i} className="responseTo">
                                <Media.Body>
                                    <h6>{v2.name}</h6>
                                    <p>{v2.comment}</p>
                                </Media.Body>
                                <Col lg={1} xs={2} sm={2}>
                                    <Row>{btnApagar2}</Row>
                                </Col>
                            </Media>
                        )
                    })
                }
                
                let btnApagar = (v.userid === this.state.user.id) ? (<this.BtnDeleteComment id={v.id}/>) : null
                listComments.push(
                    <Media key={i} >
                        <Media.Body as={Col}>
                            <h6>{v.name}</h6>
                            <p>{v.comment}</p>
                            {responseTo}
                        </Media.Body>
                        <Col lg={1} xs={2} sm={2}>
                            <Row><Button variant="secondary" size="sm" onClick={() => {this.setState({ responseTo: v })}}  block>Comentar</Button></Row>
                            <Row>{btnApagar}</Row>
                        </Col>
                    </Media>
                )
            })
        }
        return (listComments)
    }

    render() { 
        if (!this.state.user)
            return (<p>É necessário uma conta para poder comentar e ver os comentários</p>)
        return (
            <React.Fragment>
                <Form onSubmit={this.AddComment} ref={(form) => this.form = form}>
                    <Form.Group as={Row}>
                        {this.state.responseTo
                        ? (<Form.Label column lg={12}>Responder a {this.state.responseTo ? this.state.responseTo.name : null} <Button variant="danger" size="sm" onClick={() => {this.setState({ responseTo: undefined })}} block>Não responder</Button></Form.Label>)
                        : (<Form.Label column lg={12}>Comentar</Form.Label>)}
                        <Col>
                            <Form.Control as="textarea" rows="4" className="noresize" ref={(input) => {this.comment = input}}/>
                        </Col>
                    </Form.Group>
                    <Row>
                        <Col>
                            <Button variant="primary" type="submit" block>Submit</Button>
                        </Col>
                    </Row>
                </Form>
                <br/>
                <this.ListComments />
                <br/><br/>
            </React.Fragment>
        )
    }
}
 
export default Comments;