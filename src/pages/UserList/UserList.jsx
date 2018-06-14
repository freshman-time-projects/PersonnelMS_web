import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import { Grid, Tab, Feedback, Icon } from '@icedesign/base';
import ColumnForm from './components/ColumnForm';
const { Row, Col } = Grid;
import axios from 'axios'


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
      current:1,
    };
  }
  getPageData = (current) => {
    console.log('current: ', current);
    const { userStatus } = this.state
    axios
      .get(`api/PersonnelMS/user_getAllpage?current=1`).then((res) => {

        const data = res.data;
        const { totalCount } = data.content
        console.log("ttt", totalCount)
        const dataList = data.content.list
        this.setState({
          dataList
        })
        if (data.code === 0) {
          this.setState({
            dataList: data.content.list,
            current,
            totalCount
          });
        } else if (data.code === 1) {
          Feedback.toast.error("您未登录，请登录！")
          this.props.history.push("/login")
        }
        // this.getPageData(sdji, jis)
      });
  }

  componentWillMount() {
    this.getPageData(1);
  }
  render() { 

    const editAdmin = [
      { text: '首页', link: '' },
      { text: '用户管理', link: '#/user' },

    ];
    return <div className="user-audit-page" >
      <div style={styles.top}>
        <Row style={styles.rowTop}>
          <Col style={styles.title}>
            <Icon type="comments" size={"xxl"} style={{ marginRight: '15px', color: '#000' }} />
            <b>用户管理</b>
          </Col>
        </Row>
      </div>
      <CustomBreadcrumb 
      dataSource={editAdmin}
      current={this.state.current}
      />
      <ColumnForm />


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
