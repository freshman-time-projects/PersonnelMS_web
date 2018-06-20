import React, { Component } from 'react';
import UserForm from './components/UserForm';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import { Grid, Icon } from '@icedesign/base'
const { Row, Col } = Grid;
export default class EmployeeAdd extends Component {
  static displayName = 'EmployeeAdd';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const breadcrumb = [
      { text: '首页', link: '#' },
      { text: '员工管理', link: '#/employee/list' },
      { text: '添员工信息录入', link: '#/employee/add' },
    ];
    return (
      <div className="device-add-page">
        <div style={styles.top}>
          <Row style={styles.rowTop}>
            <Col style={styles.title}>
              <Icon type="account-filling" size={"xxl"} style={{ marginRight: '15px', color: '#000' }} />
              <b>员工信息录入</b>
            </Col>
          </Row>
        </div>
        <CustomBreadcrumb dataSource={breadcrumb} />
        <div style={styles.center}>
          <UserForm
            history={this.props.history}
            match={this.props.match} />
        </div>
      </div>
    );
  }
}
const styles = {
  rowTop: {
    marginLeft: '20px',
    // marginTop: '10px'
  },
  rowBottom: {
    marginLeft: '80px',
    // width: '60%',
    fontSize: '16px'
  },
  title: {
    fontSize: '20px',
    color: '#000'
    // marginBottom: '20px'
  },
  top: {
    padding: '15px 20px 15px 25px',
    background: '#fff',
    borderRadius: '5px 5px 0 0',
  },
  center: {
    background: '#eee',
    padding: '25px 40px 40px 40px',
    borderRadius: '5px'
  },
  pagination: {
    textAlign: 'right',
    paddingTop: '20px',
    paddingBottom: '10px',
  },
}
