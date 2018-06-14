import React, { Component } from 'react';
import { Table, Button, Pagination, Input, Select, Grid, DatePicker, Icon } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import axios from 'axios';
//
const styles = {
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
  ////
  finish: {
    color: '#64D874',
  },
  pass: {
    color: '#FA7070',
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
  },
  paginationWrapper: {
    display: 'flex',
    padding: '20px 0 0 0',
    flexDirection: 'row-reverse',
  },
  ///
};
//上方状态


// 注意：下载数据的功能，强烈推荐通过接口实现数据输出，并下载
// 因为这样可以有下载鉴权和日志记录，包括当前能不能下载，以及谁下载了什么

export default class SelectableTable extends Component {
  static displayName = 'SelectableTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    // 表格可以勾选配置项
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
      // 支持针对特殊行进行定制
      getProps: (record) => {
        return {

        };
      },
    };

    this.state = {
      current: 1,
      selectedRowKeys: [],
      dataList: [],
    };
  }

  getPageData = (current) => {
    console.log('current: ', current);
   axios
        .get(`api/PersonnelMS/user_getAll_page?current=${current}`)
        .then((response) => {
          const data = response.data;
          console.log("ressss", response.data.content.length);
          if(response.data.code === 0){
            this.setState({
              dataList: response.data.content,
              current,
            },()=>{
              console.log("dadadada",this.state.dataList)
            });
          } 
        })
  }

  componentWillMount() {
    this.getPageData(1);
  }

  clearSelectedKeys = () => {
    this.setState({
      selectedRowKeys: [],
    });
  };

  deleteSelectedKeys = () => {
    const { selectedRowKeys } = this.state;
    console.log('delete keys', selectedRowKeys);
  };

  deleteItem = (record) => {
    const { id } = record;
    console.log('delete item', id);
  };
  ///
  renderStatus = (value) => {
    return statusComponents[value];
  };
  renderCellProgress = (value) => (
    <Progress showInfo={false} percent={parseInt(value, 10)} />
  );

  onPageChange = (pageNo) => {
    this.setState({
      current: pageNo,
    });
  };
  pageChange = (current) => {
    this.setState({
      current
    })
    this.getPageData(current)
  }

  render() {
    const { dataList } = this.state
    return (
      <div className="selectable-table" style={styles.selectableTable}>
        <IceContainer style={styles.IceContainer}>
          <div>
            <Button size="medium" type="primary" style={styles.batchBtn}>
              启用
            </Button>
            <Button
              onClick={this.deleteSelectedKeys}
              size="medium"
              style={styles.batchBtn}
            >
              禁用
            </Button>

          </div>
          <div>
            <a href="/" download>
              <Icon size="small" type="download" /> 导出表格数据到 .csv 文件
            </a>
          </div>
        </IceContainer>
        <IceContainer>
          <Table
            dataSource={dataList}
            isLoading={this.state.isLoading}
            hasBorder={false}
            rowSelection={{
              ...this.rowSelection,
              selectedRowKeys: this.state.selectedRowKeys,
            }}
          >
            <Table.Column title="编码" dataIndex="u_id" width={50} />
            <Table.Column title="用户名" dataIndex="username" width={80} />
            <Table.Column title="密码" dataIndex="password" width={80} />
            <Table.Column title="邮箱" dataIndex="email" width={150} />
            <Table.Column title="创建时间" dataIndex="createdDate" width={130} />
            <Table.Column title="角色" dataIndex="role" width={80} />
            <Table.Column
              title="状态"
              dataIndex="code"
              width={60}
            />
          </Table>
          <div style={styles.pagination}>
            <Pagination
              hideOnlyOnePage={true}
              current={this.state.current}
              total={this.state.totalCount}
              onChange={this.pageChange}
            />
          </div>
        </IceContainer>
      </div>
    );
  }
}


