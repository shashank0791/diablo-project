import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

class HeaderComponent extends Component {

  render(){
    return(
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Diablo-UI</a>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem href="/signup">Signup</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default HeaderComponent;
