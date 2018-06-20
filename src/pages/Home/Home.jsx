import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IceContainer from '@icedesign/container';
import Img from '@icedesign/img';
export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <IceContainer>
      <div className="exception-content">
        <Img
          width='100%'
          
        src={require("../../image/index.jpg")}
        />
      </div>
    </IceContainer>;
  }
}
