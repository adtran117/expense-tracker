import React from 'react';
import { render } from 'react-dom';
import Navbar from './../components/Navbar'

let main = (props) => (
  <div>
    <Navbar />
    <div>
      {props.children}
    </div>
  </div>
)

export default main;