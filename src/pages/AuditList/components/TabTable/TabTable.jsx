import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab, Button, Pagination, Feedback } from '@icedesign/base';
import axios from 'axios';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';
import { withRouter, Route, Router } from 'react-router-dom'


const dataSource = [];
export default class TabTable extends Component {
  static displayName = 'TabTable';
  static mixins = [History];
  static propTypes = {};
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {
      // dataSource: [],
      current: 1,
      totalCount: 0,
      dataSource: this.props.data
    };
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'r_id',
        key: 'r_id',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'idCard',
      },
      {
        title: '学历',
        dataIndex: 'school',
        key: 'school',
      },
      {
        title: '个人简历',
        dataIndex: 'filepath',
        key: 'filepath',
      },
      {
        title: '联系方式',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '毕业学校',
        dataIndex: 'school',
        key: 'school',
      },
      {
        title: '操作',
        key: 'action',
        render: (value, index, record) => {
          return (
            <span>
              {/* <EditDialog
                index={index}
                record={record}
                dataList={this.props.data}
                getFormValues={this.getFormValues}
                onEditChange={this.props.onEditChange}
              /> */}
              {/* <DeleteBalloon
                handleRemove={() => this.handleRemove(value, index, record)}
              /> */}
              <Button size="small" type="primary" onClick={() => this.access(index, value, record)}>通过</Button>
              <Button size="small" type="normal" shape="warning" onClick={() => this.fail(index, value, record)}>拒绝</Button>
            </span>
          );
        },
      },
    ];
  }
  getFormValues = (dataIndex, values) => {
    const { dataSource } = this.state;
    dataSource[dataIndex] = values;
    this.setState({
      dataSource,
    });
  };

  handleRemove = (value, index) => {
    const { dataSource } = this.state;
    dataSource.splice(index, 1);
    this.setState({
      dataSource,
    });
  };
  DatahandleChange = (current) => {
    this.setState({
      current
    });
    console.log("current", current)
    this.props.call(current)
  }

  access = (index, record, value) => {
    console.log("indexxxx", value)
    axios
      .put(`/api/PersonnelMS/recruit_pass?email=${value.email}&name=${value.name}&userStatus=3`)
      .then((res) => {
        console.log("rrr", res)
        if (res.data.code === 5) {
          this.props.call(1)
          Feedback.toast.success(res.data.msg);
        } else {
          Feedback.toast.error(res.data.msg);
        }
      });
  }
  fail = (index, record, value) => {
    console.log("indexxxx", value)
    axios
      .put(`/api/PersonnelMS/recruit_failed?id=${value.r_id}&userStatus=-2`)
      .then((res) => {
        console.log("rrr", res)
        if (res.data.code === 0) {
          this.props.call(1)
          Feedback.toast.success(res.data.msg);
        } else {
          Feedback.toast.error("操作失败，未知错误！");
        }
      });
  }

  render() {
    console.log("ssss", this.props)
    // 这里是为什么呢？
    // const { dataSource } = this.state;
    // console.log('dataSourceProps: ', this.state.dataSource);
    return (
      <div className="tab-table">
        <IceContainer>

          <CustomTable
            totalCount={this.props.totalCount}
            dataSource={this.props.data}
            columns={this.columns}
            hasBorder={false}
            call={this.props.call}
            spectoken={this.props.spectoken}
          />
          <div style={styles.pagination}>
            <Pagination
              pageSize={10}
              current={this.state.current}
              total={this.props.totalCount}
              onChange={this.DatahandleChange}
            />
          </div>
        </IceContainer>
      </div>
    );
  }
}
const styles = {
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
}
