import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab } from '@icedesign/base';
import axios from 'axios';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';

const TabPane = Tab.TabPane;

// const tabs = [
//   { tab: '全部', key: 'all' },
//   { tab: '已发布', key: 'inreview' },
//   { tab: '审核中', key: 'released' },
//   { tab: '已拒绝', key: 'rejected' },
// ];

export default class TabTable extends Component {
  static displayName = 'TabTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
      tabKey: 'all',
    };
    this.columns = [
      {
        title: '用户ID',
        dataIndex: 'userId',
        key: 'userId',
      },
      {
        title: '用户名',
        dataIndex: 'author',
        key: 'author',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '拥有设备数',
        dataIndex: 'devNum',
        key: 'devNum',
      },
      {
        title: '注册时间',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: '操作',
        key: 'action',
        render: (value, index, record) => {
          return (
            <span>
              <EditDialog
                index={index}
                record={record}
                getFormValues={this.getFormValues}
              />
              <DeleteBalloon
                handleRemove={() => this.handleRemove(value, index, record)}
              />
            </span>
          );
        },
      },
    ];
  }

  componentDidMount() {
    axios
      .get('/mock/tab-table.json')
      .then((response) => {
        console.log(response.data.data);
        this.setState({
          dataSource: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getFormValues = (dataIndex, values) => {
    const { dataSource, tabKey } = this.state;
    dataSource[tabKey][dataIndex] = values;
    this.setState({
      dataSource,
    });
  };

  handleRemove = (value, index) => {
    const { dataSource, tabKey } = this.state;
    dataSource[tabKey].splice(index, 1);
    this.setState({
      dataSource,
    });
  };


  render() {
    const { dataSource } = this.state;
    return (
      <div className="tab-table">
        <IceContainer>
           
          <CustomTable
            dataSource={dataSource[this.state.tabKey]}
            columns={this.columns}
            hasBorder={false}
          />
         
        </IceContainer>
      </div>
    );
  }
}
