import React, { Component } from 'react';
import Employee_Edit from './components/employee_edit';

export default class EmployeeEdit extends Component {
  static displayName = 'EmployeeEdit';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="employee-edit-page">
        <Employee_Edit 
          history={this.props.history}
        />
      </div>
    );
  }
}
