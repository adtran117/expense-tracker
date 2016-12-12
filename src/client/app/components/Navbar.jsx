import React from 'react';
import { render } from 'react-dom';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav} from 'react-bootstrap';


class Navigator extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Expense Tracker</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            {
              this.props.path.props.route.path === '/' ? 
              <NavItem></NavItem> :
              <NavItem eventKey={1} href="/logout">Logout</NavItem> 
            }
          </Nav>
      </Navbar>

    );
  }
}

export default Navigator