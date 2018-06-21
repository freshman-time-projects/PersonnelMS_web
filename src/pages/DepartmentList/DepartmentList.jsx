import React, { Component } from 'react';
import PriceCard from './components/PriceCard';
import { Card, Icon, Grid, Feedback, Button } from '@icedesign/base'
import { Link } from 'react-router-dom';
import Header from './../../components/Header';
import cx from 'classnames';
import Layout from '@icedesign/layout';
import './scss/light.scss';
import './scss/dark.scss';
import axios from 'axios';
const { Row, Col } = Grid;
export default class DepartmentList extends Component {
  static displayName = 'DepartmentList';

  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      departmentCount: 0,
    };
  }
  getDataAll = () => {
  // 加载数据
  axios.get(`api/PersonnelMS/department_getSum`).then((res) => {
    const data = res.data;
    console.log("content", res)
    console.log("code", res.data)
    if (data.code === 0) {
      this.setState({
        dataList: data.content,
        departmentCount: res.data.content.length
      })
    } else if (data.code === 2) {
      Feedback.toast.error("您未登录，请登录！")
      this.props.history.push("/login")
    }
    // this.getPageData(sdji, jis)
  });
  }
  componentWillMount() {
    this.getDataAll();
  }
  render() {
    const { dataList, departmentCount } = this.state
    console.log("ddd", dataList)
    return (
      <Layout
        style={{ minHeight: '100vh' }}
        className={cx(
          `ice-design-header-aside-footer-responsive-layout-dark`,
          {
            'ice-design-layout': true,
          }
        )}
      >
        <Card style={{ borderRadius: '5px', marginBottom: '10px', padding: '10px 30px' }} bodyHeight="auto">
          <Row tyle="fluid" align="center">
            <Col span={18}>
              <ul>
                <li><h1>部门列表</h1></li>
                <li>
                {departmentCount}个部门</li>
                <li style={{ marginTop: '10px' }}>
                  <span style={{ color: '#55abec' }}><Icon style={{ padding: '5px' }} type="skip" /><Link to=""></Link>快速开始</span>
                  <span style={{ padding: '15px', margin: '5px', color: '#55abec' }}><Icon type="comments" style={{ padding: '5px' }} /><Link to=""></Link>产品简介</span>
                  <span style={{ margin: '5px', color: '#55abec' }}><Icon type="form" style={{ padding: '5px' }} /><Link to=""></Link>产品文档</span>
                </li>
              </ul>
            </Col>
            <Col span={6}>
              <img width="100px" src="http://112.74.168.74:7777/images/%E8%A7%84%E6%A0%BC%E5%88%97%E8%A1%A8/u511.png" alt="" />
            </Col>
          </Row>
        </Card>
        <PriceCard 
        getDataAll={this.getDataAll}
        dataList={dataList} />
      </Layout>
    );
  }
}
