import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { Input, Button, Select, Grid, DatePicker } from '@icedesign/base';
import LittleTable from '../LiteTable';
import SelectTable from '../SelectableTable';
import axios from 'axios'
const { Row, Col } = Grid;

export default class ColumnForm extends Component {
  static displayName = 'ColumnForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      value: {
        userName: '',
        userNumber: '',
      },
      totalCount: 0,
      current: 1
    };
  }
  //日期 
  getPageData = (current) => {
    console.log('current: ', current);
    axios
      .get(`api/PersonnelMS/user_getAllPage?current=${current}`).then((res) => {
        const data = res.data;
        // const { totalCount } = data.content
        console.log("datass", res)
        if (data.code === 0) {
          console.log("data", data)
          this.setState({
            dataList: data.content,
            totalCount: data.userCount,
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
        email: '',
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
        .post("api/PersonnelMS/user_search", value)
        .then((res) => {
          console.log("reess", res)
          this.setState({
            dataList: res.data.content
          })
        })
    });
  };
  render() {
    const { startValue, endValue, endOpen, dataList } = this.state;
    console.log("----", dataList)
    return (
      <div className="column-form" style={{ backgroundColor: '#EEE', padding: '30px' }}>
        <IceContainer title="用户信息" style={styles.container}>
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
                        用户名：
</Col>
                      <Col>
                        <IceFormBinder
                          name="username"
                        >
                          <Input />
                        </IceFormBinder>
                      </Col>
                      <Col span='4' style={{ marginLeft: '20px' }}>
                        邮箱：
</Col>
                      <Col>
                        <IceFormBinder
                          name="email"
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
        </IceContainer>

        <SelectTable 
        totalCount={this.state.totalCount}
        dataList={dataList} />
      </div>
    );
  }
}

const styles = {
  container: {
    paddingBottom: 0,
    marginTop: 30,
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
