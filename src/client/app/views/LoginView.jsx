import React from 'react';
import { render, findDOMNode } from 'react-dom';
import $ from 'jquery';
import { Form, FormGroup, Col, ControlLabel, FormControl, Button} from 'react-bootstrap';
import { browserHistory, hashHistory } from 'react-router';


class LoginView extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogin(event) {
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/login',
      dataType: "json",
      data: JSON.stringify({
        username: findDOMNode(this.refs.username).value,
        password: findDOMNode(this.refs.password).value
      }),
      contentType: "Application/json"
    }).done( (data) => {
      // Redirect to expenses view after successful authentication
      browserHistory.push('/expenses');
    }).fail( (err) => {
      console.log(err)
    });
  }

  render () {
    return (
      <Form horizontal>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Username
          </Col>
          <Col sm={8}>
            <FormControl ref="username" type="text" placeholder="Username" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={8}>
            <FormControl ref="password" type="password" placeholder="Password" />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button onClick={this.handleLogin.bind(this)} type="submit">
              Sign in
            </Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}

export default LoginView;