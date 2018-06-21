import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { Input, Button, Select, Grid } from '@icedesign/base';
import axios from 'axios'

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
        department: '',
      },
      dataList: [],
    };
  }

  onFormChange = (value) => {
    this.setState({
      value,
    });
  };

  reset = () => {
    this.setState({
      value: {
        name: '',
        department: '',
      },
    });
  };

  submit = () => {
    this.formRef.validateAll((error, value) => {
      console.log('error', error, 'value', value);
      if (error) {
        // 处理表单报错
      }
      // 提交当前填写的数据
      axios
        .post("api/PersonnelMS/employee_search", value)
        .then((res) => {
          console.log("reess", res)
          this.setState({
            dataList:res.data.content
          })
        })
    });
  };

  render() {
    return (
      <div className="column-form">

        <IceFormBinderWrapper
          ref={(formRef) => {
            this.formRef = formRef;
          }}
          value={this.state.value}
          onChange={this.onFormChange}
        >
          <div style={{ borderBottom: '3px solid' }}>
            <Row style={{ margin: '25px' }}>
              <Col>
                <Row style={styles.formItem}>
                  <Col span='4' style={{ marginLeft: '20px' }}>
                    员工姓名：
                    </Col>
                  <Col>
                    <IceFormBinder
                      name="name"
                    >
                      <Input />
                    </IceFormBinder>
                  </Col>
                  <Col span='4' style={{ marginLeft: '20px' }}>
                    部门：
                    </Col>
                  <Col>
                    <IceFormBinder
                      name="department"
                    >
                      <Input />
                    </IceFormBinder>
                  </Col>
                </Row>
              </Col>
              <Col style={{ textAlign: 'right' }}>
                <Button type="primary" size="medium" onClick={this.submit}>
                  查询
                  </Button>
                <Button size="medium" style={styles.resetBtn} onClick={this.reset}>
                  重置
                  </Button>
              </Col>
            </Row>
          </div>
        </IceFormBinderWrapper>

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
    textAlign: 'right',
  },
};
