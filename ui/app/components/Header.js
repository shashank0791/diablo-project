import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import AuthStore from '../stores/AuthStore';

class HeaderComponent extends Component {

  constructor(){
    super();
    this.state = {
      isLoggedIn: AuthStore.isLoggedIn()
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(){
    this.setState({
      isLoggedIn: AuthStore.isLoggedIn()
    });
  }

  componentWillMount(){
    AuthStore.addChangeListener(this.handleOnChange)
  }

  componentWillUnmount(){
    AuthStore.removeChangeListener(this.handleOnChange)
  }

  render(){

    return(
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Diablo-UI</a>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
            { this.state.isLoggedIn ? (
              <Nav pullRight>
                <NavItem href="/calendar">Calendar</NavItem>
                <NavItem href="/addEvent">Add Event</NavItem>
                <NavItem href="/excuses">Excuses</NavItem>
                <NavItem href="/logout">Logout</NavItem>
              </Nav>
              ) : (
              <Nav pullRight>
                <NavItem href="/signup">Signup</NavItem>
                <NavItem href="/">Login</NavItem>
              </Nav>
              )
            }
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default HeaderComponent;
