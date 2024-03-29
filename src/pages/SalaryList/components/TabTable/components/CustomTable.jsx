import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from '@icedesign/base';

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
    this.state = {};
  }

  renderColumns = () => {
    const { columns } = this.props;
    return columns.map((item) => {
      if (typeof item.render === 'function') {
        return (
          <Table.Column
            title={item.title}
            key={item.key}
            cell={item.render}
            style={{textAlign:'center'}}
            width={item.width || 150}
          />
        );
      }

      return (
        <Table.Column
          key={item.key}
          title={item.title}
          style={{textAlign:'center'}}
          dataIndex={item.dataIndex}
          width={item.width || 90}
        />
      );
    });
  };

  render() {
    return <Table {...this.props}>{this.renderColumns()}</Table>;
  }
}
