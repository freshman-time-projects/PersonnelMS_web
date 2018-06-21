import React, { Component } from 'react';
import SuccessDetail from './components/SuccessDetail';

export default class ActiveSuccess extends Component {
  static displayName = 'ActiveSuccess';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="active-success-page">
        <SuccessDetail />
      </div>
    );
  }
}
