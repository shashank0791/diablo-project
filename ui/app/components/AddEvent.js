import FieldGroup from "../utils/FieldGroup"
import React, {Component} from 'react';
import {Row, Col, Well, ControlLabel, FormControl, Button} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker'

class AddEventComponent extends Component {
	render(){
		return(
			<Row>
			  <Col md={8} mdOffset={2}>
	            <Row>
	              <Col md={1}>
	                <img width={64} height={64} src="/../images/icon.png" />
	              </Col>
	              <Col md={11}>
	                <h2>Which is your excuse now?</h2>
	              </Col>
			    </Row>
			    <Well bsSize="large">
			    	<ControlLabel>Start Date:</ControlLabel>
      				<DatePicker id="start"/><br/>

      				<ControlLabel>End Date:</ControlLabel>
      				<DatePicker id="end"/><br/>

			    	<FieldGroup id="title" type="text" label="Title:"/>

			    	<ControlLabel>Excuse:</ControlLabel>
      				<FormControl componentClass="textarea" /><br/>
      				
      			    <Row>
		              <Col md={2} className="pull-right">
		                <Button type="button" className="pull-right">Cancel</Button>
		              </Col>
		              <Col md={4} className="pull-right">
		                <Button type="submit" bsStyle="primary" className="pull-right">Submit</Button>
		              </Col>
		            </Row>
			    </Well>
			  </Col>
			</Row>
		);
	}
}

export default AddEventComponent;