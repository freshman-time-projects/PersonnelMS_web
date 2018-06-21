import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import TagTable from './components/TagTable';
import { Grid, Icon } from '@icedesign/base';
const { Row, Col } = Grid;
export default class UserList extends Component {
  static displayName = 'UserList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '首页', link: '#' },
      { text: '薪金管理', link: '#/salary' },
      { text: '薪金列表', link: '#/salary' },
    ];
    return (

      <div className="user-list-page" >
        <div style={styles.top}>
          <Row style={styles.rowTop}>
            <Col style={styles.title}>
              <Icon type="dollar" size={"xxl"} style={{ marginRight: '15px', color: '#000' }} />
              <b>薪金列表</b>
            </Col>
          </Row>
        </div>
        <CustomBreadcrumb dataSource={breadcrumb} />
        <TagTable />

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
    borderRadius: '5px 5px 0 0'
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
  container: {
    paddingBottom: 0,
  },
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '30px',
  },
  formLabel: {
    textAlign: 'right',
  },
  btns: {
    margin: '25px 0',
  },
  resetBtn: {
    marginLeft: '20px',
    textAlign: 'right',
  },
}