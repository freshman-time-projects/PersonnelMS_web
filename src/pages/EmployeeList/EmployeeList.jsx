import React, { Component } from 'react';
import SelectableTable from './components/SelectableTable';
import { Grid, Icon, Feedback, Button ,Input, Select } from '@icedesign/base';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import IceContainer from '@icedesign/container';
import ColumnForm from './components/ColumnForm';
import TabTable from './components/TabTable';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import axios from 'axios'
const { Row, Col } = Grid;
export default class EmployeeList extends Component {
  static displayName = 'EmployeeList';
  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: '',
        department: '',
      },
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
  onFormChange = (value) => {
    this.setState({
      value,
    });
  };

  reset = () => {
    this.setState({
      value: {
        name: '',
        department: '',
      },
    });
  };

  submit = () => {
    this.formRef.validateAll((error, value) => {
      console.log('error', error, 'value', value);
      if (error) {
        // 处理表单报错
      }
      // 提交当前填写的数据
      axios
        .post("api/PersonnelMS/employee_search", value)
        .then((res) => {
          console.log("reess", res)
          if(res.data.content!=null){
          this.setState({
            dataList:res.data.content,
            totalCount:res.data.content.length
          })
        }else
        Feedback.toast.error(res.data.msg)
        })
    });
  };
  render() {
    // console.log("收到",this.props.location.state.specificationToken)
    // const {specificationToken,specCreatetime,specDescription} = this.props.location.state
    const { dataList, specData } = this.state;
    const breadcrumb = [
      { text: '首页', link: '#' },
      { text: '员工管理', link: '#/employee/list' },
      { text: '员工信息查看', link: '#/employee/list' },
    ];
    return (
      <div className="device-list-page">
        <div style={styles.top}>
          <Row style={styles.rowTop}>
            <Col style={styles.title}>
              <Icon type="account-filling" size={"xxl"} style={{ marginRight: '15px', color: '#000' }} />
              <b>员工列表</b>
            </Col>
          </Row>
        </div>
        <CustomBreadcrumb dataSource={breadcrumb} />
        <div style={styles.center}>
          <IceContainer >

            <div className="column-form">

              <IceFormBinderWrapper
                ref={(formRef) => {
                  this.formRef = formRef;
                }}
                value={this.state.value}
                onChange={this.onFormChange}
              >
                <div style={{ borderBottom: '3px solid' }}>
                  <Row style={{ margin: '25px' }}>
                    <Col>
                      <Row style={styles.formItem}>
                        <Col span='4' style={{ marginLeft: '20px' }}>
                          员工姓名：
            </Col>
                        <Col>
                          <IceFormBinder
                            name="name"
                          >
                            <Input />
                          </IceFormBinder>
                        </Col>
                        <Col span='4' style={{ marginLeft: '20px' }}>
                          部门：
            </Col>
                        <Col>
                          <IceFormBinder
                            name="department"
                          >
                            <Input />
                          </IceFormBinder>
                        </Col>
                      </Row>
                    </Col>
                    <Col style={{ textAlign: 'right' }}>
                      <Button type="primary" size="medium" onClick={this.submit}>
                        查询
          </Button>
                      <Button size="medium" style={styles.resetBtn} onClick={this.reset}>
                        重置
          </Button>
                    </Col>
                  </Row>
                </div>
              </IceFormBinderWrapper>

            </div>
            <TabTable
              current={this.state.current}
              data={this.state.dataList}
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
    borderRadius: '5px'
  },
  pagination: {
    textAlign: 'right',
    paddingTop: '20px',
    paddingBottom: '10px',
  },
    container: {
      paddingBottom: 0,
    },
    formItem: {
      height: '28px',
      lineHeight: '28px',
      marginBottom: '30px',
    },
    formLabel: {
      textAlign: 'right',
    },
    btns: {
      margin: '25px 0',
    },
    resetBtn: {
      marginLeft: '20px',
      textAlign: 'right',
    },
}
