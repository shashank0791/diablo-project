import React, { Component } from 'react';
import { Row, Col, Table, FormGroup, FormControl, Button } from 'react-bootstrap';
import Rating from 'react-rating';
import AuthStore from '../stores/AuthStore';
import EventActions from '../actions/EventActions';
import EventStore from '../stores/EventStore';

class ExcusesComponent extends Component {
  constructor(){
    super();

    this.state = {
      isLoggedIn: AuthStore.isLoggedIn(),
      events: []
    };

    this.onChange = this.onChange.bind(this);

  }

  onChange() {
    this.setState({
      isLoggedIn: AuthStore.isLoggedIn(),
      events: EventStore.getEvents()
    });
  }

  componentWillMount() {
    EventStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    EventStore.removeChangeListener(this.onChange);
  }

  componentDidMount(){
    EventActions.getEvents();
  }

  render(){
    if(!this.state.isLoggedIn) {
      this.props.history.push('/');
      return {};
    }
    let events = this.state.events;

    return(
      <Row>
        <Col>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Excuse</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
            { events.map((eventObj)=>{
                return(
                  <tr>
                    <td>{eventObj.title}</td>
                    <td>{eventObj.desc}</td>
                    <td>
                      <Rating readonly={true} />
                      <FormGroup>
                        <FormControl componentClass="select" placeholder="Choose a team...">
                          <option value={1}>Meh.. not original</option>
                          <option value={2}>Not that bad</option>
                          <option value={3}>Ordinary</option>
                          <option value={4}>Clever!</option>
                          <option value={5}>xD LOL</option>
                        </FormControl>
                        <Button bsSize="small">Rate!</Button>
                      </FormGroup>
                    </td>
                  </tr>
                );
              })
            }
            </tbody>
          </Table>
        </Col>
      </Row>
    );

  }

}

export default ExcusesComponent;
