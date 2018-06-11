import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Select, Grid,DatePicker,Table,Pagination } from '@icedesign/base';
const { Row, Col } = Grid;
// 




const generatorMockStatus = () => {
  const random = parseInt(Math.random() * 10, 10);
  if (random < 8) {
    return 'finish';
  }  else if (random >= 8) {
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
  return Array.from({ length: 10 }).map((item, index) => {
    return {
      name: <p>吴家豪</p>,
      device: <div><p>折本数量</p><p>3个</p></div>,
      phoneTime:<div><p>13652478932</p><p>1381785461@163.com</p></div>,
     
      addressEmail:<div><p>河南省/郑州市/金水区</p><p>1381785461@163.com</p></div>,
      status: generatorMockStatus(),
    };
  });
};

const statusComponents = {
 
  finish: <span style={styles.finish}>启用</span>,
 
  pass: <span style={styles.pass}>禁用</span>,
};

export default class LiteTable extends Component {
  static displayName = 'LiteTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      tableData: generatorData(),
      current: 1,
    };
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
      <div className="lite-table" style={{marginTop:'60px'}}>

      
                
                
        <IceContainer style={styles.tableCard}>
        <Row style={styles.btns}>
        <Col s="12" l="10">
                  <Button type="primary" onClick={this.submit}>
                   启用
                  </Button>
                  <Button style={styles.resetBtn} onClick={this.reset}>
                    禁用
                  </Button>
                </Col>
              </Row>
          <Table  getRowClassName={(record, index) => {
              return `progress-table-tr progress-table-tr${index}`;
            }}
            dataSource={tableData} hasBorder={false}>
            <Table.Column title="姓名" dataIndex="name" width={100} />
            <Table.Column title="设备" dataIndex="device" width={100} />
            <Table.Column title="电话时间" dataIndex="phoneTime" width={100} />
            
            <Table.Column title="地点邮件" dataIndex="addressEmail" width={100} />
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
              shape="arrow-only"
            />
          </div>
        </IceContainer>
      </div>
    );
  }
}

