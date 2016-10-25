import React, {Component} from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class FieldGroup extends Component {

  render(){
    return(
      <FormGroup controlId={this.props.id}>
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl type={this.props.type} placeholder={this.props.placeholder}/>
      </FormGroup>
    );
  }
}

export default FieldGroup;