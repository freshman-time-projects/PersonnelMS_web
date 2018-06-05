import React, { Component } from 'react';
import UserForm from './components/UserForm';
import SettingForm from './components/SettingsForm';
import MonacoEditor from './components/MonacoEditor';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
export default class SpecificationAdd extends Component {
  static displayName = 'SpecificationAdd';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const addSpec = [
      { text: '首页', link: '' },
      { text: '产品', link: '#/spec' },
      { text: '增加产品', link: '#/spec/add' },
    ];
    return (

      <div className="specification-add-page">
        <CustomBreadcrumb dataSource={addSpec} />
        <SettingForm history={this.props.history} />
      </div>
    );
  }
}
