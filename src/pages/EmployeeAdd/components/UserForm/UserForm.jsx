/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Select, Upload, Feedback, Form, Field } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import axios from 'axios';
const { Combobox } = Select;
const { DragUpload } = Upload;
const { ImageUpload } = Upload;
const { Row, Col } = Grid;
const FormItem = Form.Item;
const fileList = [];
export default class UserForm extends Component {

  field = new Field(this, {
    deepReset: true // 打开清楚特殊类型模式(fileList是数组需要特别开启)
  });
  static displayName = 'UserForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: '',
        image: 'string',
        description: '',
        specificationtoken: 'string',
      },
    };
  }
  setValues = () => {
    this.field.setValues({
      upload: [...fileList]
    });
  };
  formChange = (value) => {
    this.setState({
      value,
    });
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      console.log("values:", values);
      const specificationToken = this.props.spectoken
      // TODO 只能传一个
      axios
        .post(`/api/devices?current=${specificationToken}&size=${sdsd}`, values)
        .then((response) => {
          if (response.data.code === 0) {
            Feedback.toast.success("添加成功！");
            this.props.history.push(`/device/${specificationToken}`)
            // hashHistory.push({
            //   pathname: 'device',
            //   query: {
            //    text:value.text
            //   },
            //  })
            // 完成后跳转
          } else {
            Feedback.toast.error("操作异常，添加失败！");
          }
          console.log("res", response);
        })
        .catch((error) => {
          console.log(error);
        });
    })
  };

  // imgPreview=(fileDom) => {
  //   //判断是否支持FileReader
  //   if (window.FileReader) {
  //       var reader = new FileReader();
  //   } else {
  //       alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
  //   }

  //   //获取文件
  //   var file = fileDom.files[0];
  //   var imageType = /^image\//;
  //   //是否是图片
  //   if (!imageType.test(file.type)) {
  //       alert("请选择图片！");
  //       return;
  //   }
  //   //读取完成
  //   reader.onload = function(e) {
  //       //获取图片dom
  //       var img = document.getElementById("preview");
  //       //图片路径设置为读取的图片
  //       img.src = e.target.result;
  //   };
  //   reader.readAsDataURL(file);
  // }

  onSuccess = (res) => {
    console.log("res+++", res)
    console.log("this.refs", this.refs)
    this.refs.targetViewer.src = res.content;
  }
  render() {
    const init = this.field.init;
    console.log("file", fileList)
    return (
      <div className="user-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            field={this.field}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={{ marginLeft: '20px' }}><b>添加员工</b></h2>
              <h3 style={styles.formTitle}>员工基本信息</h3>
              <div style={styles.contain}>
                <Row style={styles.formItem} justify="center">
                  <Col style={styles.formLabel} span="2">
                    员工姓名 ：
                </Col>
                  <Col span="10">
                    <IceFormBinder name="name" required message="必填">
                      <Input
                        size="large"
                        placeholder="请输入设备名"
                        style={{ width: '100%' }}
                      />
                    </IceFormBinder>
                    <IceFormError name="name" />
                  </Col>
                </Row>
              </div>
              <Row style={styles.formItem} justify="center">
                <Col style={styles.formLabel} span="2">
                  员工头像 ：
                </Col>
                <Col span="10" style={{ textAlign: 'left' }}>
                  <IceFormBinder name="image">
                    <DragUpload
                      action="/api/files/uploadImg" // 该接口仅作测试使用，业务请勿使用
                      accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                      name="files2"
                      preview
                      limit={1}
                    // onSuccess={this.onSuccess}
                    />
                    {/* <ImageUpload
                      listType="picture-card"
                      action="/api/files/uploadImg" // 该接口仅作测试使用，业务请勿使用
                      accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                      name="files2"
                      limit={1}
                      {...init("upload", {
                        valueName: "fileList",
                        initValue: fileList,
                        getValueFromEvent: this.normFile,
                        rules: [{ required: true, message: "列表不能为空" }]
                      })}
                    /> */}
                    {/* <div>
                      <div style={{height:'200px',width: '200px'}}>
                        <img id="preview"  style={{height:'100% ',width: '100%'}}/>	
                      </div>
                      <input type="file" name="file" onChange={this.imgPreview} />
                    </div> */}
                  </IceFormBinder>
                  <IceFormError name="image" />
                </Col>
              </Row>

              <Row style={styles.formItem} justify="center">
                <Col style={styles.formLabel} span="2">
                  部门分配 ：
                </Col>
                <Col span="10">
                  <IceFormBinder
                    name="description"
                  >
                    <Combobox
                      // onInputUpdate={this.onInputUpdate.bind(this)}
                      filterLocal={false}
                      value={this.state.value}
                      fillProps="label"
                      multiple
                      placeholder="请输入淘宝商品"
                      // onChange={this.onChange.bind(this)}
                      // dataSource={this.state.dataSource}
                    />
                  </IceFormBinder>
                </Col>
              </Row>

            </div>
          </IceFormBinderWrapper>

          <Row style={{ marginTop: 30, marginBottom: 50 }} justify="center">
            <Col offset="3" span="3">
              {/* <Link to={{pathname : '/device', state : { specificationToken: item.token,specCreatetime:item.createdDate,specDescription:item.description }}}> */}
              <Button
                size="large"
                type="primary"
                onClick={this.validateAllFormField}
              >
                提 交
              </Button>
              {/* </Link> */}
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

function onDragOver() {
  console.log("dragover callback");
}

function onDrop(fileList) {
  console.log("drop callback : ", fileList);
}

const styles = {
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    marginBottom: 25,
    textAlign: 'center',
    align: "center"
  },
  formLabel: {
    height: '32px',
    lineHeight: '32px',
    textAlign: 'center',
  },
  formTitle: {
    margin: '0 0 40px 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid ',
  },
};
