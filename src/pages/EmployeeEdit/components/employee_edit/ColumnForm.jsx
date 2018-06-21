import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import cookie from 'react-cookies';
import axios from 'axios';
import { Input, Button, Select, Grid, Card, Feedback } from '@icedesign/base';

const { Row, Col } = Grid;

export default class ColumnForm extends Component {
  static displayName = 'ColumnForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: '',
        email: '',
        marry: '',
        sex: '',
        age: '',
        idCard: '',
        edu: '',
        school: '',
        mobile: '',
        address: '',
      },
    };
  }
  componentWillMount() {
    const user = cookie.load('user')
    console.log("user", user)
    this.setState({
      value: user
    })

  }
  onFormChange = (value) => {
    this.setState({
      value,
    });
  };


  submit = () => {
    this.formRef.validateAll((errors, value) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }
      axios
        .post(`api/PersonnelMS/employee_update`, value).then((res) => {
          const data = res.data;
          // const { totalCount } = data.content
          console.log("datass", res)
          if (data.code === 0) {
            Feedback.toast.success("修改成功！");
            this.props.history.push("/employee/edit")
            console.log("data2222", data)
          } else if (data.code === 1) {
            Feedback.toast.error("您未登录，请登录！")
            this.props.history.push("/login")
          }
          // this.getPageData(sdji, jis)
        });

      // 提交当前填写的数据
    });
  };

  render() {
    return (
      <div className="column-form">
        <IceContainer title="个人信息" style={styles.container}>
          <IceFormBinderWrapper
            ref={(formRef) => {
              this.formRef = formRef;
            }}
            value={this.state.value}
            onChange={this.onFormChange}
          >
            <div>
              <Card style={{ width: '100%', marginBottom: '20px', minHeight: '200px' }} >
                <Row wrap>
                  <Col xxs="24" s="12" l="12">
                    <Row style={styles.formItem}>
                      <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                        姓名：
                    </Col>

                      <Col s="12" l="12">
                        <IceFormBinder
                          name="name"
                          required
                          message="姓名"
                        >
                          <Input
                            readOnly="true"
                            style={{ width: '100%' }} />
                        </IceFormBinder>
                        <IceFormError name="name" />
                      </Col>
                    </Row>

                    <Row style={styles.formItem}>
                      <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                        性别：
                    </Col>
                      <Col s="12" l="12">
                      <IceFormBinder name="sex">
                          <Select
                            className="next-form-text-align"
                            style={{ width: '100%' }}
                            required
                            message="请选择您的性别"
                            dataSource={[
                              { label: '女', value: '女' },
                              { label: '男', value: '男' },
                            ]}
                          />
                        </IceFormBinder>
                        <IceFormError name="sex" />
                      </Col>
                    </Row>
                    <Row style={styles.formItem}>
                      <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                        家庭住址：
                    </Col>
                      <Col s="12" l="12">
                        <IceFormBinder
                          name="address"
                          required
                          message="请输入您的现居地"
                        >
                          <Input style={{ width: '100%' }} />
                        </IceFormBinder>
                        <IceFormError name="address" />
                      </Col>
                    </Row>
                  </Col>

                  <Col xxs="24" s="12" l="12">
                    <Row style={styles.formItem}>
                      <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                        手机：
                    </Col>

                      <Col s="12" l="12">
                        <IceFormBinder
                          name="mobile"
                          required
                          message="手机"
                        >
                          <Input style={{ width: '100%' }} />
                        </IceFormBinder>
                        <IceFormError name="mobile" />
                      </Col>
                    </Row>
                    <Row style={styles.formItem}>
                      <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                        学历：
                    </Col>
                      <Col s="12" l="12">
                        <IceFormBinder name="edu">
                          <Select
                            className="next-form-text-align"
                            style={{ width: '100%' }}
                            required
                            message="请选择您的学历"
                            dataSource={[
                              { label: '专科生', value: '专科生' },
                              { label: '本科生', value: '本科生' },
                              { label: '研究生', value: '研究生' },
                              { label: '博士生', value: '博士生' },
                            ]}
                          />
                        </IceFormBinder>
                        <IceFormError name="edu" />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
              <Row wrap>
                <Col xxs="24" s="12" l="12">
                  <Row style={styles.formItem}>
                    <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                      邮箱：
                    </Col>

                    <Col s="12" l="12">
                      <IceFormBinder
                        name="email"
                        required
                        message="邮箱"
                      >
                        <Input
                          style={{ width: '100%' }} />
                      </IceFormBinder>
                      <IceFormError name="email" />
                    </Col>
                  </Row>

                  <Row style={styles.formItem}>
                    <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                      身份证：
                    </Col>
                    <Col s="12" l="12">
                      <IceFormBinder
                        name="idCard"
                        required
                        message="请输入您的身份证"
                      >
                        <Input style={{ width: '100%' }} />
                      </IceFormBinder>
                      <IceFormError name="idCard" />
                    </Col>
                  </Row>


                </Col>

                <Col xxs="24" s="12" l="12">
                  <Row style={styles.formItem}>
                    <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                      婚姻状况：
                    </Col>
                    <Col s="12" l="12">
                      <IceFormBinder name="marry">
                        <Select
                          className="next-form-text-align"
                          style={{ width: '100%' }}
                          required
                          message="请选择您的婚姻状况"
                          dataSource={[
                            { label: '已婚', value: '已婚' },
                            { label: '未婚', value: '未婚' },
                          ]}
                        />
                      </IceFormBinder>
                      <IceFormError name="marry" />
                    </Col>
                  </Row>
                  <Row style={styles.formItem}>
                    <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                      毕业学校：
                    </Col>
                    <Col s="12" l="12">
                      <IceFormBinder
                        name="school"
                        required
                        message="请输入您的毕业学校"
                      >
                        <Input style={{ width: '100%' }} />
                      </IceFormBinder>
                      <IceFormError name="school" />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row style={styles.btns}>
                <Col xxs="8" s="2" l="2" style={styles.formLabel}>
                  {' '}
                </Col>
                <Col s="12" l="10">
                  <Button type="primary" onClick={this.submit}>
                    确认修改
                  </Button>
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>
        </IceContainer>
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
  },
  resetBtn: {
    marginLeft: '20px',
  },
};
