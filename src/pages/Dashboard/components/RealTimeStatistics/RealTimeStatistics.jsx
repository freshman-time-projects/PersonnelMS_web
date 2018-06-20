import React, { Component } from 'react';
import { Grid, Icon } from '@icedesign/base';
import { Link } from 'react-router-dom'
import '../../Dashboard.scss'
const { Row, Col } = Grid;

export default class RealTimeStatistics extends Component {
  static displayName = 'RealTimeStatistics';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
    };
  }

  render() {
    const { dataList } = this.props
    return (
      <div className="real-time-statistics">
        <Row wrap gutter="20" style={styles.items}>
          <Col xxs="24" s="12" l="6" className="onHover">
            <Link to="/department">
              <div style={{ ...styles.itemBody, ...styles.bc }}>
                <div style={styles.itemTitle}>
                  <p style={styles.titleText}>部门数量</p>
                  <span style={styles.tag}><Icon className="icon" type="favorites-filling" /></span>
                </div>
                <div style={styles.itemContent}>
                  <h2 style={styles.itemNum}>{dataList.departmentCount}</h2>
                </div>
              </div>
            </Link>
          </Col>
          <Col xxs="24" s="12" l="6" className="onHover">
            <Link to="/employee/list">
              <div style={{ ...styles.itemBody, ...styles.bc }}>
                <div style={styles.itemTitle}>
                  <p style={styles.titleText}>员工数量</p>
                  <span style={styles.tag}><Icon className="icon" type="favorites-filling" /></span>
                </div>
                <div style={styles.itemContent}>
                  <h2 style={styles.itemNum}>{dataList.employeeCount}</h2>
                </div>
              </div>
            </Link>
          </Col>
          <Col xxs="24" s="12" l="6" className="onHover">
            <Link to="/recruit">
              <div style={{ ...styles.itemBody, ...styles.bc }}>
                <div style={styles.itemTitle}>
                  <p style={styles.titleText}>求职信息</p>
                  <span style={styles.tag}><Icon className="icon" type="favorites-filling" /></span>
                </div>
                <div style={styles.itemRow}>
                  <div style={styles.itemCol}>
                    <h2 style={styles.itemNum}>{dataList.recruitCount}</h2>
                  </div>
                </div>
              </div>
            </Link>
          </Col>
          <Col xxs="24" s="12" l="6" className="onHover">
            <Link to="/recruit/list">
              <div style={{ ...styles.itemBody, ...styles.bc }}>
                <div style={styles.itemTitle}>
                  <p style={styles.titleText}>待面试</p>
                  <span style={styles.tag}><Icon className="icon" type="favorites-filling" /></span>
                </div>
                <div style={styles.itemRow}>
                  <div style={styles.itemCol}>
                    <h2 style={styles.itemNum}>{dataList.faceCount}</h2>
                  </div>
                </div>
              </div>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}

const styles = {
  item: {
    marginBottom: '20px',
  },
  itemBody: {
    marginBottom: '20px',
    padding: '20px 0 20px 35px ',
    // borderRadius: '4px',
    color: '#000',
    height: '110px',
  },
  itemRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTitle: {
    position: 'relative',
  },
  titleText: {
    margin: 0,
    fontSize: '16px',
  },
  tag: {
    position: 'absolute',
    right: 20,
    top: -5,
    padding: '2px 4px',
    borderRadius: '4px',
    fontSize: '12px',
    // background: 'rgba(255, 255, 255, 0.3)',
  },
  itemNum: {
    margin: '16px 0',
    fontSize: '32px',
  },
  total: {
    margin: 0,
    fontSize: '12px',
  },
  desc: {
    margin: 0,
    fontSize: '12px',
  },
  bc: {
    background: '#fff',
  },
  lightBlue: {
    background: '#fff',
  },
  darkBlue: {
    background: '#7538C7',
  },
  navyBlue: {
    background: '#3B67A4',
  },
};
