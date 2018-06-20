import React, { Component } from 'react';
import { Dialog, Grid, Input, Radio, Button, DatePicker } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { enquireScreen } from 'enquire-js';

const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;

const { MonthPicker, YearPicker, RangePicker } = DatePicker;

const defaultValue = {
  keywords: '',
  type: 'post',
  content: '',
};

export default class SimpleFormDialog extends Component {
  static displayName = 'SimpleFormDialog';

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value: defaultValue,
      isMobile: false,
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
    this.refForm.validateAll((error) => {
      if (error) {
        // show validate error
        return;
      }
      // deal with value

      this.hideDialog();
    });
  };

  onFormChange = (value) => {
    this.setState({
      value,
    });
  };


  render() {
    const { isMobile } = this.state;
    const simpleFormDialog = {
      ...styles.simpleFormDialog,
    };
    // 响应式处理
    if (isMobile) {
      simpleFormDialog.width = '300px';
    }

    return (
      <div>
        <Dialog
          className="simple-form-dialog"
          style={simpleFormDialog}
          autoFocus={false}
          footerAlign="center"
          title="增加设备/用户"
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
            value={this.state.value}
            onChange={this.onFormChange}
          >
            <div style={styles.dialogContent}>
            <h2><b>设备信息</b></h2>
              <Row style={styles.formRow}>
                <Col span={`${isMobile ? '6' : '3'}`}>
                  <label style={styles.formLabel}>设备ID</label>
                </Col>
                <Col span={`${isMobile ? '18' : '16'}`}>
                  <IceFormBinder
                    required
                    message="当前字段必填"
                  >
                    <Input
                      name="deviceID"
                      style={styles.input}
                    />
                  </IceFormBinder>
                  <IceFormError name="deviceID" />
                </Col>
              </Row>

              <Row style={styles.formRow}>
                <Col span={`${isMobile ? '6' : '3'}`}>
                  <label style={styles.formLabel}>注册日期</label>
                </Col>
                <Col span={`${isMobile ? '18' : '16'}`}>
                  <IceFormBinder
                    required
                    message="当前字段必填"
                  >
                    <DatePicker 
                      name="data"
                      style={styles.input}
                    />
                  </IceFormBinder>
                  <IceFormError name="data" />
                </Col>
              </Row>

              <h2 style={{marginTop: 30}}><b>用户信息</b></h2>
              <Row style={styles.formRow}>
                <Col span={`${isMobile ? '6' : '3'}`}>
                  <label style={styles.formLabel}>用户ID</label>
                </Col>
                <Col span={`${isMobile ? '18' : '16'}`}>
                  <IceFormBinder
                    required
                    message="当前字段必填"
                  >
                    <Input
                      name="userID"
                      style={styles.input}
                    />
                  </IceFormBinder>
                  <IceFormError name="userID" />
                </Col>
              </Row>

              <Row style={styles.formRow}>
                <Col span={`${isMobile ? '6' : '3'}`}>
                  <label style={styles.formLabel}>用户姓名</label>
                </Col>
                <Col span={`${isMobile ? '18' : '16'}`}>
                  <IceFormBinder
                    required
                    message="当前字段必填"
                  >
                    <Input
                      name="userName"
                      style={styles.input}
                    />
                  </IceFormBinder>
                  <IceFormError name="userName" />
                </Col>
              </Row>

              <Row style={styles.formRow}>
                <Col span={`${isMobile ? '6' : '3'}`}>
                  <label style={styles.formLabel}>email</label>
                </Col>
                <Col span={`${isMobile ? '18' : '16'}`}>
                  <IceFormBinder
                    required
                    message="当前字段必填"
                  >
                    <Input
                      name="email"
                      style={styles.input}
                    />
                  </IceFormBinder>
                  <IceFormError name="eamil" />
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col span={`${isMobile ? '6' : '3'}`}>
                  <label style={styles.formLabel}>联系电话</label>
                </Col>
                <Col span={`${isMobile ? '18' : '16'}`}>
                  <IceFormBinder
                    required
                    message="当前字段必填"
                  >
                    <Input
                      name="phone"
                      style={styles.input}
                    />
                  </IceFormBinder>
                  <IceFormError name="phone" />
                </Col>
              </Row>
             
            </div>
          </IceFormBinderWrapper>
        </Dialog>
        <Button type="primary" onClick={this.showDialog} style={{marginBottom:'20px'}}>
          增加设备
        </Button>
      </div>
    );
  }
}

const styles = {
  simpleFormDialog: { width: '640px' },
  dialogContent: {marginLeft:80},
  formRow: { marginTop: 20 },
  formRowLast: { marginTop: 20, marginBottom: 50 },
  input: { width: '75%' },
  formLabel: { lineHeight: '26px' },
};
