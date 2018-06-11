import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { Input, Button, Select, Grid, DatePicker, Feedback } from '@icedesign/base';
import LittleTable from '../LiteTable';
import SelectTable from '../SelectableTable';
import axios from 'axios';
const { Row, Col } = Grid;

export default class ColumnForm extends Component {
  static displayName = 'ColumnForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        username: '',
        id: '',
        phone: '',
        email: '',
        userRemark: '',
        startValue: null,
        endValue: null,
        endOpen: false
      },
      userStatus: '',
      dataList: [],
      totalCount: 0,
    };
  }
  //日期 
  getPageData = (current) => {
    console.log('current: ', current);
    const { userStatus } = this.state
    axios
      .get(`/api/users/page?current=${current}&userStatus=${this.props.userStatus}`).then((res) => {

        const data = res.data;
        const { totalCount } = data.content
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

  componentDidMount() {
    this.getPageData(1);
  }


  disabledStartDate(startValue) {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate(endValue) {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onChange(field, value) {
    this.setState({
      [field]: value
    });
  }

  onStartChange(value) {
    this.onChange("startValue", value);
  }

  onEndChange(value) {
    this.onChange("endValue", value);
  }

  handleStartOpenChange(open) {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange(open) {
    this.setState({ endOpen: open });
  }



  // 上方日历时间
  onFormChange = (value) => {
    this.setState({
      value,
    });
  };

  reset = () => {
    this.setState({
      value: {
        username: '',
        id: '',
        phone: '',
        email: '',
        userRemark: '',
        startValue: null,
        endValue: null,
        endOpen: false
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
    });
  };

  render() {
    const { startValue, endValue, endOpen, dataList } = this.state;
    return (
      <div className="column-form">
        <IceContainer title="用户信息" style={styles.container}>
          <IceFormBinderWrapper
            ref={(formRef) => {
              this.formRef = formRef;
            }}
            value={this.state.value}
            onChange={this.onFormChange}
          >
            <div>
              <Row wrap>
                <Col xxs="24" s="12" l="12">
                  {/* <Row style={styles.formItem}>
                    <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                      用户姓名:
                            </Col>

                    <Col s="12" l="10">
                      <IceFormBinder
                        name="userName"
                        required
                        message="姓名填写!"
                      >
                        <Input style={{ width: '100%' }} />
                      </IceFormBinder>
                      <IceFormError name="userName" />
                    </Col>
                  </Row>

                  <Row style={styles.formItem}>
                    <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                      用户编号:
                            </Col>
                    <Col s="12" l="10">
                      <IceFormBinder
                        name="userNumber"
                        required
                        message="必须填写"
                      >
                        <Input style={{ width: '100%' }} />
                      </IceFormBinder>
                      <IceFormError name="userNumber" />
                    </Col>
                  </Row>

                  <Row style={styles.formItem}>
                    <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                      用户电话:
                            </Col>
                    <Col s="12" l="10">
                      <IceFormBinder
                        name="userphone"
                        required
                        message="必填"
                      >
                        <Input style={{ width: '100%' }} />
                      </IceFormBinder>
                      <IceFormError name="userphone" />
                    </Col>
                  </Row>


                </Col>

                <Col xxs="24" s="12" l="12">
                  <Row style={styles.formItem}>
                    <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                      用户邮箱
                            </Col>

                    <Col s="12" l="10">
                      <IceFormBinder
                        name="userEmail"
                        required
                        message="必须填写"
                      >
                        <Input style={{ width: '100%' }} />
                      </IceFormBinder>
                      <IceFormError name="userEmail" />
                    </Col>
                  </Row>

                  <Row style={styles.formItem}>
                    <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                      用户备注:
                            </Col>

                    <Col s="12" l="10">
                      <IceFormBinder
                        name="userRemark"
                        required
                        message="必须填写"
                      >
                        <Input style={{ width: '100%' }} />
                      </IceFormBinder>
                      <IceFormError name="userRemark" />
                    </Col>
                  </Row>

                  <Row style={styles.formItem}>
                    <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                      注册时间:
                            </Col>

                    <Col s="12" l="10">
                      <DatePicker
                        disabledDate={this.disabledEndDate.bind(this)}
                        showTime
                        value={endValue}
                        placeholder="End"
                        onChange={this.onEndChange.bind(this)}
                        open={endOpen}
                        onOpenChange={this.handleEndOpenChange.bind(this)}
                      />
                    </Col>
                  </Row> */}

                  <Row style={styles.formItem}>
                    <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                      用户姓名:
                            </Col>

                    <Col s="12" l="10">
                      <IceFormBinder
                        name="userName"
                        required
                        message="姓名填写!"
                      >
                        <Input style={{ width: '100%' }} />
                      </IceFormBinder>
                      <IceFormError name="userName" />
                    </Col>
                    <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                      用户编号:
                            </Col>
                    <Col s="12" l="10">
                      <IceFormBinder
                        name="userNumber"
                        required
                        message="必须填写"
                      >
                        <Input style={{ width: '100%' }} />
                      </IceFormBinder>
                      <IceFormError name="userNumber" />
                    </Col>

                    <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                      用户备注:
                            </Col>

                    <Col s="12" l="10">
                      <IceFormBinder
                        name="userRemark"
                        required
                        message="必须填写"
                      >
                        <Input style={{ width: '100%' }} />
                      </IceFormBinder>
                      <IceFormError name="userRemark" />
                    </Col>
                  </Row>

                  <Row style={styles.formItem}>
                      <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                      用户邮箱
                            </Col>

                      <Col s="12" l="10">
                      <IceFormBinder
                        name="userEmail"
                        required
                        message="必须填写"
                      >
                        <Input style={{ width: '100%' }} />
                      </IceFormBinder>
                      <IceFormError name="userEmail" />
                    </Col>
                    <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                      用户电话:
                            </Col>
                    <Col s="12" l="10">
                      <IceFormBinder
                        name="userphone"
                        required
                        message="必填"
                      >
                        <Input style={{ width: '100%' }} />
                      </IceFormBinder>
                      <IceFormError name="userphone" />
                    </Col>
                    <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                      注册时间:
                            </Col>

                    <Col s="12" l="10">
                      <DatePicker
                        style={{width:'100%'}}
                        disabledDate={this.disabledEndDate.bind(this)}
                        showTime
                        value={endValue}
                        placeholder="End"
                        onChange={this.onEndChange.bind(this)}
                        open={endOpen}
                        onOpenChange={this.handleEndOpenChange.bind(this)}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row style={styles.btns}>
                <Col xxs="8" s="2" l="12" style={styles.formLabel}>
                  {' '}
                </Col>
                <Col s="12" l="10">
                  <Button type="primary" onClick={this.submit}>
                    查询
                          </Button>
                  <Button style={styles.resetBtn} onClick={this.reset}>
                    重置
                          </Button>
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>
        </IceContainer>


        <SelectTable
          call={this.getPageData}
          totalCount={this.state.totalCount}
          dataList={dataList}
          pageCall={this.getPageData}
        />
      </div>
    );
  }
}

const styles = {
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
    textAlign: 'right'
  },
  resetBtn: {
    marginLeft: '20px',
  },
};
