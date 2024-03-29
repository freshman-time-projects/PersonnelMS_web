import React, { PureComponent } from 'react';
import { Balloon, Icon, Button, Feedback } from '@icedesign/base';
import IceImg from '@icedesign/img';
import Layout from '@icedesign/layout';
import Menu from '@icedesign/menu';
import FoundationSymbol from 'foundation-symbol';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { headerMenuConfig } from './../menuConfig';
import axios from 'axios';
import Logo from './Logo';
import cookie from 'react-cookies';

export default class Header extends PureComponent {
  constructor(props) {
    super(props);

  }

  render() {
    const username = cookie.load('username');
    const { width, theme, isMobile, className, style } = this.props;

    return (
      <Layout.Header
        theme={theme}
        className={cx('ice-design-layout-header', className)}
        style={{ ...style, width }}
      >
        <Logo />
        <div
          className="ice-design-layout-header-menu"
          style={{ display: 'flex' }}
        >
          {/* Header 菜单项 begin */}
          {headerMenuConfig && headerMenuConfig.length > 0 ? (
            <Menu mode="horizontal" selectedKeys={[]}>
              {headerMenuConfig.map((nav, idx) => {
                const linkProps = {};
                if (nav.newWindow) {
                  linkProps.href = nav.path;
                  linkProps.target = '_blank';
                } else if (nav.external) {
                  linkProps.href = nav.path;
                } else {
                  linkProps.to = nav.path;
                }
                return (
                  <Menu.Item key={idx}>
                    {linkProps.to ? (
                      <Link {...linkProps}>
                        {nav.icon ? (
                          <FoundationSymbol type={nav.icon} size="small" />
                        ) : null}
                        {!isMobile ? nav.name : null}
                      </Link>
                    ) : (
                        <a {...linkProps}>
                          {nav.icon ? (
                            <FoundationSymbol type={nav.icon} size="small" />
                          ) : null}
                          {!isMobile ? nav.name : null}
                        </a>
                      )}
                  </Menu.Item>
                );
              })}
            </Menu>
          ) : null}
          {/* Header 菜单项 end */}

          {/* Header 右侧内容块 */}

          <Balloon
            trigger={
              <div
                className="ice-design-header-userpannel"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 12,
                }}
              >
                {cookie.load("role") === "3" ? <IceImg
                  height={40}
                  width={40}
                  src={require("../image/avator.png")}
                  className="user-avatar"
                /> : <IceImg
                    height={40}
                    width={40}
                    src="https://gitee.com/uploads/79/1874379_zzuisa.png?1524776095"
                    className="user-avatar"
                  />}
                <div className="user-profile">
                  <span className="user-name" style={{ fontSize: '13px' }}>
                    {username}
                  </span>
                  <br />
                  <span
                    className="user-department"
                    style={{ fontSize: '12px', color: '#999' }}
                  >
                    技术部
                  </span>
                </div>
                <Icon
                  type="arrow-down-filling"
                  size="xxs"
                  className="icon-down"
                />
              </div>
            }
            closable={false}
            className="user-profile-menu"
          >
            <ul>
              <li className="user-profile-menu-item">
                {cookie.load("role") === "3" ? <Link to="/">
                  <FoundationSymbol type="person" size="small" />我的主页
                </Link> :
                  <Link to="/index">
                    <FoundationSymbol type="person" size="small" />我的主页
              </Link>
                }
              </li>
              <li className="user-profile-menu-item">
                {
                  cookie.load("role") === "3" ?
                  <Link to="/">
                    <FoundationSymbol type="repair" size="small" />设置
                  </Link> :

                <Link to="/index">
                <FoundationSymbol type="repair" size="small" />设置
              </Link>
                }
              </li>
              <li className="user-profile-menu-item">
                <Link onClick={() => {
                  axios
                    .post('api/PersonnelMS/user_logout')
                    .then((response) => {
                      const data = response.data
                      if (data.code === 0) {
                        Feedback.toast.success(data.msg);
                        location.href = "#login"
                      } else if (data.code === 3) {
                        Feedback.toast.error(data.msg);
                        location.href = "#login"
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    })
                }}
                  to="/login"
                >
                  <FoundationSymbol type="compass" size="small" />退出
                </Link>
              </li>
            </ul>
          </Balloon>
        </div>
      </Layout.Header>
    );
  }
}
