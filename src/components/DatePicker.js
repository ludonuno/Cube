import React, { Component } from 'react';
import { Form, InputGroup, Row, Col } from 'react-bootstrap'
import { YearList, MonthList, DayList } from '../scripts/utils'

class DatePicker extends Component {
    loadYearOptions = () => {
        let yearOptions = []
        let yearList = YearList()
        yearList.forEach((element) => {
            yearOptions.push(<option key={element} value={element}>{element}</option>)
        })
        return yearOptions
    }

    loadMonthOptions = () => {
        let monthOptions = []
        let monthList = MonthList()
        monthList.forEach((element) => {
            monthOptions.push(<option key={element.id} value={element.id}>{element.mes}</option>)
        })
        return monthOptions
    }

    loadDayOptions = () => {
        let dayOptions = []
        let year = this.year ? this.year.value : new Date().getFullYear() 
        let month = this.month ? this.month.value : new Date().getMonth() + 1
        let dayList = DayList(year, month)
        dayList.forEach((element) => {
            dayOptions.push(<option key={element} value={element}>{element}</option>)
        })
        return dayOptions
    }

    render() {
        return ( 
            <React.Fragment>
                <Row>
                    <Col>
                        <Form.Group>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Ano</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control as="select" onChange={this.props.ChangeYearValue} defaultValue={new Date().getFullYear()} ref={(input) => {this.year = input}}>
                                    <this.loadYearOptions />
                                </Form.Control>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Mês</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control as="select" onChange={this.props.ChangeMonthValue} defaultValue={new Date().getMonth() + 1} ref={(input) => {this.month = input}}>
                                    <this.loadMonthOptions />
                                </Form.Control>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Dia</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control as="select" onChange={this.props.ChangeDayValue} defaultValue={new Date().getDate()}>
                                    <this.loadDayOptions />
                                </Form.Control>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}
 

export default DatePicker;