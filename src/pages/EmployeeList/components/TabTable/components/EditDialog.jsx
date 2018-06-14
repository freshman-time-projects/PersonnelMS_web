import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Select, Field, Feedback } from '@icedesign/base';
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
    console.log("*(((",this.props)
    const current = this.props.current
    // const { dataList } = this.props
    // const id = dataList[index].id
    this.field.validate((errors, values) => {
      console.log("values", values)
      // delete values.id, values.createdDate, values.specificationToken, values.hardwareID, values.assignmentToken;
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }
      delete values.department
      const { dataIndex } = this.state;
      this.props.getFormValues(dataIndex, values);
      this.setState({
        visible: false,
      });
      axios
        .put(`/api/PersonnelMS/employee_update`, values)
        .then((res) => {
          if (res.data.code === 0) {
            const value = Object.assign({}, values);
            console.log("&&&&", value)
            console.log("**")
            Feedback.toast.success("修改成功");
            this.props.onEditChange(this.props.current);
            // this.props.onEditChange(values, index)
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
          type="primary"
          size="small"
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
            <FormItem label="姓名：" {...formItemLayout}>
              <Input
                {...init('name', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>

            <FormItem label="年龄：" {...formItemLayout}>
              <Input
                {...init('age', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>

            <FormItem label="婚姻状态：" {...formItemLayout}>
              <Select
                {...init('marry', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
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
            </FormItem>
            <FormItem label="手机：" {...formItemLayout}>
              <Input
                {...init('mobile', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>

            <FormItem label="家庭住址：" {...formItemLayout}>
              <Input
                {...init('address', {
                  rules: [{ required: true, message: '必填选项' }],
                })}
              />
            </FormItem>
            <FormItem label="邮箱：" {...formItemLayout}>
              <Input
                {...init('email', {
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
