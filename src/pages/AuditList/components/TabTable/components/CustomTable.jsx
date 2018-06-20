import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from '@icedesign/base';
import { Tab, Button, Grid, Icon, Pagination, Loading } from '@icedesign/base';
import { Link } from 'react-router-dom'

const { Row, Col } = Grid;
const ButtonGroup = Button.Group;

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

  renderColumns = () => {
    const { columns } = this.props;
    return columns.map((item) => {
      if (typeof item.render === 'function') {
        return (
          <Table.Column
            title={item.title}
            key={item.key}
            align={'center'}
            cell={item.render}
            width={item.width || 80}
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
          <a href="/" download>
            <Button>
              <Icon size="small" type="download" /> 导出信息
        </Button>
          </a>
        </Row>

        <Table {...this.props}
          isLoading={this.state.__loading}
          // rowSelection={{
          //   ...this.rowSelection,
          //   selectedRowKeys: this.state.selectedRowKeys,
          // }}
        >

          {this.renderColumns()}

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
