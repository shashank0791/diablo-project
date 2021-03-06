import React, {Component} from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import Login from './components/Login';
import Logout from './components/Logout';
import Signup from './components/Signup';
import Calendar from './components/Calendar';
import AddEvent from './components/AddEvent';
import Excuses from './components/Excuses';

import App from './components/App';

class Main extends Component {

  render(){
    return(
      <Router history={this.props.history}>
        <Route path='/' component={App}>
          <IndexRoute component={Login}/>
          <Route path="/signup" components={Signup}/>
          <Route path="/calendar" components={Calendar}/>
          <Route path="/addEvent" components={AddEvent}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/excuses" component={Excuses}/>
        </Route>
      </Router>
    );
  }
}

export default Main;
