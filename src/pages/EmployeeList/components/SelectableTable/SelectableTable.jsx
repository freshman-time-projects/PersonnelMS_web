import React, { Component } from 'react';
import { Table, Button, Icon, Pagination, Grid, } from '@icedesign/base';
import Img from '@icedesign/img';
import IceContainer from '@icedesign/container';

const { Row, Col } = Grid;
const ButtonGroup = Button.Group;

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
      selectedRowKeys: [],
      dataSource: this.props.data,
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
    const { id } = record;
    console.log('delete item', id);
  };

  renderOperator = (value, index, record) => {
    return (
      <div>
        <a>编辑</a>
        <a style={styles.removeBtn} href="#/device/info">详情</a>
        {/* <a
          style={styles.removeBtn}
          onClick={this.deleteItem.bind(this, record)}
        >
          删除
        </a> */}
      </div>
    );
  };

  renderCover = (value, index, record) => {
    return (
      <div >
        <Img
          enableAliCDNSuffix={true}
          width='100%'
          height='100%'
          src='https://img.alicdn.com/tps/TB11W.WOXXXXXcbaXXXXXXXXXXX-496-310.png'
          type='contain'
        />
      </div>
    );
  };

  add = () => {
    window.location.href="#/device/add";
  }

  render() {
    return (
      <div className="selectable-table" style={styles.selectableTable}>
        <IceContainer >
          <Row style={{marginBottom:'20px'}}>

            <Button  type="primary" style={styles.batchBtn} onClick={this.add}>
              <Icon type="add" />增加
            </Button>
            <Button
              onClick={this.clearSelectedKeys}
              style={styles.batchBtn}
              type="secondary"
            >
              <Icon type="close" />清空选中
            </Button>
            <ButtonGroup style={styles.batchBtn}>
              <Button type="primary">运行</Button>
              <Button type="primary">禁用</Button>
            </ButtonGroup>
            <a href="/" download>
            <Button>
              <Icon size="small" type="download" /> 导出信息
            </Button>
            </a>

          </Row>
        {/* </IceContainer>
        <IceContainer> */}
          <Table
            dataSource={this.state.dataSource}
            isLoading={this.state.isLoading}
            rowSelection={{
              ...this.rowSelection,
              selectedRowKeys: this.state.selectedRowKeys,
            }}
          >
            <Table.Column title="图片" dataIndex="photo" align='center' cell={this.renderCover} width={40} />
            <Table.Column title="名称" dataIndex="name"  align='center' width={40} />
            <Table.Column title="描述" dataIndex="description"  align='center' width={80} />
            <Table.Column title="PM2.5" dataIndex="PM25" align='center'  width={40} />
            <Table.Column title="PM10" dataIndex="PM10" align='center'  width={40} />
            <Table.Column title="温度 ℃" dataIndex="temperature" align='center'  width={40} />
            <Table.Column title="湿度 %" dataIndex="humidity" align='center' width={40} />
            <Table.Column title="时间" dataIndex="time" align='center' width={70} />
            <Table.Column title="硬件ID" dataIndex="id"  align='center' width={70} />
            <Table.Column title="运行状态" dataIndex="status" align='center' width={50} />
            <Table.Column
              title="操作"
              cell={this.renderOperator}
              align='center'
              lock="right"
              width={60}
            />
          </Table>
          <div style={styles.pagination}>
            <Pagination onChange={this.change} />
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  selectableTable:{
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
