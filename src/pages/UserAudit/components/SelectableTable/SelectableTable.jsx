import React, { Component } from 'react';
import { Table, Button, Pagination, Input, Select, Grid, DatePicker, Icon, Feedback } from '@icedesign/base';
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
    };


    

    this.state = {

      current: 1,
      selectedRowKeys: [],
    };
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
    const { r_id } = record;
    console.log('delete item', r_id);
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
  handleChange = (current) => {
    this.setState({
      current,
    });
    this.props.pageCall(current)
  }


  render() {
    console.log("**", this.props.dataList)
    return (
      <div className="selectable-table" style={styles.selectableTable}>
        <IceContainer style={styles.IceContainer}>
          <div>
            <Button size="medium" type="primary" style={styles.batchBtn}
              disabled={!this.state.selectedRowKeys.length}
              onClick={
                () => {
                  console.log(this.state.selectedRowKeys)
                  axios
                    .put(`/api/PersonnelMS/recruit_update?ids=${this.state.selectedRowKeys}&userStatus=1`)
                    .then((res) => {
                      console.log("rrr", res)
                      if (res.data.code === 0) {
                        this.props.pageCall(this.state.current)
                        Feedback.toast.success("操作成功");
                        this.setState({
                          selectedRowKeys:[]
                        })
                      } else {
                        Feedback.toast.error("操作失败，未知错误！");
                      }
                    });
                }
              }
            >
              通过
            </Button>
            <Button
              onClick={
                () => {
                  console.log(this.state.selectedRowKeys)
                  axios
                    .put(`/api/PersonnelMS/recruit_update?ids=${this.state.selectedRowKeys}&userStatus=-1`)
                    .then((res) => {
                      if (res.data.code === 0) {
                        this.props.pageCall(this.state.current)
                        Feedback.toast.success("操作成功");
                        this.setState({
                          selectedRowKeys:[]
                        })
                      } else {
                        Feedback.toast.error("操作失败，未知错误！");
                      }
                    });
                }
              }
              size="medium"
              shape="warning"
              style={styles.batchBtn}
              disabled={!this.state.selectedRowKeys.length}
            >
              拒绝
            </Button>
            <Button
              onClick={this.clearSelectedKeys}
              size="medium"
              style={styles.batchBtn}
            >
              清空选中
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
            dataSource={this.props.dataList}
            isLoading={this.state.isLoading}
            hasBorder={false}
            rowSelection={{
              ...this.rowSelection,
              selectedRowKeys: this.state.selectedRowKeys,
            }}
            primaryKey="r_id"
          >
            <Table.Column title="编码" dataIndex="r_id" width={50} />
            <Table.Column title="姓名" dataIndex="name" width={80} />
            <Table.Column title="性别" dataIndex="sex" width={80} />
            <Table.Column title="学历" dataIndex="school" width={150} />
            <Table.Column title="简历" dataIndex="filepath" width={120} />
            <Table.Column title="邮箱" dataIndex="email" width={120} />
            <Table.Column title="时间" dataIndex="createdDate" width={130} />
            {/* <Table.Column
              title="状态"
              dataIndex="userStatus"
              width={60}
            /> */}
          </Table>
          <div style={styles.pagination}>
            <Pagination
              onChange={this.handleChange}
              current={this.state.current}
              total={this.props.totalCount}
              hideOnlyOnePage="true"
            />
          </div>
        </IceContainer>
      </div>
    );
  }
}


