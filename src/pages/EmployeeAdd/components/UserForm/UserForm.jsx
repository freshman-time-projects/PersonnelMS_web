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
        department: '',
        email: '',
      },
      col: [],
      SelectList: [
        { label: '人事部', value: '人事部' },
        { label: '技术部', value: '技术部' },
      ]
    };
  }
  getNames = () => {
    axios
      .get("api/PersonnelMS/department_getNames")
      .then((res) => {
        this.setState({
          col: res.data.content.col.names
        },()=>{console.log("col",this.state.col)})
        console.log("ccc",this.state)
        const _dataSource = []
        for (let _c in this.state.col) {
          _dataSource.push(JSON.parse(`{"label":"${this.state.col[_c]}","value":"${this.state.col[_c]}"}`))
        }
        this.setState({
          SelectList: _dataSource
        }, () => {
          console.log("this.sett", this.state.SelectList)
        })
      })
  }
  componentWillMount() {
    this.state.value.name = this.props.match.params.name
    this.getNames()
   
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
      values.email = this.props.match.params.email
      // TODO 只能传一个
      axios
        .post(`api/PersonnelMS/employee_add`, values)
        .then((response) => {
          if (response.data.code === 0) {
            Feedback.toast.success(response.data.msg);
            this.props.history.push(`/employee/list`)
            // hashHistory.push({
            //   pathname: 'device',
            //   query: {
            //    text:value.text
            //   },
            //  })
            // 完成后跳转
          } else {
            Feedback.toast.error(response.data.msg);
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
    const { SelectList } = this.state

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
                        placeholder="请输入员工名"
                        style={{ width: '100%' }}
                      />
                    </IceFormBinder>
                    <IceFormError name="name" />
                  </Col>
                </Row>

              </div>


              <Row style={styles.formItem} justify="center">
                <Col style={styles.formLabel} span="2">
                  部门分配 ：
                </Col>
                <Col span="10">
                  <IceFormBinder
                    name="department"
                  >
                    <Select
                      className="next-form-text-align"
                      style={{ width: '100%' }}
                      required
                      message="请选择您的学历"
                      dataSource={SelectList}
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
