import React, { PureComponent } from 'react';
import cookie from 'react-cookies'
import { Link } from 'react-router-dom';

export default class Logo extends PureComponent {
  render() {
    return (
      <div className="logo" style={{}}>
      {cookie.load("role") === "3"? <Link to="/" className="logo-text">
          蚂蚁人事管理
        </Link>: <Link to="/index" className="logo-text">
          蚂蚁人事管理
        </Link>}
       
      </div>
    );
  }
}
