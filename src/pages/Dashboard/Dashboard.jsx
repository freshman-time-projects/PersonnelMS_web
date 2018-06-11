import React, { Component } from 'react';
import RealTimeStatistics from './components/RealTimeStatistics';
import ChartArea from './components/ChartArea';
import ChartPie from './components/ChartPie'
import ChartBar from './components/ChartBar'
import FeedList from './components/FeedList';
import { Grid, Tab, Icon, Feedback } from '@icedesign/base';
import axios from 'axios'

const { Row, Col } = Grid;

export default class Dashboard extends Component {
  static displayName = 'Dashboard';

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    // 加载数据
    axios.get(`/api/globalStatistics/count`).then((res) => {

      const data = res.data;
      console.log('data: ', res);
      console.log('data: ', res.data.content);
      if (data.code === 0) {
        this.setState({
          data: data.content
        });
      } else if (data.code === 1) {
        Feedback.toast.error("您未登录，请登录！")
        this.props.history.push("/login")
      }
    });
  }
  render() {
    const { data } = this.state
    return (
      <div className="dashboard-page">
        <div style={styles.center}>
          <RealTimeStatistics dataList={this.state.data} />
          <Row style={{ paddingLeft: '20px', backgroundColor: '#fff', marginTop: '15px', borderBottom: '1px solid #E9E9E9' }}>
            <h2><b>数据上传分布</b></h2>
          </Row>
          <Row style={{ backgroundColor: '#fff',}}>
            <Col span={16} style={{ padding: 20, borderRight: '1px solid #E9E9E9' }}>
            <ChartBar />
            <ChartPie />
           
            </Col>
            <Col span={8}>
                <div style={{ paddingLeft: '30px', paddingTop: '30px' }}>
                <p>总数据量</p>
                <p style={styles.data}>{data.measurementsCount}</p>
                <p><span style={styles.dataGreen}><Icon type="arrow-up-filling" />10%</span>同比上周</p>
              </div>
              <div style={{ marginTop: 40, paddingLeft: '30px' }}>
                <p>本周数据量</p>
                <p style={styles.data}>{data.measurementsCount}</p>
                <p><span style={styles.dataRed}><Icon type="arrow-down-filling" />10%</span>同比上周</p>
              </div>
            </Col>

          </Row>
          {/* <div>
            <Row style={styles.centerBottom}>
              <Col>
                <Row style={{ paddingLeft: '20px', color: '#000', backgroundColor: '#fff', borderBottom: '1px solid #E9E9E9' }}>
                  <h2><b>设备分布</b></h2>
                </Row>
                <Row>
                  <div style={styles.mapp}>
                    <Map amapkey={'eeb54f1e1bac5e5237b307344ad8e268'} version={'1.4.0'} zoom={6}>
                      <Marker position={{ longitude: '113.65', latitude: '34.76' }} ></Marker>
                    </Map>
                  </div>

                </Row>
              </Col>
              <Col style={{ marginLeft: '20px' }} fixedSpan="16">
                <FeedList />
              </Col>
            </Row>
          </div> */}

        </div>

      </div>
    );
  }
}
const styles = {
  center: {
    background: '#eee',
    padding: '30px 40px',
    borderRadius: '6px 6px 0 0',
  },
  data: {
    fontSize: '28px',
    color: '#000',
    marginTop: 0
  },
  dataGreen: {
    color: '#31B48D',
    fontSize: '18px',
  },
  dataRed: {
    color: '#f00',
    fontSize: '18px',
  },
  centerBottom: {
    marginTop: '25px',
  },
  mapp: {
    width: '100%',
    height: '400px',
  }
}
