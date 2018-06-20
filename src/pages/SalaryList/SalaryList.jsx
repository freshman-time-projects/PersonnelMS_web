import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import TagTable from './components/TagTable';


export default class UserList extends Component {
  static displayName = 'UserList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '用户管理', link: '' },
      { text: '添加列表', link: '#/user/userList' },
    ];
    return( 
      <div className="user-list-page" >
        <CustomBreadcrumb dataSource={breadcrumb} />
        <TagTable />
        
      </div>
    );
  }
}
