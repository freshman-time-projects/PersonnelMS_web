import React, { Component } from 'react';
import SelectableTable from './components/SelectableTable';
import { Grid, Icon, Feedback, Button } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import ColumnForm from './components/ColumnForm';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import TabTable from './components/TabTable';
import axios from 'axios'
import history from 'react-router-dom'
const { Row, Col } = Grid;

export default class DeviceList extends Component {
  static displayName = 'DeviceList';
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      specData: [],
      list: [],
      current: 1,
      totalCount: 0,
    };
    console.log(props)
  }
  onEditChange = (editData, index) => {
    this.state.dataList[index] = editData
    this.setState({
      dataList: this.state.dataList
    })
  }

  getPageData = (current) => {
    const specificationToken = this.props.match.params.spectoken
    console.log('specificationToken: ', specificationToken);
    console.log('current: ', current);
    axios
      .get(`api/PersonnelMS/employeeAnddepartment_getSize_page?current=${current}`).then((res) => {
        const data = res.data;
        // const { totalCount } = data.content
        console.log("datass", res)
        if (data.code === 0) {
          console.log("data2222", data)
          this.setState({
            dataList: data.content,
            totalCount: data.totalCount,
            current,
            // totalCount
          });
        } else if (data.code === 1) {
          Feedback.toast.error("您未登录，请登录！")
          this.props.history.push("/login")
        }

        // this.getPageData(sdji, jis)
      });
  }
  componentDidMount() {
    this.getPageData(1)

    // 加载数据
    // const specificationToken = this.props.location.state.specificationToken

  }
  // getPageData(pageRequest, param) => {
  //   axios.get('url', {}).
  // }
  render() {
    // console.log("收到",this.props.location.state.specificationToken)
    // const {specificationToken,specCreatetime,specDescription} = this.props.location.state
    const { dataList, specData } = this.state;
    const breadcrumb = [
      { text: '首页', link: '#' },
      { text: '招聘管理', link: '#/recruit' },
      { text: '面试列表', link: '#/recruit/list' },
    ];
    console.log("*@#$@$", this.state.specData)
    return (
      <div className="device-list-page">
        <div style={styles.top}>
          <Row style={styles.rowTop}>
            <Col style={styles.title}> 
              <Icon type="comments" size={"xxl"} style={{ marginRight: '15px', color: '#000' }} />
              <b>面试列表</b>
            </Col>
          </Row>
        </div>
        <CustomBreadcrumb dataSource={breadcrumb}/>
        <div style={styles.center}>
          <IceContainer>
            <ColumnForm />
            <TabTable
              current={this.state.current}
              data={dataList}
              totalCount={this.state.totalCount}
              call={this.getPageData}
              onEditChange={this.onEditChange}
              spectoken={this.props.match.params.spectoken}
              history={this.props.history}
            />
            {/* <SelectableTable /> */}

            {/* <SelectableTable data ={this.state.dataList}/> */}
          </IceContainer>
        </div>

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
    borderRadius:'5px'
  },
  pagination: {
    textAlign: 'right',
    paddingTop: '20px',
    paddingBottom: '10px',
  },
}
