import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from '@icedesign/base';
import { Tab, Button, Grid, Icon, Pagination, Loading } from '@icedesign/base';
import { Link } from 'react-router-dom'
import EditDialog from './../components/EditDialog';
import DeleteBalloon from './../components/DeleteBalloon';
const { Row, Col } = Grid;
const ButtonGroup = Button.Group;
const columns = [
  {
    title: 'ID',
    dataIndex: 'e_id',
    key: 'e_id',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'idCard',
  },
  {
    title: '婚姻状态',
    dataIndex: 'marry',
    key: 'marry',
  },
  {
    title: '身份证',
    dataIndex: 'idCard',
    key: 'idCard',
  },
  {
    title: '学历',
    dataIndex: 'edu',
    key: 'edu',
  },
  {
    title: '毕业学校',
    dataIndex: 'school',
    key: 'school',
  },
  {
    title: '手机',
    dataIndex: 'mobile',
    key: 'mobile',
  },
  {
    title: '家庭住址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '部门',
    dataIndex: 'hardwareId',
    key: 'hardwareId',
  },
  {
    title: '操作',
    key: 'action',
    render: (value, index, record) => {
      return (
        <div style={{ display: 'inline' }} >
          <EditDialog
            index={index}
            record={record}
            dataList={this.props.data}
            getFormValues={this.getFormValues}
            onEditChange={this.props.onEditChange}
          />
          <DeleteBalloon
            handleRemove={() => this.handleRemove(value, index, record)}
          />
          {/* <Button type="primary" onClick={() => this.info(index)}>离职</Button> */}
        </div>
      );
    },
  },
];
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
    const { dataSource } = this.props
    console.log("sss123", this.props)
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
          <Table.Column title="年龄" align={'center'} dataIndex="age" width={50} />
          <Table.Column title="部门" align={'center'} dataIndex="department" width={70} />
          <Table.Column title="手机" align={'center'} dataIndex="mobile" width={100} />
          <Table.Column title="邮箱" align={'center'} dataIndex="email" width={100} />
          <Table.Column title="身份证" align={'center'} dataIndex="idCard" width={120} />
          <Table.Column title="家庭住址" align={'center'} dataIndex="address" width={120} />
          <Table.Column title="学历" align={'center'} dataIndex="edu" width={50} />
          <Table.Column title="毕业学校" align={'center'} dataIndex="school" width={80} />
          <Table.Column title="婚姻状况" align={'center'} dataIndex="marry" width={80} />
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
                    handleRemove={() => this.handleRemove(value, index, record)}
                  />
                  {/* <Button type="primary" onClick={() => this.info(index)}>离职</Button> */}
                </div>
              );
            }} width={150} />

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
