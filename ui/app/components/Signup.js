import React, {Component} from 'react';
import {Well,
  ControlLabel,
  FormGroup,
  FormControl,
  Col,
  Row,
  Button} from 'react-bootstrap';

import FieldGroup from '../utils/FieldGroup';


class SignupComponent extends Component {

  render(){
    return(
      <Row>
        <Col md={8} mdOffset={2}>
          <Row>
            <Col md={1}>
              <img width={64} height={64} src="/../images/icon.png" />
            </Col>
            <Col md={11}>
              <h2>Please Signup</h2>
            </Col>
          </Row>
          <Well bsSize="small">
            <FieldGroup
              id="userFirstName"
              type="text"
              label="First Name"
            />
            <FieldGroup
              id="userLasttName"
              type="text"
              label="Last Name"
            />
            <FieldGroup
              id="userName"
              type="text"
              label="Username"
              placeholder="Choose a user name"
            />
            <FieldGroup
              id="userPic"
              type="file"
              label="Profile Pic"
            />
            <FieldGroup
              id="userEmail"
              type="email"
              label="Email"
            />
            <FormGroup controlId="userTeam">
              <ControlLabel>Team</ControlLabel>
              <FormControl componentClass="select" placeholder="Choose a team...">
              </FormControl>
            </FormGroup>
            <FieldGroup
              id="userPwd"
              type="password"
              label="Choose a password"
            />
            <FieldGroup
              id="userPwdConfirmation"
              type="password"
              label="Confirm password"
            />
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

export default SignupComponent;