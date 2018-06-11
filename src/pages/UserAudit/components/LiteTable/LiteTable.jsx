import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Select, Grid, DatePicker, Table, Pagination } from '@icedesign/base';
const { Row, Col } = Grid;
import axios from 'axios'

//通过拒绝 


const generatorMockStatus = () => {
  const random = parseInt(Math.random() * 10, 10);
  if (random < 8) {
    return 'finish';
  } else if (random >= 8) {
    return 'pass';
  }
};
const styles = {

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
};


const generatorData = () => {
  const result = [];
  for (let i = 0; i < 10; i++) {
    result.push({
      name: <p>吴家豪</p> + i,
      email: <p>1381785461@163.com</p>,
      phone: <p>13652478932</p>,
      time: <p>2016-06-16  14:03</p>,
      address: <p>河南省/郑州市/金水区</p>,
      status: generatorMockStatus(),
    });
  }
  return result;
};

const statusComponents = {

  finish: <span style={styles.finish}>●邮箱已验证</span>,

  pass: <span style={styles.pass}>●已拒绝</span>,
};

export default class LiteTable extends Component {
  static displayName = 'LiteTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.rowSelection = {
      // 表格发生勾选状态变化时触发
      onChange: (name) => {
        console.log('names', name);
        this.setState({
          selectedRowKeys: name,
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
      dataSource: generatorData(),
      selectedRowKeys: [],
      current: 1,
      rowSelection: {
        onSelect: function (selected, record, records) {
          console.log("onSelect", selected, record, records);
        },
        onSelectAll: function (selected, records) {
          console.log("onSelectAll", selected, records);
        },
        selectedRowKeys: [],
      }
    }
  }
  onChange = (ids, records) => {
    const { rowSelection } = this.state;
    rowSelection.selectedRowKeys = ids;
    console.log("onChange", ids, records);
    this.setState({ rowSelection });
  }
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
  render() {
    const { tableData } = this.state;
    return (
      <div className="lite-table" style={{ marginTop: '60px' }}>

        <Row style={styles.btns}>

          <Col s="12" l="10">
            <Button type="primary" onClick={this.submit}>
              通过
                  </Button>
            <Button style={styles.resetBtn} >
              拒绝
                  </Button>
          </Col>
        </Row>
        <IceContainer style={styles.tableCard}>
          <Table
            rowSelection={this.state.rowSelection}
            getRowClassName={(record, index) => {
              return `progress-table-tr progress-table-tr${index}`;
            }}
            dataSource={this.state.dataSource} hasBorder={false}
            isLoading={this.state.isLoading}
            rowSelection={{
              ...this.rowSelection,
              selectedRowKeys: this.state.selectedRowKeys,
            }}>
            <Table.Column title="姓名" dataIndex="name" width={100} />
            <Table.Column title="邮箱" dataIndex="email" width={100} />
            <Table.Column title="电话" dataIndex="phone" width={100} />
            <Table.Column title="时间" dataIndex="time" width={100} />
            <Table.Column title="地点" dataIndex="address" width={100} />
            <Table.Column
              title="状态"
              dataIndex="status"
              cell={this.renderStatus}
              width={100}
            />
          </Table>
          <div style={styles.paginationWrapper}>
            <Pagination
              current={this.state.current}
              onChange={this.onPageChange}

            />
          </div>
        </IceContainer>
      </div >
    );
  }
}

