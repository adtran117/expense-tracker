import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';


// import views
import Main from './views/main'
import LoginView from './views/LoginView'

render((
  <Router history={browserHistory}>
    <Router component={Main}>
      <Router path='/' component={LoginView} />
    </Router>
  </Router>
  ), document.getElementById('app'));