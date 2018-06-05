import React, { Component } from 'react';
import UserLogin from './components/UserLogin';
export default class LoginPage extends Component {
  static displayName = 'LoginPage';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="login-page-page">
        <UserLogin history={this.props.history} />
      </div>
    );
  }
}
