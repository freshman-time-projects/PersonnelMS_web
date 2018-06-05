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
export default class SpecificationList extends Component {
  static displayName = 'SpecificationList';

  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      idd: 'www'
    };
  }
  componentWillMount() {

    // 加载数据
    axios.get(`api/E_wardrobe/clothes_show`).then((res) => {
      const data = res.data;
      console.log("content",res)
      console.log("code",res.data)
      console.log("content2",res.data.content)
      if (data.code === 0) {
        this.setState({
          dataList : data.content
        })
      } else if (data.code === 2) {
        Feedback.toast.error("您未登录，请登录！")
        this.props.history.push("/login")
      }
      // this.getPageData(sdji, jis)
    });
  }
  render() {
    const { dataList, count } = this.state
    console.log("ddd",dataList)
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
        <Header theme="dark" isMobile={this.state.isScreen !== 'isDesktop'} />
        <Card style={{ borderRadius: '5px', marginBottom: '10px', padding: '10px 30px' }} bodyHeight="auto">

          <Row tyle="fluid" align="center">
            <Col span={18}>
              <ul>
                <li><h1>{count}个规格</h1></li>
                <li>
                  段落示意：物联网数据平台，用最小的工作量，无缝接入智能硬件管理，
提供跨越设计与开发的体验解决方案。</li>
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
        <PriceCard dataList={dataList} />

      </Layout>
    );
  }
}
