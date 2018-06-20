/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Table, Input, Select, Grid, Button, Range, Pagination, Feedback } from '@icedesign/base';
import { FormBinderWrapper, FormBinder } from '@icedesign/form-binder';
import IceContainer from '@icedesign/container';
import { hashHistory } from "react-router";
import SimpleFormDialog from '../SimpleFormDialog';
import axios from 'axios';
import history from 'react-router-dom';

const { Combobox } = Select;
const { Row, Col } = Grid;

function handleChange(page) {
}

export default class TagTable extends Component {
  static displayName = 'TagTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      UserList: [],
      current: 1,
      salaryCount: 0
    };
  }

  getUserData = (current) => {
    axios
      .get('/api/PersonnelMS/salary_getSalary')
      .then((res) => {
        const data = res.data
        console.log("**", res)
        if (data.code === 0) {
          this.setState({
            UserList: data.content,
            salaryCount: data.salaryCount
          })
          // Feedback.toast.success('你好');
        } else {
          this.props.history.push("/LoginPage")
          Feedback.toast.error("请先登录！");
        }
      })
  }

  componentWillMount() {
    this.getUserData(1)
  }

  getDataSource = () => {
    const { UserList } = this.state;
    return UserList.filter((data) => {
      // 预先筛除
      if (UserList.username && !data.username.match(UserList.username)) {
        return false;
      }

      if (UserList.id && !data.id.match(UserList.id)) {
        return false;
      }

      return true;
    });
  };

  onSort(dataIndex, order) {
    const UserList = this.state.UserList.sort(function (a, b) {
      let result = a[dataIndex] - b[dataIndex];
      return order === "asc" ? (result > 0 ? 1 : -1) : result > 0 ? -1 : 1;
    });
    this.setState({
      UserList
    });
  }

  formChange = (value) => {
    console.log('changed value', value);
    this.setState({
      UserList: value,
    });
  };

  bonus = () => {
    axios
      .get("api/PersonlMS/salary_bonus")
    // this.props.history.push(`/user/userDetail/${index}`)
    window.location.href = "#/user/userDetail";
  }

  renderOperator = (value, index, record) => {
    return (
      <Row>
        <Col>
          <Button onClick={this.detail} type="secondary">奖励</Button>
        </Col>
        {/* <EditDialog
          index={index}
          record={record}
          getFormValues={this.getFormValues}
        />
        <DeleteBalloon
          handleRemove={() => this.handleRemove(value, index, record)}
        /> */}
      </Row>



    );
  };

  render() {
    const { formValue } = this.state;
    const { UserList } = this.state;
    console.log(this.state);

    return (
      <div className="tag-table">
        {/* <IceCard> */}
        <IceContainer>
          <FormBinderWrapper onChange={this.formChange}>
            <div style={{ marginBottom: '25px', borderBottom: '2px solid #D5D5D5' }}>
              <div style={styles.selectTitle}><span>按条件查询</span></div>
              <Row style={styles.formRow}>
                <Col span='3' style={styles.label}>
                  用户姓名:{' '}
                </Col>
                <Col span="10">
                  <FormBinder>
                    <Input name="username" placeholder="请输入用户姓名" />
                  </FormBinder>
                </Col>
                <Col span='3' style={styles.label} >
                  用户ID:{' '}
                </Col>
                <Col span="10">
                  <FormBinder>
                    <Input name="id" placeholder="请输入用户id" />
                  </FormBinder>
                </Col>
              </Row>

            </div>
          </FormBinderWrapper>

          <Row>
            {/* <SimpleFormDialog /> */}
          </Row>

          <Table
            locale={{ empty: '没有查询到符合条件的记录' }}
            dataSource={UserList}
            onSort={this.onSort.bind(this)}
            history={this.props.history}
          >
            <Table.Column title="员工编号" align="center" dataIndex="e_id" width={60} sortable />
            <Table.Column title="员工姓名" align="center" dataIndex="username" width={60} sortable />
            <Table.Column title="所在部门" align="center" dataIndex="departmentname" width={80} />
            <Table.Column title="工资" align="center" dataIndex="salary" width={60} sortable />
            <Table.Column title="奖金" align="center" dataIndex="bonus" width={70} sortable />
            <Table.Column
              title="操作"
              align="center"
              cell={this.renderOperator}
              // lock="right"
              width={70}
            />
          </Table>
          {/* </IceCard> */}

          <div style={{ textAlign: 'right', margin: '20px 10px' }}>
            <Pagination 
            defaultCurrent={1}
            current={this.state.current}
            total={this.state.salaryCount}
            />
          </div>

        </IceContainer>
      </div>
    );
  }
}

const styles = {
  formRow: {
    // marginBottom: '25px',
    // marginLeft: '50px',
    margin: '15px 70px',
    fontSize: 16,
  },
  label: { lineHeight: '28px', paddingRight: '10px' },
  selectTitle: {
    fontSize: '20px',

  }
};