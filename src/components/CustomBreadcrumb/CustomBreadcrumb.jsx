import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from '@icedesign/base';
import IceContainer from '@icedesign/container';

export default class CustomBreadcrumb extends Component {
  static displayName = 'CustomBreadcrumb';

  static defaultProps = {
    dataSource: [],
  };

  static propTypes = {
    dataSource: PropTypes.array,
  };

  render() {
    const { dataSource } = this.props;
    return (
      <div style={styles.breadcrumb}>
        <Breadcrumb style={{ margin: 0 }}>
          {dataSource.map((item, index) => {
            return (
              <Breadcrumb.Item link={item.link} key={index}>
                {item.text}
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </div>
    );
  }
}
const styles = {
  breadcrumb: {
    padding: '15px 25px',
    background: '#fff',
    borderRadius: '0 0 5px 5px',
    marginBottom: '10px'
  },
}
