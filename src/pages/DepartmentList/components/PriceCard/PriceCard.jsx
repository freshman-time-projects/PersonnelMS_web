import React, { Component } from 'react';
import { Grid, Card, Icon, Feedback, Dialog, Button } from '@icedesign/base';
import { divide } from 'gl-matrix/src/gl-matrix/vec4';
import { Item } from '@icedesign/menu';
import axios from 'axios';
import SimpleFormDialog from '../SimpleFormDialog';

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
      visible: false,
      id: 0
    }
  }
  onDelete = (d_id) => {
    console.log("id", d_id)
    const id = `{"d_id":${d_id}}`

    // if (key === 1) {
      axios
        .post("api/PersonnelMS/department_romove", JSON.parse(id))
        .then((res) => {
          console.log("OOO",res)
          const { data } = res
          if (data.code === 0) {
            Feedback.toast.success(data.msg)
            this.props.getDataAll()
          }
          else if (data.code === 3)
            Feedback.toast.error(data.msg)
          else
            Feedback.toast.error("异常！")

        })
    // } else
    //   alert(key)
  }

  dateleData = (d_id) => {
    this.setState({
      visible: 'true',
      id: d_id
    })

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
    console.log("visible", this.state.visible)
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
                        <Col fixedSpan="4"><div style={{ height: "100%", paddingTop: '10px' }}><Icon size="xl" type="loading" /></div></Col>
                        <Col>
                          <div className="onHover" style={styles.centerRight}>
                            <h3 style={styles.title}><Link to={`/spec/index/${item.token}`}>{item.name}</Link><Icon className="delete" style={{ float: 'right', paddingRight: '8px' }} onClick={() => { this.onDelete(`${item.d_id}`) }} type="ashbin" /></h3>
                            <p style={styles.description}>部门ID：{item.d_id}</p>
                            <p style={styles.description}>管理总管：{item.manager}</p>
                            <p style={styles.description}>部门描述：{item.description}</p>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="issue" style={styles.buyBtn}>
                      <Col l='8'><Link to={`/employee/${item.token}`}>员工数量：<b>{item.sumpeople}</b></Link></Col>
                      {/* <Col l='16'><Link to={`/department/${item.token}`}>创建时间：<b>{item.dataItemCount}</b></Link></Col> */}
                    </div>
                  </div>
                </Col>
              );
            })}
            <Col xxs="24" s="8" l="8">
              <div style={styles.addItem}>
                <div style={styles.head}>
                  <div style={styles.addBtn}>
                    <SimpleFormDialog
                      call={this.props.getDataAll}
                    />
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
    padding: '10px 30px 10px',
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
    textAlign: 'left',
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
    paddingTop: '30px',
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
