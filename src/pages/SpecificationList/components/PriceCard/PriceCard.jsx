import React, { Component } from 'react';
import { Grid, Card, Icon } from '@icedesign/base';
import { divide } from 'gl-matrix/src/gl-matrix/vec4';
import { Item } from '@icedesign/menu';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Base } from 'bizcharts';
const { Row, Col } = Grid;
const BaseUrl = "http://192.168.167.179:8081/iot-admin"
export default class PriceCard extends Component {

  static displayName = 'PriceCard';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSourse: [],
    }
  }

  componentWillMount() {
    this.setState({
      dataSourse: this.props.dataList,
    }, () => {
      console.log('dataSourse: ', this.state.dataSourse);

    })
  }
  go = (specificationToken) => {
    const { data } = this.props;
    location.href = `api/E_wardrobe/user_login?`
  }
  render() {
    console.log("----**", this.props.dataList);
    const dataSourse = this.props.dataList;
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <Row gutter="20" wrap>
            {dataSourse.map((item, index) => {
              return (
                <Col xxs="24" s="8" l="8" key={index}>
                  <div style={styles.item}>
                    <div style={styles.head}>
                      <Row align="top">
                        <Col fixedSpan="4"><div style={{ height: "100%", paddingTop: '10px' }}><img src={`${BaseUrl}/${item.image}`}></img></div></Col>
                        <Col>
                          <div style={styles.centerRight}>
                            <h3 style={styles.title}><Link to={`/spec/index/${item.token}`}>{item.name}</Link></h3>

                            <p style={styles.description}>衣服ID：{item.clothes_id}</p>
                            <p style={styles.description}>温度：{item.Temperature}</p>
                            <p style={styles.description}>湿度：{item.Humidness}</p>
                          </div>

                        </Col>
                      </Row>
                    </div>
                    <div style={styles.buyBtn}>
                      <Col l='8'><Link to={`/device/${item.token}`}><b>{item.deviceCount}</b>台设备</Link></Col>
                      <Col l='8'><Link to={`/data/${item.token}`}><b>{item.dataItemCount}</b>种数据项</Link></Col>
                      <Col l='8'><Link to={`/cmd/${item.token}`}><b>{item.commandCount}</b>种指令</Link></Col>
                    </div>
                  </div>
                </Col>
              );
            })}
            <Col xxs="24" s="8" l="8">
              <div style={styles.addItem}>
                <div style={styles.head}>
                  <div style={styles.addBtn}>
                    <Link to="/spec/add/" style={styles.link}>
                      <Icon type="add" />添加规格
                      </Link>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <div>

          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    background:
      '#f5f5f5',
    borderRadius: 0,
    width: '100%',
    padding: '20px 0',
    border: '1px solid #CCC',
  },
  content: {
    maxWidth: '1080px',
    margin: '20px auto',
    overflow: 'hidden',

  },
  centerRight: {
    textAlign: 'left',
    // height:'100px',
  },
  item: {
    marginBottom: '20px',
    // padding: '20px 30px 20px',
    background: '#fff',
    borderRadius: '6px',
    border: '1px solid #D3D3D3',
    width: '360px'
  },
  addItem: {
    marginBottom: '20px',
    padding: '20px 30px 60px',
    background: '#fff',
    borderRadius: '6px',
    border: '1px dashed #D3D3D3',
    width: '360px'
  },
  head: {
    padding: '30px 0',
    textAlign: 'left',
    borderRadius: '6px 6px 0 0',
    padding: '20px 8px 20px 30px',
    height: '160px',
    width: '100%'
  },
  title: {
    margin: '0 0 5px',
    fontWeight: 'bold',
    fontSize: '20px',
    textAlign: 'left',
  },
  price: {
    margin: 0,
    fontWeight: 'bold',
    fontSize: '22px',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
  description: {
    marginTop: '10px 5px',
    lineHeight: '22px',
    textAlign: 'left',
    width: '100%',
    fontSize: '15px',
    color: '#999',
  },
  buyBtn: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    background: '#DCDCDC',
    width: '100%',
    height: '100%',
    padding: '20px 30px 20px',
    fontSize: '15px',
    borderRadius: '0 0 6px 6px',
  },
  addBtn: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '20px 30px 20px',
    fontSize: '15px',
    borderRadius: '6px',
  },
  link: {
    padding: '6px 15px',
    background: '#3080FE',
    borderRadius: '16px',
    color: '#fff',
    fontSize: '16px',
  },
};
