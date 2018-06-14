import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab, Button, Pagination } from '@icedesign/base';
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
  }
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

  info = (index) => {
    const current = this.props.current;
    const { assignmentToken } = this.props.data[index]
    const { specificationToken } = this.props.data[index]
    this.props.history.push(`/device/info/${specificationToken}/${assignmentToken}/${index}/${current}`)
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
            current={this.props.current}
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
    borderRadius:'5px'
  },
  pagination: {
    textAlign: 'right',
    paddingTop: '20px',
    paddingBottom: '10px',
  },
}
