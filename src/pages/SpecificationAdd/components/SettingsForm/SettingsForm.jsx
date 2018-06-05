/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Radio, Switch, Upload, Grid, Feedback } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import axios from 'axios';
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
        id: '',
        Temperature: '22',
        Humidness: '',
      },
      imgpath: '',
    };
  }


  onSuccess = (res, file) => {
    this.setState({
      imgpath: res.content
    })

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
      // values.image = this.state.imgpath;
      console.log("values:", values);
      // TODO 只能传一个
      axios
        .post(`api/E_wardrobe/clothes_add`, values)
        .then((response) => {
          console.log(response)
          const { data } = response
          if (data.code === 0) {
            Feedback.toast.success("添加成功！");
            this.props.history.push(`/spec`)
          } else if (data.code === 2){
              Feedback.toast.success("请登录！");
              this.props.history.push(`/login`)
          } 
          else {
            Feedback.toast.error("操作异常，添加失败！");
          }
          console.log("res", response);
        })
        .catch((error) => {
          console.log(error);
        });
    })
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
                  用户ID：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="id" required max={10} message="必填">
                    <Input size="large" placeholder="用户ID" />
                  </IceFormBinder>
                  <IceFormError name="id" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  温度：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="Temperature" required message="必填">
                    <ImageUpload
                      listType="picture-card"
                      action="/api/files/uploadImg"
                      name="files2"
                      accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                      locale={{
                        image: {
                          cancel: '取消上传',
                          addPhoto: '上传',
                        },
                      }}
                      beforeUpload={beforeUpload}
                      onChange={onChange}
                      onSuccess={this.onSuccess}
                      onError={onError}
                    />
                  </IceFormBinder>
                  <IceFormError name="Temperature" />
                </Col>
              </Row>


              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  湿度：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="Humidness">
                    <Input size="large" multiple placeholder="湿度" />
                  </IceFormBinder>
                  <IceFormError name="Humidness" />
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
    alignItems: 'center',
    marginBottom: 25,
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
};
