import React, {Component, PropTypes} from 'react';
import {Row, Col, ButtonToolbar, Button} from 'react-bootstrap';
//import EventCalendar from 'react-event-calendar';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import EventActions from '../actions/EventActions';
import EventStore from '../stores/EventStore';
import AuthStore from '../stores/AuthStore';

class CalendarComponent extends Component {

  constructor(props){
    super(props);

    this.state = {
      moment: moment(),
      events: []
    };

    BigCalendar.setLocalizer(
      BigCalendar.momentLocalizer(moment)
    );
    this.onChange = this.onChange.bind(this);
  }
  onChange(){
    this.setState({
      events: EventStore.getEvents(),
      moment: this.state.moment
    });
  }
  componentWillMount() {
    EventStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    EventActions.getEvents();
  }

  componentWillUnmount(){
    EventStore.removeChangeListener(this.onChange);
  }

  render(){

    if(!AuthStore.isLoggedIn()) {
      this.props.history.goBack();
      return {};
    }

    let events = [];

    if(this.state.events) {
      events = this.state.events.map((event) => {
        event.start = moment(event.start, 'YYYY-MM-DD');
        event.end = moment(event.end, 'YYYY-MM-DD');
        return event;
      });
    }

    return(
      <Row>
        <Col md={12}>
          <BigCalendar
            events={events}
            defaultView="month"
            defaultDate={new Date(2016, 9, 1)}
            onSelectEvent={event => alert(event.desc)}
          />
        </Col>
      </Row>
    );

  }

}

export default CalendarComponent;
