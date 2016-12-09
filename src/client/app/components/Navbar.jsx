import React from 'react';
import { render } from 'react-dom';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav} from 'react-bootstrap';


class Navigator extends React.Component {
  render () {
    return (
      <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Expense Tracker</a>
            </Navbar.Brand>
          </Navbar.Header>
      </Navbar>

    );
  }
}

export default Navigator