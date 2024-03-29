import React, { Component } from 'react';
import { Dialog, Grid, Input, Radio, Button, Icon, Feedback } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { enquireScreen } from 'enquire-js';
import axios from 'axios';

const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;

const defaultvaluer = {
  name: '',
  manager: '',
  description: '',
  // dataList: [],
};

export default class SimpleFormDialog extends Component {
  static displayName = 'SimpleFormDialog';

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      valuer: defaultvaluer,
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
    this.refForm.validateAll((error, valuers) => {
      console.log("valuers", valuers)
      const valuer = Object.assign({}, valuers);
      axios.post(`/api/PersonnelMS/department_add`, valuer).then((res) => {
        console.log("aaaa", res)
        if (res.data.code === 0) {
          Feedback.toast.success("添加成功");
          this.props.call();
          // this.props.onAddChange();
        } else {
          Feedback.toast.error("添加失败，未知错误！");
        }
      });
      if (error) {
        return;
      }
      this.hideDialog();
    });
  };
  onFormChange = (valuer) => {
    this.setState({
      valuer,
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
      <div style={{ marginBottom: '20px' }}>
        <Dialog
          className="simple-form-dialog"
          style={simpleFormDialog}
          autoFocus={false}
          footerAlign="center"
          title="添加部门"
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
                <Col span={`${isMobile ? '6' : '4'}`}>
                  <label style={styles.formLabel}>部门名称：</label>
                </Col>
                <Col span={`${isMobile ? '18' : '16'}`}>
                  <IceFormBinder
                    required
                    message="当前字段必填"
                  >
                    <Input
                      name="name"
                      style={styles.input}
                    />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col span={`${isMobile ? '6' : '4'}`}>
                  <label style={styles.formLabel}>管理者：</label>
                </Col>
                <Col span={`${isMobile ? '18' : '16'}`}>
                  <IceFormBinder
                    required
                    message="当前字段必填"
                  >
                    <Input
                      name="manager"
                      style={styles.input}
                    />
                  </IceFormBinder>
                  <IceFormError name="manager" />
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col span={`${isMobile ? '6' : '4'}`}>
                  <label style={styles.formLabel}>部门简介：</label>
                </Col>
                <Col span={`${isMobile ? '18' : '16'}`}>
                  <IceFormBinder
                    required
                    message="当前字段必填"
                  >
                    <Input
                      name="description"
                      style={styles.input}
                    />
                  </IceFormBinder>
                  <IceFormError name="description" />
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>
        </Dialog>
        <Button type="primary" size="large" onClick={this.showDialog}>
          <Icon type="add" />新建
        </Button>
      </div>
    );
  }
}

const styles = {
  simpleFormDialog: { width: '640px' },
  dialogContent: {},
  formRow: { marginTop: 20 },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px' },
};
