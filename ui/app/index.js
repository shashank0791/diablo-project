import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import Main from './Main';

ReactDOM.render(<Main history={browserHistory} />, document.getElementById('app'));