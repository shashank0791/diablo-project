import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Header from './Header';

class AppComponent extends Component {
  render(){
    return(
      <div>
        <Header/>
        <Grid>
          <Row>
            <Col md={12}>
              <h1>HERE GOES EVERYTHING</h1>
              {this.props.children}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default AppComponent;