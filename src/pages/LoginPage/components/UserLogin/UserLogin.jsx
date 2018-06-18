/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Input, Button, Checkbox, Grid, Feedback } from '@icedesign/base';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/icon';
import './UserLogin.scss';
import axios from 'axios';

const { Row, Col } = Grid;

// 寻找背景图片可以从 https://unsplash.com/ 寻找
const backgroundImage =
  'https://img.alicdn.com/tfs/TB1zsNhXTtYBeNjy1XdXXXXyVXa-2252-1500.png';
function toast(msg) {
  Feedback.toast.success(msg);
}
document.onkeyup = (e) => {
  let _key
  if (e == null) {
    _key = event.keyCode;
  } else {
    _key = e.which;
  }
  if (_key == 13) {
    if (document.getElementById('btnLogin') != null)
      document.getElementById('btnLogin').click()
    else {
      let rnd = Math.floor(Math.random() * 10);
      switch (rnd) {
        case 1: toast("你好");
          break;
        case 2: toast("期末稳过！");
          break;
        case 3: toast("stay hungry stay foolish!");
          break;
        case 4: toast("四级稳过！");
          break;
        case 5: toast("Never go out there to see what happened,go out there to make happens");
          break;
        case 6: toast("六级稳过！");
          break;
        case 7: toast("talk is cheap,show me the code!");
          break;
        case 8: toast("you share rose get fun!");
          break;
        case 9: toast("Make more time!");
          break;
      }
    }
  }
}
export default class UserLogin extends Component {
  static displayName = 'UserLogin';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        username: undefined,
        password: undefined,
        checkbox: false,
      },
    };
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        console.log("errors", errors);

        return;
      }
      delete values.checkbox;
      console.log("values:", values);
      console.log("*", this.props)
      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
      axios
        .post(`api/PersonnelMS/user_login`, values)
        .then((response) => {
          const data = response.data;
          console.log("res", response.data);
          if (data.code === 0) {
            Feedback.toast.success(data.msg);
            // location.href="/#spec"
            cookie.save('role', data.content.role);
            cookie.save('username', data.content.username);
            if (data.content.role === "1")
              this.props.history.push("/index");
            else if (data.content.role === "3")
              this.props.history.push("/");
          }
          else if (data.code === 2) {
            Feedback.toast.error(data.msg);
          }
          else {
            Feedback.toast.error(data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  render() {
    return (
      <div style={styles.userLogin} className="user-login">
        <div
          style={{
            ...styles.userLoginBg,
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
        <div style={styles.contentWrapper} className="content-wrapper">
          <h2 style={styles.slogan} className="slogan">
            欢迎使用 <br /> 蚂蚁管理系统
          </h2>
          <div style={styles.formContainer}>
            <h4 style={styles.formTitle}>登录</h4>
            <IceFormBinderWrapper
              value={this.state.value}
              onChange={this.formChange}
              ref="form"
            >
              <div style={styles.formItems}>
                <Row style={styles.formItem}>
                  <Col>
                    <IceIcon
                      type="person"
                      size="small"
                      style={styles.inputIcon}
                    />
                    <IceFormBinder name="username" required message="必填">
                      <Input maxLength={20} placeholder="会员名/邮箱/手机号" />
                    </IceFormBinder>
                  </Col>
                  <Col>
                    <IceFormError name="username" />
                  </Col>
                </Row>

                <Row style={styles.formItem}>
                  <Col>
                    <IceIcon
                      type="lock"
                      size="small"
                      style={styles.inputIcon}
                    />
                    <IceFormBinder name="password" required message="必填">
                      <Input htmlType="password" placeholder="密码" />
                    </IceFormBinder>
                  </Col>
                  <Col>
                    <IceFormError name="password" />
                  </Col>
                </Row>

                <Row style={styles.formItem}>
                  <Col>
                    <IceFormBinder name="checkbox">
                      <Checkbox style={styles.checkbox}>记住账号</Checkbox>
                    </IceFormBinder>
                  </Col>
                </Row>

                <Row style={styles.formItem}>
                  <Button
                    id="btnLogin"
                    type="primary"
                    onClick={this.handleSubmit}
                    style={styles.submitBtn}
                  >
                    登 录
                  </Button>
                </Row>

                <Row className="tips" style={styles.tips}>
                  <Link to="/register" style={styles.link}>
                    立即注册
                  </Link>
                  <span style={styles.line}>|</span>
                  <a href="/" style={styles.link}>
                    忘记密码
                  </a>
                </Row>
              </div>
            </IceFormBinderWrapper>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  userLogin: {
    position: 'relative',
    height: '100vh',
  },
  userLoginBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: 'cover',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '30px 40px',
    background: '#fff',
    borderRadius: '6px',
    boxShadow: '1px 1px 2px #eee',
  },
  formItem: {
    position: 'relative',
    marginBottom: '25px',
    flexDirection: 'column',
  },
  formTitle: {
    margin: '0 0 20px',
    textAlign: 'center',
    color: '#3080fe',
    letterSpacing: '12px',
  },
  inputIcon: {
    position: 'absolute',
    left: '0px',
    top: '3px',
    color: '#999',
  },
  submitBtn: {
    width: '240px',
    background: '#3080fe',
    borderRadius: '28px',
  },
  checkbox: {
    marginLeft: '5px',
  },
  tips: {
    textAlign: 'center',
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
};
