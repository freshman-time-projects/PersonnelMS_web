import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import { Grid, Tab, Icon, Feedback } from '@icedesign/base';
import ColumnForm from './components/ColumnForm';
import ProgressTable from './components/ProgressTable';
const { Row, Col } = Grid;
const TabPane = Tab.TabPane;

function handleChange(key) {
  console.log("change", key);
}

function handleClick(key) {
  console.log("click", key);
}
export default class UserAudit extends Component {
  static displayName = 'UserAudit';

  constructor(props) {
    super(props);
    this.state = {
      value: {

      },
    };
  }

  render() {
    const tabs = [
      { tab: "待审核", key: "home", content: <ColumnForm userStatus="%E5%BE%85%E5%AE%A1%E6%A0%B8" history={this.props.history} /> },
      { tab: "已拒绝", key: "doc", content: <ColumnForm userStatus="%E5%B7%B2%E6%8B%92%E7%BB%9D" history={this.props.history} /> },

    ];

    const editAdmin = [
      { text: '首页', link: '' },
      { text: '用户审核', link: `#/recruit` },

    ];
    return <div className="user-audit-page" >
      <div style={styles.top}>
        <Row style={styles.rowTop}>
          <Col style={styles.title}>
            <Icon type="comments" size={"xxl"} style={{ marginRight: '15px', color: '#000' }} />
            <b>面试列表</b>
          </Col>
        </Row>
      </div>
      <CustomBreadcrumb dataSource={editAdmin} />
      <Tab onChange={handleChange} style={{ backgroundColor: '#fff' }}>
        {tabs.map(item => (
          <TabPane key={item.key} tab={item.tab} onClick={handleClick}>
            {item.content}
          </TabPane>
        ))}
      </Tab>




    </div>;
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
}