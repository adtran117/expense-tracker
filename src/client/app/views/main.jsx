import React from 'react';
// import { render } from 'react-dom';
import Navbar from './../components/Navbar'


class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props.children)
    return(
      <div>
        <Navbar path={this.props.children}/>
        <div>
          {this.props.children}
        </div>
      </div>

    )
  }
}

export default Main;