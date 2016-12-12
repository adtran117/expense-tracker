import React from 'react';
import $ from 'jquery';
import { Form, FormGroup, Col, ControlLabel, FormControl, Button} from 'react-bootstrap';
import { browserHistory, hashHistory } from 'react-router';


class LogoutView extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    browserHistory.push('/expenses');
  }

  render () {
    return (
      <div></div>
    )
  }
}

export default LogoutView;