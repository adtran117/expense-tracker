import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';


// import views
import Main from './views/main.jsx'
import LoginView from './views/LoginView'
import ExpensesView from './views/ExpensesView'
import LogoutView from './views/LogoutView'


render((
  <Router history={browserHistory}>
    <Router component={Main}>
      <Router path='/' component={LoginView} />
      <Router path='/expenses' component={ExpensesView} />
    </Router>
  </Router>
  ), document.getElementById('app'));