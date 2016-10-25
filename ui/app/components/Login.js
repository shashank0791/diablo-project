import React, {Component} from 'react';
import { Form, FormGroup, Col, FormControl, Checkbox, Button, ControlLabel, Well, Image } from 'react-bootstrap';

class LoginComponent extends Component {
  constructor() {
  	super();
  	this.username = '';
  	this.password = '';
  }

  render(){
    return(
      
      <Col md={6} mdOffset={3}>
      	<Well bsSize="large">
	      <Form horizontal>
		    <FormGroup controlId="formHorizontalEmail">
		      <Col xs={6} md={4} smOffset={4}>
		        <Image src="/../images/icon.png" rounded />
		      </Col>
		      <Col sm={10} smOffset={2}>
		        <h4>Please enter username and password:</h4>
		      </Col>
		      <Col componentClass={ControlLabel} sm={2}>
		        Username:
		      </Col>
		      <Col sm={10}>
		        <FormControl type="text" placeholder="Username" id="username"/>
		      </Col>
		    </FormGroup>

		    <FormGroup controlId="formHorizontalPassword">
		      <Col componentClass={ControlLabel} sm={2}>
		        Password
		      </Col>
		      <Col sm={10}>
		        <FormControl type="password" placeholder="Password" id="password"/>
		      </Col>
		    </FormGroup>

		    <FormGroup>
		      <Col smOffset={7} sm={10}>
		        <Checkbox>Remember me</Checkbox>
		      </Col>
		    </FormGroup>

		    <FormGroup>
		      <Col smOffset={7} sm={2}>
		          <Button bsStyle='primary' type="submit">Sign in</Button>
		      </Col>
		      <Col smOffset={10}>
		      	<a href="signup"><Button type="button">Sign up</Button></a>
		      </Col>
		    </FormGroup>
		  </Form>
	  	</Well>
      </Col>
    );
  }
}

export default LoginComponent;