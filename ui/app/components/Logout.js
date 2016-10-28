import React, { Component } from 'react';
import AuthStore from '../stores/AuthStore';
import AuthActions from '../actions/AuthActions';
import { Link } from 'react-router';

class LogoutComponent extends Component {

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

  componentDidMount(){
    AuthActions.logOutUser();
  }

  render(){
    return(
      <div>
      { !this.state.isLoggedIn ? (
        <h2>You have been logged out click here <Link to="/">Login</Link> to login again</h2>
      ): (
        <h2>You will be logged out</h2>
      )}
      </div>
    )
  }

}

export default LogoutComponent;