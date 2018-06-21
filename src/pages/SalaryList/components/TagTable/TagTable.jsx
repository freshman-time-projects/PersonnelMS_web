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
    console.log("current+++",current)
    axios
      .get(`/api/PersonnelMS/salary_getSalary?current=${current}`)
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
  DatahandleChange = (current) => {
    this.setState({
      current
    });
    console.log("current", current)
    this.getUserData(current)
  }

  bonus = (index, value, record) => {
    const { UserList } = this.state
    console.log("&&*",UserList[index].s_id)
    axios
      .get(`api/PersonlMS/salary_update?s_id=${UserList[index].s_id}`)
      .then((res) => {
        if(res.data.code === 0){
          this.getUserData(this.state.current)
        Feedback.toast.success(res.data.msg)
        }else
        Feedback.toast.error(res.data.msg)
        })
    // this.props.history.push(`/user/userDetail/${index}`)
    // window.location.href = "#/user/userDetail";
  }

  renderOperator = (value, index, record) => {
    return (
      <Row>
        <Col>
          <Button onClick={() => this.bonus(index, value, record)} type="secondary">奖励</Button>
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
              onChange={this.DatahandleChange}
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

  },
  rowTop: {
    marginLeft: '20px',
    // marginTop: '10px'
  },
  rowBottom: {
    marginLeft: '80px',
    // width: '60%',
    fontSize: '16px'
  },
  title: {
    fontSize: '20px',
    color: '#000'
    // marginBottom: '20px'
  },
  top: {
    padding: '15px 20px 15px 25px',
    background: '#fff',
    borderRadius: '5px 5px 0 0'
  },
  center: {
    background: '#eee',
    padding: '25px 40px 40px 40px',
    borderRadius: '5px'
  },
  pagination: {
    textAlign: 'right',
    paddingTop: '20px',
    paddingBottom: '10px',
  },
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