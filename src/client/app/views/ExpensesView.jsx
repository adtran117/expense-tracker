import React from 'react';
import { render, findDOMNode } from 'react-dom';
import $ from 'jquery';
import { Table, Form, FormGroup, ControlLabel, Button, FormControl } from 'react-bootstrap';

class ExpensesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenseInfo: [],
    }
  }

  componentDidMount() {
    this.refreshExpenses();
  }

  refreshExpenses() {
    $.ajax({
      method: 'GET',
      url: '/api/userExpenses',
      dataType: "json",
      contentType: "Application/json"
    }).done( (data) => {
      this.setState({expenseInfo: data});
    }).fail( (err) => {
      console.log(err)
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // Post to database
    $.ajax({
      method: 'POST',
      url: '/api/userExpenses',
      dataType: "json",
      data: JSON.stringify({
        amount: findDOMNode(this.refs.amount).value,
        description: findDOMNode(this.refs.description).value
      }),
      contentType: "Application/json"
    }).done( (data) => {
      this.refreshExpenses();
    });
  }

  handleDelete(index) {
    console.log(this.state.expenseInfo[index]._id)
    $.ajax({
      method: 'DELETE',
      url: '/api/userExpenses',
      dataType: "json",
      data: JSON.stringify({
        _id: this.state.expenseInfo[index]._id
      }),
      contentType: "Application/json"
    }).done( (data) => {
      this.refreshExpenses();
    })
  }
  render() {
    return(
      <div>
        <div>
          <Form inline>
          <FormGroup controlId="formInlineAmount">
            <ControlLabel>Amount</ControlLabel>
            {' '}
            <FormControl ref="amount" type="text" placeholder="Amount" />
          </FormGroup>
            {' '}
          <FormGroup controlId="formControlsDescription">
            <ControlLabel>Description</ControlLabel>
            <FormControl ref="description" componentClass="textarea" placeholder="" />
          </FormGroup>
            {' '}
          <Button type="submit" onClick={this.handleSubmit.bind(this)}>
            Create New Expense
          </Button>
        </Form>
      </div>

      <div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Date Created</th>
              <th>Amount</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.expenseInfo.map(function(value, index) {
              return (
                <tr>
                  <td key={index+.1}>{value.date_created}</td>
                  <td key={index+.2}>{value.amount}</td>
                  <td key={index+.3}>{value.description}</td>
                  <td key={index+.4}><Button bsStyle="danger" onClick={this.handleDelete.bind(this, index)}>Delete</Button></td>
                </tr>
              )
            }.bind(this))}
          </tbody>
        </Table>
        </div>
      </div>
    );
  }
}

export default ExpensesView;
