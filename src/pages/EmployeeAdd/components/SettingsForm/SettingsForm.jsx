/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Radio, Switch, Upload, Grid } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import './SettingsForm.scss';

const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;
const { ImageUpload } = Upload;

function beforeUpload(info) {
  console.log('beforeUpload callback : ', info);
}

function onChange(info) {
  console.log('onChane callback : ', info);
}

function onSuccess(res, file) {
  console.log('onSuccess callback : ', res, file);
}

function onError(file) {
  console.log('onError callback : ', file);
}

export default class SettingsForm extends Component {
  static displayName = 'SettingsForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: '',
        gender: 'male',
        notice: false,
        email: '',
        avatar: '',
        siteUrl: '',
        githubUrl: '',
        twitterUrl: '',
        description: '',
      },
    };
  }

  onDragOver = () => {
    console.log('dragover callback');
  };

  onDrop = (fileList) => {
    console.log('drop callback : ', fileList);
  };

  formChange = (value) => {
    console.log('value', value);
    this.setState({
      value,
    });
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);
    });
  };

  render() {
    return (
      <div className="settings-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>基本设置</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  产品名称:
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="name" required max={10} message="必填">
                    <Input size="large" placeholder="产品名称" />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  产品icon:
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="avatar" required message="必填">
                    <ImageUpload
                      listType="picture-card"
                      action=""
                      accept="image/txt"
                      locale={{
                        image: {
                          cancel: '取消上传',
                          addPhoto: '上传',
                        },
                      }}
                      beforeUpload={beforeUpload}
                      onChange={onChange}
                      onSuccess={onSuccess}
                      onError={onError}
                    />
                  </IceFormBinder>
                  <IceFormError name="avatar" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  产品描述:
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="description">
                    <Input size="large" multiple placeholder="产品描述200字" />
                  </IceFormBinder>
                  <IceFormError name="description" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  数据项:
                </Col>
                <Col s="4" l="3">
                  <IceFormBinder
                    type="email"
                    name="email"
                    required
                    message="数据异常"
                  >
                    <Input
                      size="large"
                      placeholder=""
                    />
                  </IceFormBinder>
                  <IceFormError name="email" />
                </Col>
                --
                <Col s="4" l="3">
                  <IceFormBinder
                    type="email"
                    name="email"
                    required
                    message="数据异常"
                  >
                    <Input
                      size="large"
                      placeholder=""
                    />
                  </IceFormBinder>
                  <IceFormError name="email" />
                </Col>
                --
                <Col s="4" l="3">
                  <IceFormBinder
                    type="email"
                    name="email"
                    required
                    message="数据异常"
                  >
                    <Input
                      size="large"
                      placeholder=""
                    />
                  </IceFormBinder>
                  <IceFormError name="email" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                 
                </Col>
                <Col s="4" l="3">
                  <IceFormBinder
                    type="email"
                    name="email"
                    required
                    message="数据异常"
                  >
                    <Input
                      size="large"
                      placeholder=""
                    />
                  </IceFormBinder>
                  <IceFormError name="email" />
                </Col>
                --
                <Col s="4" l="3">
                  <IceFormBinder
                    type="email"
                    name="email"
                    required
                    message="数据异常"
                  >
                    <Input
                      size="large"
                      placeholder=""
                    />
                  </IceFormBinder>
                  <IceFormError name="email" />
                </Col>
                --
                <Col s="4" l="3">
                  <IceFormBinder
                    type="email"
                    name="email"
                    required
                    message="数据异常"
                  >
                    <Input
                      size="large"
                      placeholder=""
                    />
                  </IceFormBinder>
                  <IceFormError name="email" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                
                </Col>
                <Col s="4" l="3">
                  <IceFormBinder
                    type="email"
                    name="email"
                    required
                    message="数据异常"
                  >
                    <Input
                      size="large"
                      placeholder=""
                    />
                  </IceFormBinder>
                  <IceFormError name="email" />
                </Col>
                --
                <Col s="4" l="3">
                  <IceFormBinder
                    type="email"
                    name="email"
                    required
                    message="数据异常"
                  >
                    <Input
                      size="large"
                      placeholder=""
                    />
                  </IceFormBinder>
                  <IceFormError name="email" />
                </Col>
                --
                <Col s="4" l="3">
                  <IceFormBinder
                    type="email"
                    name="email"
                    required
                    message="数据异常"
                  >
                    <Input
                      size="large"
                      placeholder=""
                    />
                  </IceFormBinder>
                  <IceFormError name="email" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                 
                </Col>
                <Col s="12" l="10">
                <ImageUpload
                      listType="picture-card"
                      action=""
                      accept="image/txt"
                      locale={{
                        image: {
                          cancel: '取消上传',
                          addPhoto: '添加',
                        },
                      }}
                      beforeUpload={beforeUpload}
                      onChange={onChange}
                      onSuccess={onSuccess}
                      onError={onError}
                      style={{width:450,height:50}}
                    />
                  <IceFormError name="twitterUrl" />
                </Col>
              </Row>

              
            </div>
          </IceFormBinderWrapper>

          <Row style={{ marginTop: 20 }}>
            <Col offset="3">
              <Button
                size="large"
                type="primary"
                style={{ width: 100 }}
                onClick={this.validateAllFormField}
              >
                提 交
              </Button>
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  label: {
    textAlign: 'right',
  },
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    alignItems: 'top',
    marginBottom: 25,
    backgroundColor:'E9E9E9',
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
};
