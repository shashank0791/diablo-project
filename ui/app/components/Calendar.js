import React, {Component} from 'react';
import {Row, Col, ButtonToolbar, Button} from 'react-bootstrap';
import EventCalendar from 'react-event-calendar';
import moment from 'moment';

const tempEvents = {};

class CalendarComponent extends Component {

  constructor(props){
    super(props);

    this.state = {
      moment: moment()
    };

    this.handleNextMonth = this.handleNextMonth.bind(this);
    this.handlePreviousMonth = this.handlePreviousMonth.bind(this);
    this.handleToday = this.handleToday.bind(this);
    this.getHumanDate = this.getHumanDate.bind(this);
  }

  handleNextMonth() {
    this.setState({
        moment: this.state.moment.add(1, 'M'),
    });
  }

  handlePreviousMonth() {
    this.setState({
        moment: this.state.moment.subtract(1, 'M'),
    });
  }

  handleToday() {
    this.setState({
        moment: moment(),
    });
  }

  getHumanDate(){
    return [moment.months('MM', this.state.moment.month()), this.state.moment.year(), ].join(' ');
  }

  render(){
    return(
      <Row>
        <Col md={6}>
          <ButtonToolbar>
            <Button onClick={this.handleToday}>Today</Button>
            <Button onClick={this.handlePreviousMonth}>Previous Month</Button>
            <Button onClick={this.handleNextMonth}>Next Month</Button>
          </ButtonToolbar>
        </Col>
        <Col md={6}>
          <h2 className="pull-right">{this.getHumanDate()}</h2>
        </Col>
        <br/>
        <Col md={12}>
          <EventCalendar month={10} year={2016} wrapTitle="OSIC WFH/OOO"/>
        </Col>
      </Row>
    )
  }

}

export default CalendarComponent;
