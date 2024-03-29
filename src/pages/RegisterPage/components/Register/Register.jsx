/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Input, Button, Checkbox, Radio, Dialog, Grid, Feedback, Select } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/icon';
import { Link } from "react-router-dom";
import './Register.scss';
import axios from 'axios';
import { enquireScreen } from 'enquire-js';

const { Group: RadioGroup } = Radio;
const defaultvaluer = {
  name: '',
  sex: '',
  school: '',
  filepath: '',
  email: '',
  state: 0
};

const { Row, Col } = Grid;
export default class Register extends Component {
  static displayName = 'Register';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      valuer: defaultvaluer,
      isMobile: false,
      value: {
        account: '',
        username: '',
        email: '',
        passwd: '',
        rePasswd: '',
      },
    };
  }
  componentDidMount() {
    this.enquireScreenRegister();
  }

  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };

  showDialog = () => {
    console.log("UUUUU", this.state.value);
    this.state.valuer.email = this.state.value.email
    this.state.valuer.name = this.state.value.account
    this.setState({
      visible: true,
    });
  };

  hideDialog = () => {
    this.setState({
      visible: false,
    });
  };

  onOk = () => {
    this.refForm.validateAll((error, values) => {
      if (error) {
        // show validate error
        return;
      }
      console.log("values+++", values)
      axios
        .post("/api/PersonnelMS/recruit_addRecruit", values)
        .then((res) => {
          console.log("res", res)
          if (res.data.code === 0) {
            Feedback.toast.success(res.data.msg)
          }
        })


      // deal with valuer

      this.hideDialog();
    });
  };
  onFormChange = (valuer) => {
    this.setState({
      valuer,
    });
  };
  checkPasswd = (rule, values, callback) => {
    if (!values) {
      callback('请输入正确的密码');
    } else if (values.length < 8) {
      callback('密码必须大于8位');
    } else if (values.length > 16) {
      callback('密码必须小于16位');
    } else {
      callback();
    }
  };

  checkPasswd2 = (rule, values, callback, stateValues) => {
    if (!values) {
      callback('请输入正确的密码');
    } else if (values && values !== stateValues.password) {
      callback('两次输入密码不一致');
    } else {
      callback();
    }
  };

  checkPhone = (rule, values, callback) => {
    if (!values) {
      callback('请输入正确的手机号');
    } else if (values.length != 11) {
      callback('请输入正确的手机号');
    } else {
      callback();
    }
  };

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  handleSubmit = () => {
    this.refs.form.validateAll((errors, values) => {
      delete values.rePasswd;
      delete values.passwd;
      console.log("***", values)
      if (errors) {
        console.log('errors', errors);
        return;
      }
      axios
        .post('/api/PersonnelMS/user_add', values)
        .then((response) => {
          console.log("res", response);
          if (response.data.code === 0) {
            Feedback.toast.success("注册成功，请填写您的个人简历！");
            setTimeout(this.showDialog, 1000);
          } else if (response.data.code === 3) {
            Feedback.toast.error(response.data.msg);
            this.setState({
              rePasswd: ''
            })
          }
        })
        .catch((error) => {
          console.log(error);
        });
      console.log('values:', values);
      // 注册成功后做对应的逻辑处理
    });
  };

  render() {
    console.log("visible", this.state.visible)
    const { isMobile } = this.state;
    const simpleFormDialog = {
      ...styles.simpleFormDialog,
    };
    // 响应式处理
    if (isMobile) {
      simpleFormDialog.width = '300px';
    }
    return (
      <div style={styles.container} className="user-register">
        <div style={styles.header}>
          <a href="#" style={styles.meta}>
            <img
              style={styles.logo}
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"
              alt="logo"
            />
            <span style={styles.title}>蚂蚁人事管理</span>
          </a>
          <p style={styles.desc}>MYbank</p>
        </div>
        <div style={styles.formContainer}>
          <h4 style={styles.formTitle}>注 册</h4>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formItems}>
            <Row style={styles.formItem}>
                <Col style={styles.formItemCol}>
                  <IceIcon
                    type="yonghu"
                    size="small"
                    style={styles.inputIcon}
                  />
                  <IceFormBinder
                    name="username"
                    required
                    message="用户名"
                  >
                    <Input size="large" placeholder="用户名" />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="username" />
                </Col>
              </Row>
              <Row style={styles.formItem}>
                <Col style={styles.formItemCol}>
                  <IceIcon
                    type="person"
                    size="small"
                    style={styles.inputIcon}
                  />
                  <IceFormBinder
                    name="account"
                    required
                    message="真实姓名"
                  >
                    <Input size="large" placeholder="真实姓名" />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="account" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col style={styles.formItemCol}>
                  <IceIcon type="mail" size="small" style={styles.inputIcon} />
                  <IceFormBinder
                    type="email"
                    name="email"
                    required
                    message="请输入正确的邮箱"
                  >
                    <Input size="large" maxLength={20} placeholder="邮箱" />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="email" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col style={styles.formItemCol}>
                  <IceIcon type="lock" size="small" style={styles.inputIcon} />
                  <IceFormBinder
                    name="password"
                    required
                    validator={this.checkPasswd}
                  >
                    <Input
                      htmlType="password"
                      size="large"
                      placeholder="至少8位密码"
                    />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="password" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col style={styles.formItemCol}>
                  <IceIcon type="lock" size="small" style={styles.inputIcon} />
                  <IceFormBinder
                    name="rePasswd"
                    required
                    validator={(rule, values, callback) =>
                      this.checkPasswd2(
                        rule,
                        values,
                        callback,
                        this.state.value
                      )
                    }
                  >
                    <Input
                      htmlType="password"
                      size="large"
                      placeholder="确认密码"
                    />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="rePasswd" />
                </Col>
              </Row>

              {/* <Row style={styles.formItem}>
                <Col style={styles.formItemCol}>
                  <IceIcon type="phone" size="small" style={styles.inputIcon} />
                  <IceFormBinder
                    name="phone"
                    required
                    validator={(rule, values, callback) =>
                      this.checkPhone(
                        rule,
                        values,
                        callback,
                        this.state.value
                      )
                    }
                  >
                    <Input
                      htmlType="number"
                      size="large"
                      placeholder="11位手机号"
                      message="请输入正确的手机号"
                    />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="phone" />
                </Col>
              </Row> */}

              <Row style={styles.formItem}>
                <Button
                  id="btnReg"
                  type="primary"
                  onClick={this.handleSubmit}
                  style={styles.submitBtn}
                  htmlType="submit"
                >
                  注 册
                </Button>
              </Row>

              <Row style={styles.tips}>
                <Link to="/login" style={styles.link}>
                  使用已有账户登录
                </Link>
              </Row>
              {/* <Button onClick={this.showDialog}>
                测试
                </Button> */}
            </div>

          </IceFormBinderWrapper>
          <Dialog
            className="simple-form-dialog"
            style={simpleFormDialog}
            autoFocus={false}
            footerAlign="center"
            title="我的简历"
            {...this.props}
            onOk={this.onOk}
            onCancel={this.hideDialog}
            onClose={this.hideDialog}
            isFullScreen
            visible={this.state.visible}
          >
            <IceFormBinderWrapper
              ref={(ref) => {
                this.refForm = ref;
              }}
              value={this.state.valuer}
              onChange={this.onFormChange}
            >
              <div style={styles.dialogContent}>
                <Row style={styles.formRow}>
                  <Col span={`${isMobile ? '6' : '3'}`}>
                    <label style={styles.formLabel}>姓名</label>
                  </Col>
                  <Col span={`${isMobile ? '18' : '16'}`}>
                    <IceFormBinder
                      required
                      min={2}
                      max={10}
                      readOnly={true}
                      message="姓名必填，且最少 2 个字最多 6 个字"
                    >
                      <Input
                        name="name"
                        style={styles.input}
                        placeholder="请输入用户名"
                      />
                    </IceFormBinder>
                    <IceFormError name="name" />
                  </Col>
                </Row>
                <Row style={styles.formRow}>
                  <Col span={`${isMobile ? '6' : '3'}`}>
                    <label style={styles.formLabel}>性别</label>
                  </Col>
                  <Col>
                    <IceFormBinder
                      required
                      message="性别必须选择!"
                    >
                      <RadioGroup

                        name="sex"
                        dataSource={[
                          {
                            value: '男',
                            label: '男',
                          },
                          {
                            value: '女',
                            label: '女',
                          },
                          {
                            value: '双性人',
                            label: '双性人',
                          },
                        ]}
                      />
                    </IceFormBinder>
                  </Col>
                </Row>
                <Row style={styles.formRow}>
                  <Col span={`${isMobile ? '6' : '3'}`}>
                    <label style={styles.formLabel}>学历</label>
                  </Col>
                  <Col>
                    <IceFormBinder
                      required
                      message="请选择您的学历"
                    >
                      <Select
                        name="school"
                        className="next-form-text-align"
                        style={{ width: '100%' }}
                        dataSource={[
                          { label: '专科生', value: '专科生' },
                          { label: '本科生', value: '本科生' },
                          { label: '研究生', value: '研究生' },
                          { label: '博士生', value: '博士生' },
                        ]}
                      />
                    </IceFormBinder>
                  </Col>
                </Row>
                <Row style={styles.formRow}>
                  <Col span={`${isMobile ? '6' : '3'}`}>
                    <label style={styles.formLabel}>账号邮箱</label>
                  </Col>
                  <Col span={`${isMobile ? '18' : '16'}`}>
                    <IceFormBinder
                      required
                      message="必填！！!"
                    >
                      <Input
                        readOnly={true}
                        name="email"
                        style={styles.input}
                        placeholder="请输入您注册时的邮箱"
                      />
                    </IceFormBinder>
                    <IceFormError name="email" />
                  </Col>
                </Row>

                <Row style={styles.formRow}>
                  <Col span={`${isMobile ? '6' : '3'}`}>
                    <label style={styles.formLabel}>简历</label>
                  </Col>
                  <Col>
                    <IceFormBinder
                      required
                      message="请认真填写！！"
                    >
                      <Input
                        name="filepath"
                        style={styles.input}
                        multiple
                        placeholder="请输入详细内容"
                        rows={4}
                      />
                    </IceFormBinder>
                  </Col>
                </Row>
              </div>
            </IceFormBinderWrapper>
          </Dialog>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    paddingTop: '100px',
    background: '#f0f2f5',
    backgroundImage:
      'url(https://img.alicdn.com/tfs/TB1kOoAqv1TBuNjy0FjXXajyXXa-600-600.png)',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '40px',
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  title: {
    textAlign: 'center',
    fontSize: '33px',
    color: 'rgba(0, 0, 0, 0.85)',
    fontFamily: 'Myriad Pro, Helvetica Neue, Arial, Helvetica, sans-serif',
    fontWeight: '600',
  },
  desc: {
    margin: '10px 0',
    fontSize: '14px',
    color: 'rgba(0, 0, 0, 0.45)',
  },
  logo: {
    marginRight: '10px',
    width: '48px',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    maxWidth: '368px',
    margin: '0 auto',
  },
  formItem: {
    position: 'relative',
    marginBottom: '25px',
    flexDirection: 'column',
    padding: '0',
  },
  formItemCol: {
    position: 'relative',
    padding: '0',
  },
  formTitle: {
    textAlign: 'center',
    margin: '0 0 20px',
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: 'bold',
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#999',
  },
  submitBtn: {
    fontSize: '16px',
    height: '40px',
    lineHeight: '40px',
    background: '#3080fe',
    borderRadius: '4px',
  },
  checkbox: {
    marginLeft: '5px',
  },
  tips: {
    justifyContent: 'center',
  },
  link: {
    color: '#999',
    textDecoration: 'none',
    fontSize: '13px',
  },
  line: {
    color: '#dcd6d6',
    margin: '0 8px',
  },
  simpleFormDialog: { width: '640px' },
  dialogContent: {},
  formRow: { marginTop: 20 },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px' },
};
