import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field, Feedback } from '@icedesign/base';
import axios from 'axios';

const FormItem = Form.Item;

export default class EditDialog extends Component {
  static displayName = 'EditDialog';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dataIndex: null,
      dataList: [],
    };
    this.field = new Field(this);
  }

  handleSubmit = (index) => {

    const { dataList } = this.props
    const id = dataList[index].id
    this.field.validate((errors, values) => {
      delete values.id, values.createdDate, values.specificationToken, values.hardwareID, values.assignmentToken;
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }

      const { dataIndex } = this.state;
      this.props.getFormValues(dataIndex, values);
      this.setState({
        visible: false,
      });
      axios
        .put(`/api/devices/${id}`, values)
        .then((res) => {
          
          if (res.data.code === 0) {
            const value = Object.assign({},values);
            
            delete value.id;
            delete value.createdDate;
            delete value.specificationToken;
            delete value.hardwareId;
            delete value.assignmentToken;

            console.log("&&&&",value)
            Feedback.toast.success("修改成功");
            this.props.onEditChange(values, index)
          } else {
            Feedback.toast.error("修改失败，未知错误！");

          }
          // this.getPageData(sdji, jis)
        });
    });
  };



  onOpen = (index, record) => {
    this.field.setValues({ ...record });
    this.setState({
      visible: true,
      dataIndex: index,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const init = this.field.init;
    const { index, record } = this.props;
    const formItemLayout = {
      labelCol: {
        fixedSpan: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };

    return (
      <div style={styles.editDialog}>
        <Button
          shape="text"
          onClick={() => this.onOpen(index, record)}
        >
          编辑
        </Button>
        <Dialog
          style={{ width: 640 }}
          visible={this.state.visible}
          onOk={() => this.handleSubmit(index)}
          closable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title="编辑"
        >
          <Form direction="ver" field={this.field}>
            <FormItem label="设备名称：" {...formItemLayout}>
              <Input
                {...init('name', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>

            <FormItem label="设备icon：" {...formItemLayout}>
              <Input
                {...init('image', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>

            <FormItem label="设备描述：" {...formItemLayout}>
              <Input
                {...init('description', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>

          </Form>
        </Dialog>
      </div>
    );
  }
}

const styles = {
  editDialog: {
    display: 'inline-block',
    marginRight: '5px',
  },
};
