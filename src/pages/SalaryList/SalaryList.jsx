import React, { Component } from 'react';
import SalaryTable from './components/SalaryTable';

export default class SalaryList extends Component {
  static displayName = 'SalaryList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="salary-list-page">
        <SalaryTable />
      </div>
    );
  }
}
