import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@icedesign/base';

const { Row, Col } = Grid;

const dataSource = [
  {
    nickName: '无法检测到温度传感器',
    datetime: '2分钟前',
    avatar: 'https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png',
    message: '1021030',
  },
  {
    nickName: '无法检测到温度传感器',
    datetime: '3分钟前',
    avatar: 'https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png',
    message: '1021030',
  },
  {
    nickName: '无法检测到温度传感器',
    datetime: '5分钟前',
    avatar: 'https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png',
    message: '1021030',
  },
  {
    nickName: '无法检测到温度传感器',
    datetime: '1天前',
    avatar: 'https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png',
    message: '1021030',
  },
  {
    nickName: '无法检测到温度传感器',
    datetime: '2天前',
    avatar: 'https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png',
    message:
      '1021030',
  },
];

export default class FeedList extends Component {
  static displayName = 'FeedList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  // ICE: React Component 的生命周期

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}
  renderItem = (item, idx) => {
    return (
      <div style={styles.item} key={idx}>
        <div style={styles.itemRow}>
          <span style={styles.title}>
            <img src={item.avatar} style={styles.avatar} alt="avatar" />
            {item.nickName} 
          </span>
          <span style={styles.status}>{item.datetime}</span>
        </div>
        <a href="##" style={styles.message}>
          错误代码：{item.message}
        </a>
      </div>
    );
  };

  render() {
    return (
      <div className="feed-list">
        <IceContainer>
          <div style={{ borderBottom: '1px solid #D1D1D1' ,paddingBottom:'10px'}}>
            <Row>
              <Col style={{textAlign:'left',fontSize:'16px',color:'#000'}}><b>消息通知</b></Col>
              <Col style={{textAlign:'right', paddingTop:'3px'}}><a href="##">更多</a></Col>
            </Row>
          </div>
          {dataSource.map(this.renderItem)}
          {/* <div style={styles.allMessage}>
            <a href="##">更多</a>
          </div> */}
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  cardTitle: {
    margin: 0,
    fontSize: '18px',
    display: 'inline-flex',
  },
  title: {
    fontSize: '14px',
    display: 'inline-flex',
    lineHeight: '22px',
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    color: '#999',
    fontSize: '12px',
  },
  itemRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '15px',
    borderBottom: '1px solid #fafafa',
  },
  message: {
    color: '#999',
    fontSize: '12px',
    paddingLeft: '34px',
    marginBottom: '15px',
    lineHeight: '22px',
  },
  allMessage: {
    textAlign: 'center',
    height: '50px',
    lineHeight: '50px',
  },
};
