import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from '@icedesign/base';
import { Tab, Button, Grid, Icon, Pagination, Loading, Feedback } from '@icedesign/base';
import { Link } from 'react-router-dom'
import EditDialog from './../components/EditDialog';
import DeleteBalloon from './../components/DeleteBalloon';
const { Row, Col } = Grid;
const ButtonGroup = Button.Group;
import cookie from 'react-cookies'
import axios from 'axios'
export default class CustomTable extends Component {
  static displayName = 'CustomTable';

  static propTypes = {
    dataSource: PropTypes.array,
    columns: PropTypes.array.isRequired,
  };

  static defaultProps = {
    dataSource: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      current: 1,
      totalCount: 0,
      dataSource: [],

    };
    this.handleChange = this.handleChange.bind(this);

    this.rowSelection = {
      // 表格发生勾选状态变化时触发
      onChange: (ids) => {
        console.log('ids', ids);
        this.setState({
          selectedRowKeys: ids,
        });
      },
      // 全选表格时触发的回调
      onSelectAll: (selected, records) => {
        console.log('onSelectAll', selected, records);
      },
    };

  }
  getFormValues = (dataIndex, values) => {
    const { dataSource } = this.state;
    dataSource[dataIndex] = values;
    this.setState({
      dataSource,
    });
  };
  handleRemove = (value, index) => {
    const { dataSource } = this.props;
    const id = dataSource[index].e_id
    const e_id = `{"e_id":"${id}"}`
    console.log("indxxx", index)
    console.log("idddd", id)
    axios.post(`/api/PersonnelMS/employee_romove`, JSON.parse(e_id)).then((res) => {
      console.log('res: ', res);
      if (res.data.code === 0) {
        Feedback.toast.success("删除成功");
      } else {
        Feedback.toast.error("删除失败，未知错误！");

      }
      // this.getPageData(sdji, jis)
    });
    dataSource.splice(index, 1);
    this.setState({
      dataSource,
    });
  };

  renderColumns = () => {
    const { columns } = this.props;
    console.log("this.ppp", this.props)
    return columns.map((item) => {
      if (typeof item.render === 'function') {
        return (
          <Table.Column
            title={item.title}
            key={item.key}
            align={'center'}
            cell={item.render}
            width={item.width || 120}
          />
        );
      }

      return (
        <Table.Column
          key={item.key}
          title={item.title}
          align={'center'}
          dataIndex={item.dataIndex}
          width={item.width || 100}
          lock="true"
        />
      );
    });
  };

  add = () => {
    location.href = "#/device/add";
  }

  clearSelectedKeys = () => {
    this.setState({
      selectedRowKeys: [],
    });
  };
  handleChange(current) {
    this.setState({
      current,
    });
    this.props.call(current)
  }

  render() {
    const role = cookie.load("role")
    const { dataSource } = this.props
    console.log("sss123", this.props)
    console.log("!!!!", role)

    return (

      <div>
        <Row style={{ marginBottom: '20px' }}>
          {/* to={{ pathname: '/device/add', state: { specificationToken: this.props.specificationToken }}} */}
          {/* <Button onClick={this.props.call}>
              <Icon type="add" />增加
          </Button> */}
          <Link to={`/employee/add/`}>
            <Button
              type="primary"
            >
              <Icon type="add" />增加
            </Button>
          </Link>
          <Button
            onClick={this.clearSelectedKeys}
            style={styles.batchBtn}
            type="normal"
          >
            <Icon type="close" />清空选中
        </Button>
          <ButtonGroup style={styles.batchBtn}>
            <Button type="normal">运行</Button>
            <Button type="normal">禁用</Button>
          </ButtonGroup>
          <a href="/" download>
            <Button>
              <Icon size="small" type="download" /> 导出信息
        </Button>
          </a>
        </Row>

        <Table {...this.props}
          dataSource={dataSource}
          isLoading={this.state.__loading}
          align={'center'}
          rowSelection={{
            ...this.rowSelection,
            selectedRowKeys: this.state.selectedRowKeys,
          }}
        >
          <Table.Column title="ID" align={'center'} dataIndex="e_id" width={40} />
          <Table.Column title="姓名" align={'center'} dataIndex="name" width={60} />
          <Table.Column title="性别" align={'center'} dataIndex="sex" width={50} />
          <Table.Column title="部门" align={'center'} dataIndex="department" width={70} />
          <Table.Column title="手机" align={'center'} dataIndex="mobile" width={100} />
          <Table.Column title="邮箱" align={'center'} dataIndex="email" width={100} />
          {role === "3" ? <Table.Column title="年龄" align={'center'} dataIndex="age" width={50} /> : null}
          {role === "3" ? <Table.Column title="身份证" align={'center'} dataIndex="idCard" width={120} /> : null}
          {role === "3" ? <Table.Column title="家庭住址" align={'center'} dataIndex="address" width={120} /> : null}
          {role === "3" ? <Table.Column title="学历" align={'center'} dataIndex="edu" width={50} /> : null}
          {role === "3" ? <Table.Column title="毕业学校" align={'center'} dataIndex="school" width={80} /> : null}
          {role === "3" ? <Table.Column title="婚姻状况" align={'center'} dataIndex="marry" width={80} /> : null}
          {
            role === "3" ? (
              <Table.Column title="操作" align={'center'} lock="right" cell={
                (value, index, record) => {
                  return (
                    <div style={{ display: 'inline' }} >
                      <EditDialog
                        current={this.props.current}
                        index={index}
                        record={record}
                        dataList={this.props.data}
                        getFormValues={this.getFormValues}
                        onEditChange={this.props.call}
                      />
                      <DeleteBalloon
                        index={index}
                        // id={this.columns.id}
                        handleRemove={() => this.handleRemove(value, index, record)}
                      />
                    </div>
                  );
                }} width={150} />

            ) : (null)
          }
          {/* <Table.Column title="操作" align={'center'} lock="right" cell={
                (value, index, record) => {
                  return (
                    <div style={{ display: 'inline' }} >
                      <EditDialog
                        current={this.props.current}
                        index={index}
                        record={record}
                        dataList={this.props.data}
                        getFormValues={this.getFormValues}
                        onEditChange={this.props.call}
                      />
                      <DeleteBalloon
                        index={index}
                        // id={this.columns.id}
                        handleRemove={() => this.handleRemove(value, index, record)}
                      />
                    </div>
                  );
                }} width={150} /> */}

          {/* {this.renderColumns()} */}

        </Table>
      </div>
    );
  }
}

const styles = {
  selectableTable: {
    marginTop: '20px'
  },
  batchBtn: {
    marginRight: '10px',
  },
  IceContainer: {
    marginBottom: '20px',
    minHeight: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
  },
  removeBtn: {
    marginLeft: 10,
  },
  pagination: {
    textAlign: 'right',
    paddingTop: '26px',
  },
};
